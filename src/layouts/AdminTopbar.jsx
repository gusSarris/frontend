import { useContext } from "react";
import { ToastContext } from "./MainLayout";

/* ═══════════════════════════════════════
   ADMIN TOPBAR (Landlord View)
═══════════════════════════════════════ */
export default function AdminTopbar({
  theme = "light",
  onToggleTheme,
  onOpenMobile,
  onSwitchToTenantView,
  adminName = "Ελένη",
}) {
  const toast = useContext(ToastContext);
  const showToast = toast?.showToast ?? (() => {});

  const handleSwitchToTenant = () => {
    showToast('Μετάβαση στην προβολή Tenant (Glamour Nails)…', 'info');
    if (onSwitchToTenantView) {
      onSwitchToTenantView();
    } else {
      // Default behavior - navigate to tenant dashboard
      setTimeout(() => { window.location.href = '/'; }, 600);
    }
  };

  return (
    <>
      {/* ── Admin Top Bar ── */}
      <header
        data-topbar
        style={{
          height: 60,
          background: "rgba(249,246,243,0.88)",
          backdropFilter: "blur(24px) saturate(160%)",
          borderBottom: "1px solid rgba(232,201,188,0.45)",
          display: "flex",
          alignItems: "center",
          padding: "0 28px",
          gap: 16,
          flexShrink: 0,
          position: "sticky",
          top: 0,
          zIndex: 30,
          transition: "background .3s, border-color .3s",
        }}
      >
        {/* Mobile hamburger */}
        <button
          onClick={onOpenMobile}
          aria-label="Άνοιγμα μενού"
          className="mobile-menu-btn"
          style={{
            display: "none",
            width: 36, height: 36,
            borderRadius: "var(--r-sm)",
            border: "1.5px solid var(--c-light)",
            background: "var(--c-surface)",
            color: "var(--c-mid)",
            fontSize: 14,
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            outline: "none",
          }}
        >
          <i className="fas fa-bars" aria-hidden="true" />
        </button>

        {/* Title */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20,
            fontWeight: 600,
            color: "var(--c-dark)",
            flex: 1,
          }}
        >
          Καλώς ήρθες, {adminName}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Context Badge - Landlord View */}
          <div
            className="context-badge"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "var(--c-muted)",
              padding: "4px 12px",
              borderRadius: 99,
              border: "1px solid var(--c-light)",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--c-dark)",
            }}
          >
            <i className="fas fa-database" style={{ fontSize: 10, color: "var(--c-accent)" }} />
            Landlord View
          </div>

          {/* Switch to Tenant button */}
          <button
            onClick={handleSwitchToTenant}
            style={{
              height: 36,
              padding: "0 14px",
              borderRadius: "var(--r-sm)",
              border: "1.5px solid var(--c-light)",
              background: "var(--c-surface)",
              color: "var(--c-mid)",
              fontFamily: "inherit",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 7,
              transition: "all .2s",
              outline: "none",
            }}
          >
            <i className="fas fa-store-alt" />
            Μετάβαση σε Tenant
          </button>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Εναλλαγή σκοτεινού/φωτεινού θέματος"
            style={{
              width: 36, height: 36,
              borderRadius: "var(--r-sm)",
              border: "1.5px solid var(--c-light)",
              background: "var(--c-surface)",
              color: "var(--c-mid)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              transition: "all .2s",
              outline: "none",
            }}
          >
            <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`} />
          </button>
        </div>
      </header>

      {/* Mobile CSS overrides */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          [data-topbar] { padding: 0 16px !important; gap: 8px !important; }
          .context-badge { display: none !important; }
        }
        
        /* Dark theme adjustments */
        [data-theme="dark"] [data-topbar] {
          background: rgba(26,18,16,0.92);
          border-color: rgba(74,46,42,0.5);
        }
      `}</style>
    </>
  );
}