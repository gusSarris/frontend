import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DashboardPage from "./pages/DashboardPage";
import CustomersPage from "./pages/CustomersPage";
import SettingsPage from "./pages/SettingsPage";
import StoresPage from "./pages/StoresPage";
import ServicesPage from "./pages/ServicesPage"
export const router = createBrowserRouter([
  { path: "/",          element: <App><DashboardPage /></App> },
  { path: "/customers", element: <App><CustomersPage /></App> },
  { path: "/settings",  element: <App><SettingsPage /></App> },
  { path: "/stores",    element: <App><StoresPage /></App> },
    { path: "/services",    element: <App><ServicesPage /></App> },

]);