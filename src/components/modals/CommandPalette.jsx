import { useEffect, useRef, useState } from "react";

/**
 * CommandPalette — ⌘K overlay με γρήγορες ενέργειες
 *
 * Props:
 *   open:     boolean
 *   onClose:  () => void
 *   actions:  Array<{ icon, label, sub?, action: () => void }>
 *
 * Keyboard shortcut registration γίνεται από τον parent (Topbar) —
 * αυτό το component απλά χειρίζεται ArrowUp/Down/Enter/Escape μέσα στο input.
 */
export default function CommandPalette({ open, onClose, actions = [] }) {
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  const filtered = query.trim()
    ? actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()))
    : actions;

  useEffect(() => {
    if (open) {
      setQuery("");
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const run = (i) => {
    const a = filtered[i];
    if (a) a.action?.();
    onClose?.();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      run(idx);
    }
    if (e.key === "Escape") onClose?.();
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Γρήγορη ενέργεια"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(46,26,24,0.45)",
        backdropFilter: "blur(4px)",
        zIndex: 8000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "15vh",
        animation: "fadeIn .15s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--c-surface)",
          borderRadius: "var(--r-xl)",
          width: 560,
          maxWidth: "90vw",
          boxShadow: "0 24px 64px rgba(46,26,24,0.3)",
          border: "1.5px solid var(--c-light)",
          overflow: "hidden",
          animation: "fadeUp .2s ease",
        }}
      >
        {/* Input row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 20px",
            borderBottom: "1px solid var(--c-muted)",
          }}
        >
          <i
            className="fas fa-search"
            style={{ color: "var(--c-primary)", fontSize: 15, opacity: 0.6, flexShrink: 0 }}
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIdx(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Αναζήτηση ενέργειας ή πελάτη..."
            autoComplete="off"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "inherit",
              fontSize: 15,
              color: "var(--c-dark)",
            }}
          />
          <span
            style={{
              fontSize: 10,
              background: "var(--c-muted)",
              borderRadius: 4,
              padding: "2px 6px",
              color: "var(--c-primary)",
            }}
          >
            ESC
          </span>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 340, overflowY: "auto" }}>
          {filtered.length > 0 ? (
            <>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "var(--c-mid)",
                  padding: "10px 20px 4px",
                  opacity: 0.6,
                }}
              >
                Ενέργειες
              </div>
              {filtered.map((a, i) => (
                <div
                  key={i}
                  onClick={() => run(i)}
                  onMouseEnter={() => setIdx(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 20px",
                    cursor: "pointer",
                    background: i === idx ? "rgba(196,135,79,0.08)" : "transparent",
                    transition: "background .15s",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "var(--c-bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      color: "var(--c-primary)",
                      flexShrink: 0,
                    }}
                  >
                    <i className={`fas ${a.icon}`} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--c-dark)" }}>
                      {a.label}
                    </div>
                    {a.sub && (
                      <div style={{ fontSize: 11, color: "var(--c-primary)", opacity: 0.7 }}>
                        {a.sub}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div
              style={{
                padding: 24,
                textAlign: "center",
                color: "var(--c-primary)",
                opacity: 0.5,
                fontSize: 13,
              }}
            >
              Δεν βρέθηκαν αποτελέσματα
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div
          style={{
            padding: "10px 20px",
            borderTop: "1px solid var(--c-muted)",
            display: "flex",
            gap: 16,
          }}
        >
          {[
            ["↑↓", "πλοήγηση"],
            ["↵", "επιλογή"],
            ["ESC", "κλείσιμο"],
          ].map(([k, lbl]) => (
            <span
              key={k}
              style={{
                fontSize: 10,
                color: "var(--c-primary)",
                opacity: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <kbd
                style={{
                  background: "var(--c-muted)",
                  padding: "1px 4px",
                  borderRadius: 3,
                  fontSize: 9,
                }}
              >
                {k}
              </kbd>{" "}
              {lbl}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
