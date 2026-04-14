import { useContext } from "react";
import { ToastContext } from "../../layouts/MainLayout";

/**
 * WaitlistPanel — slide-in panel δεξιά με πελάτες σε αναμονή
 *
 * Props:
 *   open:      boolean
 *   onClose:   () => void
 *   items:     Array<{ id?, name, detail, customerId? }>
 *   onNotify?: (item) => void    // αν δοθεί, overrides default toast
 *
 * API integration:
 *   Το waitlist δεν υπάρχει ως ξεχωριστό entity στο API Reference.
 *   Δύο επιλογές:
 *   1) Κράτα το client-side (localStorage) προς το παρόν.
 *   2) Όταν ο χρήστης πατά "Ειδοποίηση για Κενό" → POST /api/notifications
 *      { recipient, channel:"SMS", message:"...", status:"SENT", customer }
 */
export default function WaitlistPanel({ open, onClose, items = [], onNotify }) {
  const toastCtx = useContext(ToastContext);
  const showToast = toastCtx?.showToast;

  const handleNotify = (item) => {
    if (onNotify) {
      onNotify(item);
    } else {
      showToast?.(`Ειδοποίηση στάλθηκε στην/στον ${item.name}!`, "success");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(46,26,24,0.4)",
          backdropFilter: "blur(2px)",
          zIndex: 80,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .3s",
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Λίστα αναμονής"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 380,
          maxWidth: "100%",
          background: "var(--c-bg)",
          zIndex: 90,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 32px rgba(46,26,24,0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 24,
            borderBottom: "1px solid var(--c-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--c-surface)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20,
                fontWeight: 700,
                color: "var(--c-dark)",
              }}
            >
              Λίστα Αναμονής
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--c-primary)",
                opacity: 0.8,
                marginTop: 2,
              }}
            >
              {items.length} πελάτες αναζητούν κενό
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Κλείσιμο"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--c-bg)",
              border: "1px solid var(--c-light)",
              color: "var(--c-mid)",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "var(--c-primary)",
                opacity: 0.6,
                fontSize: 13,
                padding: "32px 0",
              }}
            >
              <i
                className="far fa-hourglass-half"
                style={{ fontSize: 32, display: "block", marginBottom: 12, opacity: 0.4 }}
              />
              Κανένας πελάτης σε αναμονή
            </div>
          ) : (
            items.map((w, i) => (
              <div
                key={w.id ?? i}
                style={{
                  background: "var(--c-surface)",
                  border: "1px solid var(--c-light)",
                  borderRadius: "var(--r-sm)",
                  padding: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--c-dark)" }}>
                      {w.name}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--c-mid)", marginTop: 4 }}>
                      <i className="far fa-clock" style={{ marginRight: 4 }} />
                      {w.detail}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleNotify(w)}
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 6,
                    background: "rgba(196,135,79,0.1)",
                    color: "var(--c-dark)",
                    border: "1px solid rgba(196,135,79,0.2)",
                    fontFamily: "inherit",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "background .2s",
                    outline: "none",
                  }}
                >
                  <i className="fas fa-paper-plane" style={{ marginRight: 4 }} /> Ειδοποίηση για Κενό
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
