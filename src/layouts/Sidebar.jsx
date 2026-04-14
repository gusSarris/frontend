import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

/* ═══════════════════════════════════════
   NAV DATA
═══════════════════════════════════════ */
const NAV_MAIN = [
  { href: "/",     icon: "fa-chart-line",    label: "Πίνακας Ελέγχου", id: "dashboard" },
  { href: "/appointments",  icon: "fa-calendar-check",label: "Ραντεβού",         id: "appointments", badge: 10 },
  { href: "/customers",     icon: "fa-user-heart",    label: "Πελάτες",          id: "customers" },
  { href: "/services",      icon: "fa-spa",            label: "Υπηρεσίες",        id: "services" },
  { href: "/notifications", icon: "fa-comment-dots",  label: "Μήνυματα",         id: "notifications" },
];

const NAV_MANAGE = [
  { href: "/stores",        icon: "fa-store",    label: "Καταστήματα", id: "stores" },
  { href: "/working-hours", icon: "fa-clock",    label: "Ωράρια",      id: "working-hours" },
  { href: "/users",         icon: "fa-users",    label: "Χρήστες",     id: "users" },
  { href: "/settings",      icon: "fa-gear",     label: "Ρυθμίσεις",   id: "settings" },
];

/* ═══════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════ */
export default function Sidebar({
  collapsed = false,
  mobileOpen = false,
  onToggleCollapse,
  onCloseMobile,
  smsCredits = 325,
  smsTotal = 500,
  tenantName = "Glamour Nails",
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sidebarStyle = {
    width: collapsed && !isMobile ? "var(--sidebar-w-col)" : "var(--sidebar-w)",
    minHeight: "100vh",
    background: "var(--sb-bg)",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    position: isMobile ? "fixed" : "relative",
    left: 0, top: 0, bottom: 0,
    transform: isMobile ? (mobileOpen ? "translateX(0)" : "translateX(-100%)") : "none",
    transition: "width .3s cubic-bezier(.4,0,.2,1), transform .3s cubic-bezier(.4,0,.2,1), background .3s",
    zIndex: 50,
    boxShadow: isMobile && mobileOpen ? "8px 0 48px rgba(46,26,24,.3)" : "none",
  };

  const creditsPercent = Math.round((smsCredits / smsTotal) * 100);

  return (
    <aside style={sidebarStyle} role="navigation" aria-label="Κύρια πλοήγηση">
      {!isMobile && (
        <button
          onClick={onToggleCollapse}
          style={{
            position: "absolute", top: 28, right: -12,
            width: 24, height: 24, borderRadius: "50%",
            background: "var(--c-accent)", border: "2px solid var(--c-bg)",
            color: "#fff", fontSize: 9, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 60, boxShadow: "0 2px 8px rgba(0,0,0,0.2)", outline: "none",
          }}
        >
          <span style={{ display: "inline-block", transform: collapsed ? "rotate(180deg)" : "none", transition: "transform .3s" }}>‹</span>
        </button>
      )}

      {/* Logo Section */}
      <div style={{
        padding: "24px 16px", display: "flex", alignItems: "center",
        gap: 12, borderBottom: "1px solid rgba(232,201,188,0.1)", minHeight: 80,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, overflow: "hidden",
          flexShrink: 0, border: "1.5px solid rgba(196,135,79,0.4)",
          background: "rgba(196,135,79,0.15)", display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>
          <i className="fas fa-spa" style={{ color: "var(--c-accent)", fontSize: 18 }} />
        </div>
        <div style={{ whiteSpace: "nowrap", transition: "opacity .2s", opacity: collapsed && !isMobile ? 0 : 1 }}>
          <div style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 17, 
            fontWeight: 700, 
            color: "#f9f6f3" // ΣΤΑΘΕΡΟ ΦΩΤΕΙΝΟ ΧΡΩΜΑ
          }}>
            {tenantName}
          </div>
          <div style={{ fontSize: 9, fontWeight: 700, color: "var(--c-accent)", textTransform: "uppercase", marginTop: 2, letterSpacing: ".1em" }}>
            Management
          </div>
        </div>
      </div>

      <nav style={{ padding: 12 }}>
        <NavLabel collapsed={collapsed && !isMobile}>Κύρια</NavLabel>
        {NAV_MAIN.map((item) => (
          <NavItem key={item.id} item={item} collapsed={collapsed && !isMobile} />
        ))}
      </nav>

      <div style={{ flex: 1 }} />

      <nav style={{ padding: 12 }}>
        <NavLabel collapsed={collapsed && !isMobile}>Διαχείριση</NavLabel>
        {NAV_MANAGE.map((item) => (
          <NavItem key={item.id} item={item} collapsed={collapsed && !isMobile} />
        ))}
      </nav>

      {/* SMS Credits */}
      <div style={{
        margin: "8px 12px 16px", padding: "12px 14px", borderRadius: "var(--r-md)",
        background: "rgba(249,246,243,0.04)", border: "1px solid rgba(232,201,188,0.1)",
        opacity: collapsed && !isMobile ? 0 : 1,
      }}>
        <div style={{ fontSize: 9, fontWeight: 900, color: "rgba(249,246,243,0.3)", marginBottom: 6 }}>SMS Credits</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#f9f6f3", lineHeight: 1 }}>
          {smsCredits}
        </div>
        <div style={{ height: 3, background: "rgba(249,246,243,0.08)", borderRadius: 99, marginTop: 10 }}>
          <div style={{ height: "100%", width: `${creditsPercent}%`, background: "var(--c-accent)", borderRadius: 99 }} />
        </div>
      </div>
    </aside>
  );
}

/* ── Sub-components ── */
function NavLabel({ children, collapsed }) {
  return (
    <div style={{
      fontSize: 9, fontWeight: 900, letterSpacing: ".2em",
      textTransform: "uppercase", color: "rgba(249,246,243,0.2)",
      padding: "12px 8px 6px", opacity: collapsed ? 0 : 1,
    }}>
      {children}
    </div>
  );
}

function NavItem({ item, collapsed }) {
  const [hovered, setHovered] = useState(false);
  
  const isStores = item.id === "stores";

  return (
    <NavLink
      to={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={({ isActive }) => ({
        display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: "var(--r-sm)",
        textDecoration: "none",
        background: isActive ? "rgba(196,135,79,0.15)" : hovered ? "rgba(249,246,243,0.07)" : "transparent",
        transition: "background .2s", position: "relative", marginBottom: 4,
      })}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 3, background: "var(--c-accent)", borderRadius: "0 3px 3px 0" }} />
          )}

          <div style={{
            width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
            color: isActive ? "var(--c-accent)" : (isStores ? "#f9f6f3" : "rgba(249,246,243,0.35)"),
          }}>
            <i className={`fas ${item.icon}`} />
          </div>

          <span style={{
            fontSize: 13, fontWeight: isActive ? 700 : 500,
            // ΔΙΟΡΘΩΣΗ: Χρησιμοποιούμε #f9f6f3 αντί για var(--c-bg) στο isActive
            color: (isStores || isActive) ? "#f9f6f3" : "rgba(249,246,243,0.8)",
            opacity: collapsed ? 0 : 1, width: collapsed ? 0 : "auto", overflow: "hidden", whiteSpace: "nowrap",
          }}>
            {item.label}
          </span>

          {item.badge && !collapsed && (
            <span style={{ marginLeft: "auto", minWidth: 18, height: 18, padding: "0 5px", borderRadius: 99, background: "var(--c-accent)", color: "#fff", fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {item.badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}