import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { MOCK_STORES } from "../mocks/storesMocks";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

/* ═══════════════════════════════════════
   DESIGN TOKENS — injected as CSS vars
═══════════════════════════════════════ */
const TOKENS_CSS = `
  :root {
    --c-bg:#F9F6F3; --c-surface:#FFFFFF; --c-dark:#2E1A18;
    --c-mid:#6B3F3A; --c-primary:#9D6A65; --c-accent:#C4874F;
    --c-light:#E8C9BC; --c-muted:#F0EAE6; --c-shadow:rgba(46,26,24,0.10);
    --s-active:#C4874F; --s-next:#4A7FA5; --s-done:#5A8A6A; --s-urgent:#B85450;
    --r-xs:6px; --r-sm:10px; --r-md:14px; --r-lg:20px; --r-xl:28px;
    --sidebar-w:240px; --sidebar-w-col:64px;
    --focus-ring:0 0 0 3px rgba(196,135,79,0.4);
    --sk-base:#ede8e4; --sk-shine:#f7f3f0; --sb-bg:#2E1A18;
  }
  [data-theme="dark"] {
    --c-bg:#1A1210; --c-surface:#231815; --c-dark:#F2EBE6;
    --c-mid:#C4A49F; --c-primary:#B08A85; --c-accent:#D49A60;
    --c-light:#4A2E2A; --c-muted:#2E1E1B; --c-shadow:rgba(0,0,0,0.4);
    --sk-base:#2a1c19; --sk-shine:#3a2825; --sb-bg:#150e0d;
  }
  * { box-sizing:border-box; margin:0; padding:0; }
  html, body, #root { height:100%; width:100%; overflow:hidden; }
  body { font-family:'DM Sans',sans-serif; background:var(--c-bg); color:var(--c-dark); display:flex; }
  :focus { outline:none; }
  :focus-visible { box-shadow:var(--focus-ring)!important; outline:none; border-radius:var(--r-xs); }
  @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes toastIn { from{opacity:0;transform:translateY(12px) scale(0.95)} to{opacity:1;transform:none} }
  @keyframes toastOut { to{opacity:0;transform:translateY(8px) scale(0.96)} }
  @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  .animate-fadeUp { animation:fadeUp .4s ease both; }
  .sk { background:linear-gradient(90deg,var(--sk-base) 25%,var(--sk-shine) 50%,var(--sk-base) 75%); background-size:800px 100%; animation:shimmer 1.4s infinite; border-radius:6px; }
`;

/* ═══════════════════════════════════════
   CONTEXTS
═══════════════════════════════════════ */
export const ThemeContext = createContext(null);
export const ToastContext = createContext(null);
export const ModalContext  = createContext(null);
export const StoreContext  = createContext(null);

/* ═══════════════════════════════════════
   TOAST SYSTEM
═══════════════════════════════════════ */
function ToastContainer({ toasts, removeToast }) {
  return (
    <div
      id="toastContainer"
      role="status"
      aria-live="polite"
      aria-atomic="false"
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 9999,
        display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none",
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => removeToast(t.id)}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 16px", borderRadius: "var(--r-md)",
            background: "var(--c-dark)", color: "var(--c-bg)",
            fontSize: 13, fontWeight: 600, minWidth: 240,
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            pointerEvents: "all", cursor: "pointer",
            animation: t.removing ? "toastOut .25s ease forwards" : "toastIn .35s cubic-bezier(.34,1.56,.64,1) both",
          }}
        >
          <i
            className={`fas ${t.type === "success" ? "fa-check-circle" : t.type === "error" ? "fa-circle-xmark" : "fa-circle-info"}`}
            style={{ color: t.type === "success" ? "#6ec97a" : t.type === "error" ? "var(--s-urgent)" : "var(--c-accent)", fontSize: 15, flexShrink: 0 }}
          />
          <span style={{ flex: 1 }}>{t.message}</span>
          <i className="fas fa-xmark" style={{ opacity: 0.4, fontSize: 12, flexShrink: 0 }} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN LAYOUT
