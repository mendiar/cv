# Architecture
- Generate deployment-ready static pages from approved bilingual content and the preserved legacy shell; this keeps GitHub Pages direct URLs working without a client-router fallback.
- Use `/cv/` as the public deployment base and strip it only in the development preview middleware; this makes production links and resume downloads consistent.
- Keep Tally as the only third-party script and use distinct provider-owned forms for general and commercial inquiries; this avoids collecting or storing personal data locally.
- Keep healthcare project descriptions high-level and source professional claims from the approved CV; this prevents confidential details or unsupported outcomes from entering generated pages.