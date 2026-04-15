/**
 * AdminApp.jsx — Entry point για Admin Πλατφόρμα
 *
 * Χρησιμοποιεί το AdminLayout με διαφορετικό sidebar και topbar
 * για την πλατφόρμα admin (Landlord View).
 */

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboardPage from "./pages/AdminDashboardPage";

export default function AdminApp({children}) {
  return (
     <AdminLayout>{children ?? <AdminDashboardPage />}</AdminLayout>
  );
}