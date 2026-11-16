"""Concrete professional-claim and deployment invariants, no presentation snapshots."""
import json
import unittest
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent.parent

class PortfolioRules(unittest.TestCase):
    def test_omega_approved_current_operation(self):
        roles = json.loads((ROOT / 'content/career.json').read_text())
        omega = roles[0]
        self.assertEqual(omega['company'], 'Omega Healthcare')
        self.assertEqual(omega['date'], 'Apr 2026 — Present')
        self.assertIn('After Hours Line', omega['title'])
        self.assertIn('approximately 80 calls per day', ' '.join(b[0] for b in omega['bullets']))

    def test_nexa_cv_date(self):
        roles = json.loads((ROOT / 'content/career.json').read_text())
        nexa = next(r for r in roles if r['company'].startswith('Nexa BPO'))
        self.assertEqual(nexa['date'], 'Feb 2023 — Mar 2023')

    def test_consistent_english_claim(self):
        for file in [ROOT / 'index.html', ROOT / 'public/career/index.html']:
            body = BeautifulSoup(file.read_text(), 'html.parser').body.get_text(' ', strip=True)
            self.assertIn('English: C1 Advanced — EF SET 64/100; professional bilingual communication.', body)
            self.assertNotIn('B2+/C1', body)
            self.assertNotIn('C1 Proficiency', body)

    def test_separate_provider_forms(self):
        general = BeautifulSoup((ROOT / 'public/contact/index.html').read_text(), 'html.parser')
        commercial = BeautifulSoup((ROOT / 'public/services/contact/index.html').read_text(), 'html.parser')
        self.assertIn('/Eqq0WA?', general.iframe['data-tally-src'])
        self.assertIn('/RWWL8j?', commercial.iframe['data-tally-src'])
        self.assertNotEqual(general.iframe['data-tally-src'], commercial.iframe['data-tally-src'])

    def test_resume_is_approved_file(self):
        import hashlib
        approved = Path('/mnt/user-uploads/Diego_Armando_Mendez_CV_2026_1.pdf')
        if not approved.exists(): approved = Path('/tmp/user-uploads/Diego_Armando_Mendez_CV_2026_1.pdf')
        self.assertEqual(hashlib.sha256(approved.read_bytes()).hexdigest(), hashlib.sha256((ROOT / 'public/Diego_Armando_Mendez_Resume.pdf').read_bytes()).hexdigest())

    def test_all_routes_delivered(self):
        for route in ['career', 'services', 'research', 'projects', 'contact', 'private-access', 'services/contact', 'support']:
            self.assertTrue((ROOT / 'public' / route / 'index.html').is_file())

    def test_private_route_is_noindex_and_outside_primary_navigation(self):
        private = BeautifulSoup((ROOT / 'public/private-access/index.html').read_text(), 'html.parser')
        self.assertIn('noindex', private.find('meta', attrs={'name': 'robots'})['content'])
        primary_hrefs = [a.get('href', '') for a in private.nav.select('.nav-links a')]
        self.assertNotIn('/cv/private-access', primary_hrefs)
        self.assertIsNotNone(private.footer.find('a', href='/cv/private-access'))
        contact = BeautifulSoup((ROOT / 'public/contact/index.html').read_text(), 'html.parser')
        self.assertIsNotNone(contact.find('a', href='/cv/private-access'))

    def test_private_provider_links_are_not_in_public_files(self):
        files = [ROOT / 'index.html'] + [p for p in (ROOT / 'public').rglob('*') if p.suffix in {'.html', '.js', '.css', '.json', '.txt'}]
        for file in files:
            content = file.read_text()
            self.assertNotIn('1drv.ms/f/', content, str(file))
            self.assertNotIn('drive.google.com/drive/folders/', content, str(file))

    def test_private_access_has_all_four_document_categories(self):
        private = BeautifulSoup((ROOT / 'public/private-access/index.html').read_text(), 'html.parser')
        containers = private.select('[data-documents]')
        self.assertEqual({node['data-documents'] for node in containers}, {'professional', 'academic', 'work_samples', 'restricted_projects'})

    def test_private_authentication_script_is_served_locally(self):
        private = BeautifulSoup((ROOT / 'public/private-access/index.html').read_text(), 'html.parser')
        sources = [script.get('src', '') for script in private.find_all('script')]
        self.assertIn('/cv/private-access/vendor/supabase-client.js', sources)
        self.assertTrue(all('supabase' not in source or source.startswith('/cv/') for source in sources))

if __name__ == '__main__':
    unittest.main()