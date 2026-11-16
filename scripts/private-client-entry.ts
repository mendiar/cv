import { createClient } from '@supabase/supabase-js';

// Local browser bundle: the static site does not load a third-party script CDN.
(window as unknown as { PrivateSupabase: { createClient: typeof createClient } }).PrivateSupabase = { createClient };
