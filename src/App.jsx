/**
 * App.jsx — Entry point
 *
 * Usage (Vite / CRA):
 *   npm install react react-dom
 *   npm install -D tailwindcss  (optional, tokens use CSS vars)
 *
 * API integration: See DashboardPage.jsx — look for "API CALL" comments.
 * All mock data is in DashboardPage.jsx → replace with real fetch() calls.
 *
 * Tenant setup:
 *   Every API call to tenant endpoints needs:
 *     headers: { "X-Tenant-ID": tenantSlug, "Authorization": "Bearer " + jwt }
 *
 * Authentication flow:
 *   POST /api/login_check → { token, refresh_token }
 *   Store in localStorage/sessionStorage
 *   Refresh via POST /api/token/refresh when token expires
 */

import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Sidebar from "./layouts/Sidebar";
import Topbar from "./layouts/Topbar";
import DashboardPage from "./pages/DashboardPage";

/* ── Simple in-memory auth state (replace with real auth context) ── */
const MOCK_USER = {
  initials: "ΜΚ",
  name: "Μαρία Κωνσταντίνου",
  role: "Ιδιοκτήτρια",
};

export default function App({children}) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [apptModalOpen, setApptModalOpen] = useState(false);

  return (
     <MainLayout>{children ?? <DashboardPage />}</MainLayout>
  );
}

