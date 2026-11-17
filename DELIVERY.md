# Delivery — Professional ecosystem

## Implemented
- Eight static pages with persistent six-item navigation and deployment-safe `/cv/` links.
- Employment-first homepage; full approved career, six detailed BPO roles and compact additional experience.
- Approved three-page English CV substituted; downloaded files match the uploaded PDF byte-for-byte.
- Omega Patient Access Center and After Hours Line responsibilities, approximately 80 calls/day, and CV tools reflected without confidential details.
- Consistent English claim: English: C1 Advanced — EF SET 64/100; professional bilingual communication.
- No personal-site HIPAA/PHI certification claim; prototypes subject to internal review and pilot validation.
- Separate Solutions, language tutoring, editorial research, and categorized project records.
- Existing knowledge drafts preserved, with editorial classification and explicit missing-source/undated-draft notices.
- Blocking preloader removed; portrait, flags, archive palette, and floating runes retained. Reduced-motion preferences disable decorative motion.
- Project search removed rather than simulated. Support, videos, dossiers, patronage, profiles, and transparency reports marked planned, not operational.

## Route map
`/cv/` · `/cv/career` · `/cv/services` · `/cv/research` · `/cv/projects` · `/cv/contact` · `/cv/services/contact` · `/cv/support`

## Form map
- General contact: Tally Eqq0WA. Message required; attachments optional, PDF/DOCX/JPG/PNG, 10 MB. **Provider still requires email despite its optional label. Diego must make email optional and publish.** A visible notice explains this limitation and provider metadata.
- Commercial inquiry: Tally RWWL8j. Email, solution type, description required. Organization, URL, attachment, future-contact consent optional. No description maxlength configured. Reply purpose and future-contact consent explained separately.

## Verification
- All eight pages return 200 in the preview at 1280×1800 and 360×637; no horizontal overflow or page errors.
- English/Spanish switch changes new JAC title and text and updates the document language; navigation between pages preserves the selected language.
- Mobile menu opens, Escape closes it, keyboard focus reaches skip-to-content; browser Back restores homepage.
- Career resume downloads on desktop/mobile match the approved PDF; PDF metadata reports three pages. Homepage and nav use the same deployment-safe link.
- Both Tally embeds load. Empty submits show concrete required-field errors and do not submit fabricated messages.
- Six concrete rule tests pass. Automatic build reports OK.

## Private Document Access — verified and deployed to GitHub Pages
- New bilingual `/cv/private-access` route, linked discreetly from Contact and every footer; it is absent from primary navigation and carries `noindex, nofollow, noarchive, nosnippet` plus no-referrer metadata.
- Authentication: Lovable Cloud email/password accounts created individually by Diego. Public registration is disabled. A separate protected grant authorizes the account and can be deactivated or revoked.
- Storage: documents remain in OneDrive and Google Drive. Provider folder URLs exist only in protected Lovable Cloud records, never in static HTML, browser data, scripts, or the public repository. No private document is stored on GitHub Pages.
- Access: the server validates the account and active grant before returning document metadata. Opening a folder requires a cryptographically random, one-time ticket that expires after 60 seconds; redemption checks the grant again before redirecting.
- Categories: professional documents, academic records, work samples, and restricted project materials. The two supplied folders are currently categorized as professional documents. Empty categories are honestly labelled.
- Confidentiality: the page prohibits redistribution and explicitly excludes employer-confidential information, patient information/PHI, proprietary procedures, and restricted internal documents.
- Verification: 10 static rule tests pass. A temporary authorized account confirmed both provider records, bilingual desktop/mobile layouts, hidden provider URLs, unauthenticated denial, 60-second expiration, single-use enforcement, and revocation of both the document list and an already-issued unused ticket. Test grants and tickets were removed.
- Diego still needs to create his own Cloud user for the authorized email; the permission exists, but that account does not yet exist. Additional users likewise need both an individual account and an active grant. No administrative management screen has been added.
- Security boundary: these are temporary server-issued redirect tickets, not native OneDrive/Google signed file URLs. Anyone who obtains and copies a provider folder URL can retain it outside this site. If a provider folder is publicly shared, revoking site access cannot revoke that public provider link. Configure provider-side restricted sharing for each authorized person; the provider may require its own sign-in.

## Remaining limitations / Diego’s decisions
1. Publish optional email on the general Tally form. This cannot be overridden safely inside an external iframe.
2. Publish the generated static site to GitHub Pages. Production delivery is not verified from the local preview.
3. Successful real-message submission and provider confirmation are not tested to avoid sending fabricated inquiries.
4. Editorial drafts lack approved source dossiers and publication dates. Other-language editions and editorial assistance provenance require approval before publication.

## Maintenance
Content: `content/career.json`; preserved shell: `content/legacy-shell.json`; static generation: `python3 scripts/generate-site.py`; concrete tests: `python3 scripts/test_site.py`. Deliver the generated root page and `public/` contents together to the `/cv/` deployment root. No backend, authentication, database, or payment system was added.