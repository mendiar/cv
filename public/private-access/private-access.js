(() => {
  const apiUrl = document.querySelector('meta[name="private-api-url"]')?.content.replace(/\/$/, '');
  const publishableKey = document.querySelector('meta[name="private-api-key"]')?.content;
  const loginPanel = document.getElementById('private-login-panel');
  const documentsPanel = document.getElementById('private-documents-panel');
  const form = document.getElementById('private-login-form');
  const loginStatus = document.getElementById('private-login-status');
  const accountStatus = document.getElementById('private-account-status');
  const documentStatus = document.getElementById('private-document-status');
  const logoutButton = document.getElementById('private-logout');
  const categoryNames = ['professional', 'academic', 'work_samples', 'restricted_projects'];

  if (!apiUrl || !publishableKey || !window.PrivateSupabase || !form) return;

  const copy = {
    en: {
      signingIn: 'Checking your credentials…',
      invalidLogin: 'Access could not be verified. Check your email and password.',
      unauthorized: 'This account is authenticated but has not been authorized, or its access has been revoked.',
      requestFailed: 'The private area could not be loaded. Please try again.',
      loading: 'Checking authorization and loading document records…',
      empty: 'No documents are currently available in this category.',
      open: 'Open provider folder',
      preparing: 'Preparing a one-time, 60-second access link…',
      ticketFailed: 'A temporary access link could not be created. Please try again.',
      expired: 'This authorization is no longer valid. Sign in again or ask Diego to restore access.',
    },
    es: {
      signingIn: 'Comprobando tus credenciales…',
      invalidLogin: 'No se pudo verificar el acceso. Revisa tu correo y contraseña.',
      unauthorized: 'La cuenta está autenticada, pero no ha sido autorizada o su acceso fue revocado.',
      requestFailed: 'No se pudo cargar el área privada. Inténtalo de nuevo.',
      loading: 'Comprobando la autorización y cargando los registros documentales…',
      empty: 'Actualmente no hay documentos disponibles en esta categoría.',
      open: 'Abrir carpeta del proveedor',
      preparing: 'Preparando un enlace de acceso de un solo uso, válido por 60 segundos…',
      ticketFailed: 'No se pudo crear el enlace temporal de acceso. Inténtalo de nuevo.',
      expired: 'Esta autorización ya no es válida. Inicia sesión de nuevo o pide a Diego que restaure el acceso.',
    },
  };

  const secureFetch = (input, init = {}) => {
    const headers = new Headers(input instanceof Request ? input.headers : undefined);
    if (init.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    if (headers.get('Authorization') === `Bearer ${publishableKey}`) headers.delete('Authorization');
    headers.set('apikey', publishableKey);
    return fetch(input, { ...init, headers });
  };

  const client = window.PrivateSupabase.createClient(apiUrl, publishableKey, {
    global: { fetch: secureFetch },
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
  });

  let documents = [];
  const language = () => document.documentElement.lang === 'es' ? 'es' : 'en';
  const text = (key) => copy[language()][key];

  function setLoginStatus(message = '', isError = false) {
    loginStatus.textContent = message;
    loginStatus.classList.toggle('private-error', isError);
  }

  function showLogin(message = '') {
    documents = [];
    documentsPanel.hidden = true;
    loginPanel.hidden = false;
    documentStatus.textContent = '';
    setLoginStatus(message, Boolean(message));
  }

  function renderDocuments() {
    for (const category of categoryNames) {
      const container = document.querySelector(`[data-documents="${category}"]`);
      container.replaceChildren();
      const records = documents.filter((record) => record.category === category);
      if (!records.length) {
        const empty = document.createElement('p');
        empty.className = 'private-empty';
        empty.textContent = text('empty');
        container.append(empty);
        continue;
      }

      for (const record of records) {
        const article = document.createElement('article');
        article.className = 'private-document';
        const provider = document.createElement('p');
        provider.className = 'private-provider';
        provider.textContent = record.provider === 'onedrive' ? 'Microsoft OneDrive' : 'Google Drive';
        const heading = document.createElement('h3');
        heading.textContent = record[`title_${language()}`] || record.title_en;
        const description = document.createElement('p');
        description.textContent = record[`description_${language()}`] || record.description_en;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn-outline private-open';
        button.textContent = text('open');
        button.addEventListener('click', () => openDocument(record.id, button));
        article.append(provider, heading, description, button);
        container.append(article);
      }
    }
  }

  async function apiRequest(action, session, documentId) {
    const response = await fetch(`${apiUrl}/functions/v1/private-documents`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
        apikey: publishableKey,
      },
      body: JSON.stringify(documentId ? { action, documentId } : { action }),
    });
    const result = await response.json().catch(() => ({}));
    return { response, result };
  }

  async function loadDocuments() {
    documentStatus.textContent = text('loading');
    const { data: { session } } = await client.auth.getSession();
    if (!session) {
      showLogin();
      return;
    }

    const { response, result } = await apiRequest('list', session);
    if (response.status === 401 || response.status === 403) {
      await client.auth.signOut({ scope: 'local' });
      showLogin(text(response.status === 403 ? 'unauthorized' : 'expired'));
      return;
    }
    if (!response.ok) {
      documentStatus.textContent = text('requestFailed');
      return;
    }

    documents = Array.isArray(result.documents) ? result.documents : [];
    loginPanel.hidden = true;
    documentsPanel.hidden = false;
    accountStatus.textContent = session.user.email || '';
    documentStatus.textContent = '';
    renderDocuments();
  }

  async function openDocument(documentId, button) {
    button.disabled = true;
    documentStatus.textContent = text('preparing');
    try {
      const { data: { session } } = await client.auth.getSession();
      if (!session) {
        showLogin(text('expired'));
        return;
      }
      const { response, result } = await apiRequest('ticket', session, documentId);
      if (response.status === 401 || response.status === 403) {
        await client.auth.signOut({ scope: 'local' });
        showLogin(text(response.status === 403 ? 'unauthorized' : 'expired'));
        return;
      }
      if (!response.ok || !result.ticket) {
        documentStatus.textContent = text('ticketFailed');
        return;
      }
      window.location.assign(`${apiUrl}/functions/v1/private-documents?ticket=${encodeURIComponent(result.ticket)}`);
    } catch {
      documentStatus.textContent = text('ticketFailed');
    } finally {
      button.disabled = false;
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    setLoginStatus(text('signingIn'));
    const formData = new FormData(form);
    const email = String(formData.get('email') || '').trim().toLowerCase();
    const password = String(formData.get('password') || '');
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      setLoginStatus(text('invalidLogin'), true);
      form.elements.password.value = '';
      form.elements.password.focus();
    } else {
      setLoginStatus();
      await loadDocuments();
    }
    submit.disabled = false;
  });

  logoutButton.addEventListener('click', async () => {
    await client.auth.signOut({ scope: 'local' });
    form.reset();
    showLogin();
  });

  new MutationObserver(() => {
    if (!documentsPanel.hidden) renderDocuments();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  loadDocuments().catch(() => showLogin(text('requestFailed')));
})();
