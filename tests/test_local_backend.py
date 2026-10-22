"""Isolated checks for the local-only commissioning backend."""
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "offline-platforms"))
from lunar_backend import Store  # noqa: E402


class LocalCommissioningBackendTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="lunar-backend-test-")
        self.store = Store(Path(self.temp.name) / "sessions.sqlite3")

    def tearDown(self):
        self.temp.cleanup()

    def apply(self):
        return self.store.create_application({
            "name": "Isolated QA applicant",
            "email": "qa@example.test",
            "type": "commission",
            "goal": "Verify the local application-to-estimate workflow.",
            "timing": "",
            "budget": "",
        })

    def configure_rate_card(self):
        return self.store.save_pricing({
            "revision": 0,
            "currency": "GBP",
            "items": [{
                "id": "interactive-scene",
                "label": "Interactive scene",
                "unit": "sprint",
                "low": 350000,
                "high": 1500000,
            }],
        })

    def test_pending_application_cannot_get_an_estimate(self):
        applicant = self.apply()
        with self.assertRaises(PermissionError):
            self.store.estimate({
                "id": applicant["id"],
                "accessKey": applicant["accessKey"],
                "selection": [{"id": "interactive-scene", "quantity": 1}],
            })

    def test_accepted_application_gets_server_calculated_persistent_estimate(self):
        applicant = self.apply()
        self.store.review_application({
            "id": applicant["id"], "status": "accepted", "note": "QA only",
        })
        self.configure_rate_card()
        estimate = self.store.estimate({
            "id": applicant["id"],
            "accessKey": applicant["accessKey"],
            "selection": [{"id": "interactive-scene", "quantity": 2}],
        })
        self.assertEqual((estimate["low"], estimate["high"], estimate["currency"]),
                         (700000, 3000000, "GBP"))
        self.assertEqual(len(self.store.commission_estimates()), 1)
        self.assertEqual(len(self.store.applications()), 1)

    def test_unknown_rate_card_items_are_rejected(self):
        applicant = self.apply()
        self.store.review_application({
            "id": applicant["id"], "status": "accepted", "note": "QA only",
        })
        self.configure_rate_card()
        with self.assertRaises(ValueError):
            self.store.estimate({
                "id": applicant["id"],
                "accessKey": applicant["accessKey"],
                "selection": [{"id": "client-supplied-price", "quantity": 1}],
            })


if __name__ == "__main__":
    unittest.main()
