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
        for route in ['career', 'services', 'research', 'projects', 'contact', 'services/contact', 'support']:
            self.assertTrue((ROOT / 'public' / route / 'index.html').is_file())

if __name__ == '__main__':
    unittest.main()