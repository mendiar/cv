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

## Remaining limitations / Diego’s decisions
1. Publish optional email on the general Tally form. This cannot be overridden safely inside an external iframe.
2. Publish the generated static site to GitHub Pages. Production delivery is not verified from the local preview.
3. Successful real-message submission and provider confirmation are not tested to avoid sending fabricated inquiries.
4. Editorial drafts lack approved source dossiers and publication dates. Other-language editions and editorial assistance provenance require approval before publication.

## Maintenance
Content: `content/career.json`; preserved shell: `content/legacy-shell.json`; static generation: `python3 scripts/generate-site.py`; concrete tests: `python3 scripts/test_site.py`. Deliver the generated root page and `public/` contents together to the `/cv/` deployment root. No backend, authentication, database, or payment system was added.