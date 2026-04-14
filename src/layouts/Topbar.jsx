import { useContext, useEffect, useRef, useState } from "react";
import CommandPalette from "../components/modals/CommandPalette";
import { StoreContext } from "./MainLayout";

/* ═══════════════════════════════════════
   STORE SWITCHER
   Ο Owner επιλέγει ποιο κατάστημα βλέπει.
   Employee/Manager βλέπουν αυτόματα μόνο το δικό τους (store_id στο JWT).
   API: το activeStore.id χρησιμοποιείται ως φίλτρο σε όλα τα GET requests.
═══════════════════════════════════════ */
function StoreSwitcher() {
  const { activeStore, setActiveStore, stores } = useContext(StoreContext) ?? {};
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  /* Κλείσιμο με κλικ έξω ή Escape */
  useEffect(() => {
    if (!open) return;
    const onKey  = (e) => { if (e.key === "Escape") setOpen(false); };
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("keydown",   onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown",   onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  if (!stores?.length) return null;

  const label = activeStore ? activeStore.name : "Όλα τα Καταστήματα";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          height: 36, padding: "0 12px",
          borderRadius: "var(--r-sm)",
          border: `1.5px solid ${open ? "var(--c-accent)" : "var(--c-light)"}`,
          background: activeStore ? "rgba(196,135,79,0.08)" : "var(--c-surface)",
          color: activeStore ? "var(--c-accent)" : "var(--c-mid)",
          fontFamily: "inherit", fontSize: 12, fontWeight: activeStore ? 700 : 500,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 7,
          transition: "all .2s", outline: "none", whiteSpace: "nowrap",
        }}
      >
        <i className="fas fa-store" style={{ fontSize: 11 }} />
        {label}
        <i className={`fas fa-chevron-${open ? "up" : "down"}`} style={{ fontSize: 9, opacity: .6 }} />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0,
          minWidth: 220, background: "var(--c-surface)",
          border: "1.5px solid var(--c-light)", borderRadius: "var(--r-md)",
          boxShadow: "0 8px 32px var(--c-shadow)", zIndex: 200,
          overflow: "hidden", animation: "fadeUp .15s ease both",
        }}>
          {/* «Όλα» option */}
          <DropItem
            label="Όλα τα Καταστήματα"
            icon="fa-layer-group"
            active={!activeStore}
            onClick={() => { setActiveStore(null); setOpen(false); }}
          />
          <div style={{ height: 1, background: "var(--c-muted)", margin: "4px 0" }} />
          {/* Per-store options */}
          {stores.map((store) => (
            <DropItem
              key={store.id}
              label={store.name}
              sub={store.address}
              icon="fa-store"
              active={activeStore?.id === store.id}
              inactive={!store.isActive}
              onClick={() => { setActiveStore(store); setOpen(false); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DropItem({ label, sub, icon, active, inactive, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%", display: "flex", alignItems: "center", gap: 10,
        padding: "9px 14px", border: "none", cursor: "pointer", outline: "none",
        background: active ? "rgba(196,135,79,0.1)" : hov ? "var(--c-muted)" : "transparent",
        textAlign: "left", transition: "background .12s",
      }}
    >
      <i className={`fas ${icon}`} style={{ fontSize: 12, color: active ? "var(--c-accent)" : inactive ? "var(--c-light)" : "var(--c-mid)", width: 14, textAlign: "center" }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? "var(--c-accent)" : inactive ? "var(--c-primary)" : "var(--c-dark)", display: "flex", alignItems: "center", gap: 6 }}>
          {label}
          {inactive && <span style={{ fontSize: 9, fontWeight: 700, color: "var(--s-urgent)", background: "rgba(184,84,80,0.1)", padding: "1px 6px", borderRadius: 99 }}>ΑΝΕΝΕΡΓΟ</span>}
        </div>
        {sub && <div style={{ fontSize: 10, color: "var(--c-primary)", opacity: .6, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub}</div>}
      </div>
      {active && <i className="fas fa-check" style={{ fontSize: 10, color: "var(--c-accent)", flexShrink: 0 }} />}
    </button>
  );
}

/* ═══════════════════════════════════════
   COMMAND PALETTE ACTIONS (builder)
═══════════════════════════════════════ */
const makeActions = ({ openApptModal, toggleTheme, openWaitlist, navigate }) => [
  { icon: "fa-plus",          label: "Νέο Ραντεβού",       sub: "Ctrl+Space για γρήγορο άνοιγμα", action: () => openApptModal?.() },
  { icon: "fa-user-heart",    label: "Πελατολόγιο",        sub: "Μετάβαση στη σελίδα πελατών",    action: () => navigate?.("/customers") },
  { icon: "fa-hourglass-half",label: "Λίστα Αναμονής",     sub: "Δείτε πελάτες που αναμένουν",    action: () => openWaitlist?.() },
  { icon: "fa-moon",          label: "Dark / Light Mode",   sub: "Εναλλαγή θέματος",               action: () => toggleTheme?.() },
  { icon: "fa-chevron-left",  label: "Προηγούμενη Μέρα",   sub: "",                                action: () => navigate?.("prev-day") },
  { icon: "fa-chevron-right", label: "Επόμενη Μέρα",        sub: "",                                action: () => navigate?.("next-day") },
];

/* ═══════════════════════════════════════
   TOPBAR
═══════════════════════════════════════ */
export default function Topbar({
  theme = "light",
  onToggleTheme,
  onOpenMobile,
  onOpenApptModal,
  onOpenWaitlist,
  waitlistCount = 2,
  user = { initials: "ΜΚ", name: "Μαρία Κωνσταντίνου", role: "Ιδιοκτήτρια" },
}) {
  const [clock, setClock] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);

  /* ── Live clock ── */
  useEffect(() => {
    const DAYS = ["Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο"];
    const MONTHS = ["Ιαν","Φεβ","Μαρ","Απρ","Μαΐ","Ιουν","Ιουλ","Αυγ","Σεπ","Οκτ","Νοε","Δεκ"];
    const tick = () => {
      const now = new Date();
      setClock(`${DAYS[now.getDay()]}, ${now.getDate()} ${MONTHS[now.getMonth()]} · ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  /* ── Keyboard shortcuts: ⌘K / Ctrl+Space ── */
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if (e.ctrlKey && e.code === "Space") {
        e.preventDefault();
        onOpenApptModal?.();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onOpenApptModal]);

  /* ── Build command palette actions ── */
  const actions = makeActions({
    openApptModal: onOpenApptModal,
    toggleTheme: onToggleTheme,
    openWaitlist: onOpenWaitlist,
  });

  return (
    <>
      {/* ── Command Palette (external component) ── */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        actions={actions}
      />

      {/* ── Top Bar ── */}
      <header
        data-topbar
        style={{
          height: 60,
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

        {/* Clock */}
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            opacity: 0.5,
            flex: 1,
            color: "var(--c-dark)",
          }}
        >
          {clock}
        </div>

        {/* Store Switcher */}
        <StoreSwitcher />

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Command palette trigger */}
          <button
            onClick={() => setPaletteOpen(true)}
            title="⌘K"
            style={{
              height: 36,
              padding: "0 12px",
              borderRadius: "var(--r-sm)",
              border: "1.5px solid var(--c-light)",
              background: "var(--c-surface)",
              color: "var(--c-mid)",
              fontFamily: "inherit",
              fontSize: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all .2s",
              outline: "none",
            }}
          >
            <i className="fas fa-search" style={{ fontSize: 12 }} />
            Γρήγορη ενέργεια
            <span
              style={{
                fontSize: 10,
                background: "var(--c-muted)",
                borderRadius: 4,
                padding: "1px 5px",
                color: "var(--c-primary)",
              }}
            >
              ⌘K
            </span>
          </button>

          {/* Notifications / waitlist */}
          <button
            onClick={onOpenWaitlist}
            aria-label={`Λίστα αναμονής, ${waitlistCount} πελάτες`}
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
              position: "relative",
              transition: "all .2s",
              outline: "none",
            }}
          >
            <i className="fas fa-bell" />
            {waitlistCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 4, right: 4,
                  width: 16, height: 16,
                  borderRadius: "50%",
                  background: "var(--s-urgent)",
                  border: "1.5px solid var(--c-bg)",
                  fontSize: 8,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                {waitlistCount}
              </span>
            )}
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

          {/* User account */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingLeft: 16,
              borderLeft: "1px solid var(--c-light)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 34, height: 34,
                borderRadius: "var(--r-xs)",
                background: "rgba(196,135,79,0.2)",
                border: "1.5px solid rgba(196,135,79,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 900,
                color: "var(--c-accent)",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {user.initials}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--c-dark)" }}>
                {user.name}
              </div>
              <div style={{ fontSize: 10, color: "var(--c-primary)", opacity: 0.8, marginTop: 1 }}>
                {user.role}
              </div>
            </div>
            <button
              title="Αποσύνδεση"
              style={{
                border: "none",
                background: "transparent",
                color: "var(--c-primary)",
                fontSize: 13,
                cursor: "pointer",
                padding: 4,
                borderRadius: 4,
                outline: "none",
              }}
            >
              <i className="fas fa-sign-out-alt" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile CSS overrides */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          [data-topbar] { padding: 0 16px !important; gap: 8px !important; }
        }
      `}</style>
    </>
  );
}
