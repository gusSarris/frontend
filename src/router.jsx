import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AdminApp from "./AdminApp";
import DashboardPage from "./pages/DashboardPage";
import CustomersPage from "./pages/CustomersPage";
import SettingsPage from "./pages/SettingsPage";
import StoresPage from "./pages/StoresPage";
import ServicesPage from "./pages/ServicesPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminTenantsPage from "./pages/admin/AdminTenantsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

export const router = createBrowserRouter([
  { path: "/",          element: <App><DashboardPage /></App> },
  { path: "/customers", element: <App><CustomersPage /></App> },
  { path: "/settings",  element: <App><SettingsPage /></App> },
  { path: "/stores",    element: <App><StoresPage /></App> },
  { path: "/services",  element: <App><ServicesPage /></App> },
  
  // Admin Routes
  { path: "/admin",     element: <AdminApp><AdminDashboardPage /></AdminApp> },
  { path: "/admin/tenants", element: <AdminApp><AdminTenantsPage /></AdminApp> },
  { path: "/admin/users",   element: <AdminApp><AdminUsersPage /></AdminApp> },
  { path: "/admin/settings", element: <AdminApp><AdminSettingsPage /></AdminApp> },
]);