═══════════════════════════════════════ */
export default function MainLayout({ children, pageTitle = "Πίνακας Ελέγχου" }) {
  /* ── Theme ── */
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("gnTheme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("gnTheme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  /* ── Sidebar ── */
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar-collapsed") === "true" && window.innerWidth > 768;
    }
    return false;
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapse = useCallback(() => {
    setCollapsed((c) => {
      localStorage.setItem("sidebar-collapsed", !c);
      return !c;
    });
  }, []);

  /* ── Active Store (null = Όλα τα καταστήματα)
     API: ο Owner βλέπει όλα. Employee/Manager έχουν store_id στο JWT.
     Εδώ ο Owner επιλέγει μέσω StoreSwitcher ποιο store θέλει να βλέπει. ── */
  const [activeStore, setActiveStore] = useState(null);

  /* ── Toasts ── */
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, removing: false }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => t.id === id ? { ...t, removing: true } : t));
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 250);
    }, 3500);
  }, []);
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.map((t) => t.id === id ? { ...t, removing: true } : t));
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 250);
  }, []);

  /* ── Inject CSS tokens ── */
  useEffect(() => {
    if (!document.getElementById("gn-tokens")) {
      const style = document.createElement("style");
      style.id = "gn-tokens";
      style.textContent = TOKENS_CSS;
      document.head.prepend(style);
    }
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
    link1.id = "fa-css";
    if (!document.getElementById("fa-css")) document.head.appendChild(link1);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700;9..40,900&display=swap";
    link2.id = "gn-fonts";
    if (!document.getElementById("gn-fonts")) document.head.appendChild(link2);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StoreContext.Provider value={{ activeStore, setActiveStore, stores: MOCK_STORES }}>
      <ToastContext.Provider value={{ showToast }}>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            background: "var(--c-bg)",
            color: "var(--c-dark)",
            width: "100vw",
            height: "100vh",
            display: "flex",
            overflow: "hidden",
            transition: "background .3s, color .3s",
          }}
        >
          {/* Skip link */}
          <a
            href="#mainContent"
            style={{
              position: "absolute", top: "-100%", left: 16,
              background: "var(--c-accent)", color: "#fff",
              padding: "8px 16px", borderRadius: "var(--r-sm)",
              fontWeight: 700, fontSize: 13, zIndex: 9999, textDecoration: "none",
              transition: "top .2s",
            }}
            onFocus={(e) => { e.target.style.top = "8px"; }}
            onBlur={(e) => { e.target.style.top = "-100%"; }}
          >
            Μετάβαση στο περιεχόμενο
          </a>

          {/* Mobile overlay */}
          {mobileOpen && (
            <div
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block", position: "fixed", inset: 0,
                background: "rgba(46,26,24,.5)", zIndex: 40,
                backdropFilter: "blur(2px)",
              }}
            />
          )}

          {/* Sidebar */}
          <Sidebar
            collapsed={collapsed}
            mobileOpen={mobileOpen}
            onToggleCollapse={toggleCollapse}
            onCloseMobile={() => setMobileOpen(false)}
          />

          {/* Main wrapper */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, height: "100vh" }}>
            <Topbar
              title={pageTitle}
              theme={theme}
              onToggleTheme={toggleTheme}
              onOpenMobile={() => setMobileOpen(true)}
            />
            <main
              id="mainContent"
              style={{
                flex: 1, overflowY: "auto",
                padding: 28
              }}
            >
              {children}
            </main>
          </div>

          {/* Toasts */}
          <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
      </ToastContext.Provider>
      </StoreContext.Provider>
    </ThemeContext.Provider>
  );
}

/* ── Custom hooks for consumers ── */
export function useToast()  { return useContext(ToastContext);  }
export function useTheme()  { return useContext(ThemeContext);  }
export function useStore()  { return useContext(StoreContext);  }
