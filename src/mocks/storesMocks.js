/* ═══════════════════════════════════════
   STORES MOCK DATA  (replace with API calls)
   ─────────────────────────────────────────
   GET  /api/stores          Employee+
   POST /api/stores          Owner+
   PATCH /api/stores/{id}    Owner+
   DELETE /api/stores/{id}   NEVER ALLOWED — use PATCH { isActive: false }
   Required headers: Authorization: Bearer <JWT>, X-Tenant-ID: <slug>
═══════════════════════════════════════ */

export const MOCK_STORES = [
  {
    id: "store-1",
    name: "Κεντρικό",
    address: "Ερμού 45, Αθήνα 105 63",
    phone: "210 1234567",
    isActive: true,
    employeeCount: 3,
    appointmentsThisMonth: 87,
    createdAt: "2024-01-15",
  },
  {
    id: "store-2",
    name: "Κολωνάκι",
    address: "Σκουφά 12, Αθήνα 106 73",
    phone: "210 7654321",
    isActive: true,
    employeeCount: 2,
    appointmentsThisMonth: 54,
    createdAt: "2024-03-20",
  },
  {
    id: "store-3",
    name: "Γλυφάδα",
    address: "Λαζαράκη 8, Γλυφάδα 166 75",
    phone: "210 9876543",
    isActive: false,
    employeeCount: 1,
    appointmentsThisMonth: 0,
    createdAt: "2024-08-01",
  },
];

/* Colors for store avatars (cycles) */
export const STORE_COLORS = [
  { bg: "rgba(196,135,79,0.15)",  text: "var(--c-accent)" },
  { bg: "rgba(74,127,165,0.15)",  text: "var(--s-next)"   },
  { bg: "rgba(90,138,106,0.15)",  text: "var(--s-done)"   },
  { bg: "rgba(184,84,80,0.15)",   text: "var(--s-urgent)" },
];
