import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

/* ═══════════════════════════════════════
   ADMIN NAV DATA (Platform Admin)
═══════════════════════════════════════ */
const ADMIN_NAV = [
  { href: "/admin",     icon: "fa-chart-pie",    label: "Πίνακας Ελέγχου", id: "dashboard" },
  { href: "/admin/tenants",  icon: "fa-building",      label: "Tenants",         id: "tenants", badge: 24 },
  { href: "/admin/users",    icon: "fa-users-cog",     label: "Χρήστες",         id: "users" },
  { href: "/admin/settings", icon: "fa-sliders-h",     label: "Ρυθμίσεις",       id: "settings" },
];

/* ═══════════════════════════════════════
   ADMIN SIDEBAR (Platform Admin)
═══════════════════════════════════════ */
export default function AdminSidebar({
  collapsed = false,
  mobileOpen = false,
  onToggleCollapse,
  onCloseMobile,
  adminName = "Ελένη Παππά",
}) {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

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

  // Check if current route is active
  const isActive = (href) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside style={sidebarStyle} role="navigation" aria-label="Πλοήγηση Πλατφόρμας">
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

      {/* Logo Section - Connect SaaS Platform Admin */}
      <div style={{
        padding: "24px 16px", display: "flex", alignItems: "center",
        gap: 12, borderBottom: "1px solid rgba(232,201,188,0.1)", minHeight: 80,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, overflow: "hidden",
          flexShrink: 0, border: "1.5px solid rgba(196,135,79,0.4)",
          background: "#2E1A18", display: "flex",
          alignItems: "center", justifyContent: "center",
          color: "var(--c-accent)", fontSize: 20,
        }}>
          <i className="fas fa-cloud-upload-alt" />
        </div>
        <div style={{ whiteSpace: "nowrap", transition: "opacity .2s", opacity: collapsed && !isMobile ? 0 : 1 }}>
          <div style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: 17, 
            fontWeight: 700, 
            color: "#f9f6f3"
          }}>
            Connect SaaS
          </div>
          <div style={{ fontSize: 9, fontWeight: 700, color: "var(--c-accent)", textTransform: "uppercase", marginTop: 2, letterSpacing: ".1em" }}>
            Platform Admin
          </div>
        </div>
      </div>

      {/* Platform Navigation */}
      <nav style={{ padding: 12 }}>
        <NavLabel collapsed={collapsed && !isMobile}>Πλατφόρμα</NavLabel>
        {ADMIN_NAV.map((item) => (
          <AdminNavItem 
            key={item.id} 
            item={item} 
            collapsed={collapsed && !isMobile} 
            isActive={isActive(item.href)}
          />
        ))}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Super Admin Info */}
      <div style={{ padding: "12px", marginTop: "auto", opacity: collapsed && !isMobile ? 0 : 1 }}>
        <div style={{ 
          padding: "12px", 
          background: "rgba(249,246,243,0.04)", 
          borderRadius: "var(--r-md)", 
          border: "1px solid rgba(232,201,188,0.1)" 
        }}>
          <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: ".1em", color: "rgba(249,246,243,0.3)" }}>
            SUPER ADMIN
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#f9f6f3", marginTop: 4 }}>
            {adminName}
          </div>
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

function AdminNavItem({ item, collapsed, isActive }) {
  const [hovered, setHovered] = useState(false);
  const [showTip, setShowTip] = useState(false);

  return (
    <NavLink
      to={item.href}
      onMouseEnter={() => { setHovered(true); if (collapsed) setShowTip(true); }}
      onMouseLeave={() => { setHovered(false); setShowTip(false); }}
      style={{
        display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: "var(--r-sm)",
        textDecoration: "none",
        background: isActive ? "rgba(196,135,79,0.15)" : hovered ? "rgba(249,246,243,0.07)" : "transparent",
        transition: "background .2s", position: "relative", marginBottom: 4,
      }}
    >
      {isActive && (
        <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 3, background: "var(--c-accent)", borderRadius: "0 3px 3px 0" }} />
      )}

      <div style={{
        width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
        color: isActive ? "var(--c-accent)" : "rgba(249,246,243,0.35)",
      }}>
        <i className={`fas ${item.icon}`} />
      </div>

      <span style={{
        fontSize: 13, fontWeight: isActive ? 700 : 500,
        color: isActive ? "#f9f6f3" : "rgba(249,246,243,0.8)",
        opacity: collapsed ? 0 : 1, width: collapsed ? 0 : "auto", overflow: "hidden", whiteSpace: "nowrap",
      }}>
        {item.label}
      </span>

      {item.badge && !collapsed && (
        <span style={{ 
          marginLeft: "auto", 
          minWidth: 18, height: 18, 
          padding: "0 5px", 
          borderRadius: 99, 
          background: "var(--c-accent)", 
          color: "#fff", 
          fontSize: 9, 
          fontWeight: 900, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center" 
        }}>
          {item.badge}
        </span>
      )}

      {/* Tooltip for collapsed sidebar */}
      {collapsed && showTip && (
        <div style={{
          position: "absolute",
          left: 60,
          top: "50%",
          transform: "translateY(-50%)",
          background: "var(--sb-bg)",
          color: "white",
          padding: "6px 12px",
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 600,
          whiteSpace: "nowrap",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 100,
        }}>
          {item.label}
        </div>
      )}
    </NavLink>
  );
}