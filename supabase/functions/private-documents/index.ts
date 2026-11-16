import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.25.76';

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Required server configuration is unavailable.');
}

const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const requestHeaders = {
  ...corsHeaders,
  'Cache-Control': 'no-store, max-age=0',
  'Referrer-Policy': 'no-referrer',
  'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
};

const BodySchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('list') }),
  z.object({ action: z.literal('ticket'), documentId: z.string().uuid() }),
]);
const TicketSchema = z.string().min(40).max(128).regex(/^[A-Za-z0-9_-]+$/);

type VerifiedUser = { id: string; email?: string };

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...requestHeaders, 'Content-Type': 'application/json' },
  });
}

function error(status: number, code: string) {
  return json({ error: code }, status);
}

async function authorizedGrant(user: VerifiedUser) {
  let { data: grant, error: grantError } = await admin
    .from('private_access_grants')
    .select('id, user_id, email, active, expires_at')
    .eq('user_id', user.id)
    .maybeSingle();

  if (grantError) throw grantError;

  if (!grant && user.email) {
    const email = user.email.toLowerCase();
    const result = await admin
      .from('private_access_grants')
      .select('id, user_id, email, active, expires_at')
      .eq('email', email)
      .maybeSingle();
    if (result.error) throw result.error;
    grant = result.data;

    if (grant && !grant.user_id) {
      const { error: linkError } = await admin
        .from('private_access_grants')
        .update({ user_id: user.id, updated_at: new Date().toISOString() })
        .eq('id', grant.id)
        .is('user_id', null);
      if (linkError) throw linkError;
    }
  }

  if (!grant || !grant.active) return null;
  if (grant.expires_at && new Date(grant.expires_at).getTime() <= Date.now()) return null;
  return grant;
}

async function verifiedRequestUser(req: Request) {
  const authorization = req.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer ')) return { response: error(401, 'authentication_required') };
  const token = authorization.slice(7).trim();
  if (!token || token.length > 8192) return { response: error(401, 'authentication_required') };

  const { data, error: authError } = await admin.auth.getUser(token);
  if (authError || !data.user) return { response: error(401, 'authentication_required') };

  const grant = await authorizedGrant({ id: data.user.id, email: data.user.email });
  if (!grant) return { response: error(403, 'access_not_authorized') };
  return { user: { id: data.user.id, email: data.user.email } };
}

function randomTicket() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

async function ticketHash(ticket: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ticket));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function providerUrl(value: string) {
  const url = new URL(value);
  const allowed = url.protocol === 'https:' && (url.hostname === '1drv.ms' || url.hostname === 'drive.google.com');
  if (!allowed) throw new Error('Unsupported document provider.');
  return url.toString();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: requestHeaders });

  try {
    const url = new URL(req.url);

    if (req.method === 'GET' && url.searchParams.has('ticket')) {
      const parsedTicket = TicketSchema.safeParse(url.searchParams.get('ticket'));
      if (!parsedTicket.success) return error(400, 'invalid_ticket');

      const hash = await ticketHash(parsedTicket.data);
      const { data: ticket, error: redeemError } = await admin
        .from('private_download_tickets')
        .update({ used_at: new Date().toISOString() })
        .eq('token_hash', hash)
        .is('used_at', null)
        .gt('expires_at', new Date().toISOString())
        .select('user_id, document_id')
        .maybeSingle();

      if (redeemError) throw redeemError;
      if (!ticket) return error(410, 'ticket_expired_or_used');

      const grant = await authorizedGrant({ id: ticket.user_id });
      if (!grant) return error(403, 'access_not_authorized');

      const { data: document, error: documentError } = await admin
        .from('private_documents')
        .select('external_url')
        .eq('id', ticket.document_id)
        .eq('active', true)
        .maybeSingle();
      if (documentError) throw documentError;
      if (!document) return error(404, 'document_unavailable');

      return new Response(null, {
        status: 302,
        headers: { ...requestHeaders, Location: providerUrl(document.external_url) },
      });
    }

    if (req.method !== 'POST') return error(405, 'method_not_allowed');

    const verification = await verifiedRequestUser(req);
    if ('response' in verification) return verification.response;

    let body: unknown;
    try { body = await req.json(); } catch { return error(400, 'invalid_request'); }
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) return error(400, 'invalid_request');

    if (parsed.data.action === 'list') {
      const { data, error: listError } = await admin
        .from('private_documents')
        .select('id, category, provider, title_en, title_es, description_en, description_es')
        .eq('active', true)
        .order('category')
        .order('sort_order');
      if (listError) throw listError;
      return json({ documents: data });
    }

    const { data: document, error: documentError } = await admin
      .from('private_documents')
      .select('id')
      .eq('id', parsed.data.documentId)
      .eq('active', true)
      .maybeSingle();
    if (documentError) throw documentError;
    if (!document) return error(404, 'document_unavailable');

    const ticket = randomTicket();
    const expiresAt = new Date(Date.now() + 60_000).toISOString();
    const { error: insertError } = await admin.from('private_download_tickets').insert({
      token_hash: await ticketHash(ticket),
      user_id: verification.user.id,
      document_id: document.id,
      expires_at: expiresAt,
    });
    if (insertError) throw insertError;

    return json({ ticket, expiresAt });
  } catch (cause) {
    console.error('Private document request failed:', cause instanceof Error ? cause.message : 'Unknown error');
    return error(500, 'request_failed');
  }
});
