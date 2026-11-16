# Architecture
- Generate deployment-ready static pages from approved bilingual content and the preserved legacy shell; this keeps GitHub Pages direct URLs working without a client-router fallback.
- Use `/cv/` as the public deployment base and strip it only in the development preview middleware; this makes production links and resume downloads consistent.
- Publish GitHub Pages from the dedicated `gh-pages` branch with root HTML and flattened public assets, leaving `main` as source; source synchronization alone does not deploy future changes.
- Keep Tally as the only third-party script and use distinct provider-owned forms for general and commercial inquiries; bundle the authentication client locally for the private area so no additional script provider is introduced.
- Keep private provider links and documents out of static files; Lovable Cloud validates each account and revocable grant before issuing one-time, 60-second provider redirect tickets.
- Keep healthcare project descriptions high-level and source professional claims from the approved CV; this prevents confidential details or unsupported outcomes from entering generated pages.