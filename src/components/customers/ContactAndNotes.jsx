import { useContext, useEffect, useRef, useState } from "react";
import { ToastContext } from "../../layouts/MainLayout";

export default function ContactAndNotes({ customer: c, onNotesChange }) {
  const { showToast } = useContext(ToastContext);

  const [notes, setNotes] = useState(c.notes || "");
  const [saveState, setSaveState] = useState("idle"); // 'idle' | 'saving' | 'saved'
  const timerRef = useRef(null);
  const hideRef = useRef(null);

  /* Reset notes when switching customer */
  useEffect(() => {
    setNotes(c.notes || "");
    setSaveState("idle");
    clearTimeout(timerRef.current);
    clearTimeout(hideRef.current);
  }, [c.id, c.notes]);

  /* Debounced autosave */
  const handleNotesInput = (value) => {
    setNotes(value);
    setSaveState("saving");
    clearTimeout(timerRef.current);
    clearTimeout(hideRef.current);
    timerRef.current = setTimeout(() => {
      onNotesChange?.(c.id, value);
      setSaveState("saved");
      hideRef.current = setTimeout(() => setSaveState("idle"), 2000);
    }, 1000);
  };

  /* Cleanup on unmount */
  useEffect(() => () => {
    clearTimeout(timerRef.current);
    clearTimeout(hideRef.current);
  }, []);

  const indicatorClass =
    "notes-save-indicator" +
    (saveState === "saving" ? " saving visible" : "") +
    (saveState === "saved" ? " visible" : "");

  return (
    <div>
      <div className="info-list" style={{ marginBottom: 20 }}>
        <div className="info-row">
          <div className="info-icon"><i className="fas fa-mobile-alt" /></div>
          <div style={{ flex: 1 }}>
            <div className="info-text">{c.phone}</div>
            <div className="info-sub">Κύριο Τηλέφωνο</div>
          </div>
          <div className="contact-actions">
            <button
              className="btn-contact whatsapp"
              onClick={() => showToast(`WhatsApp: ${c.phone}`, "success")}
            >
              <i className="fab fa-whatsapp" />
            </button>
            <button
              className="btn-contact viber"
              onClick={() => showToast(`Viber: ${c.phone}`, "info")}
            >
              <i className="fab fa-viber" />
            </button>
            <button
              className="btn-contact"
              onClick={() => showToast(`SMS σε: ${c.phone}`, "info")}
            >
              <i className="fas fa-comment-sms" /> SMS
            </button>
          </div>
        </div>

        {c.email && (
          <div className="info-row">
            <div className="info-icon"><i className="far fa-envelope" /></div>
            <div>
              <div className="info-text">{c.email}</div>
              <div className="info-sub">Email (Δέχεται Newsletters)</div>
            </div>
          </div>
        )}
      </div>

      <div className="section-title">
        Σημειώσεις
        <i className="fas fa-lock" style={{ fontSize: 9, opacity: 0.4, marginLeft: 4 }} />
      </div>
      <textarea
        className="notes-box"
        value={notes}
        onChange={(e) => handleNotesInput(e.target.value)}
        placeholder="Προσθέστε σημειώσεις..."
      />
      <div className={indicatorClass}>
        {saveState === "saving" ? (
          <>
            <i className="fas fa-circle-notch fa-spin" style={{ fontSize: 9 }} /> Αποθήκευση...
          </>
        ) : (
          <>
            <i className="fas fa-check" style={{ fontSize: 9 }} /> Αποθηκεύτηκε
          </>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
        {c.warningTags.map((w, i) => (
          <span key={i} className="tag tag-red">
            <i className="fas fa-triangle-exclamation" style={{ fontSize: 8 }} /> {w}
          </span>
        ))}
        <button
          className="btn-topbar"
          style={{ height: 24, padding: "0 8px", fontSize: 10 }}
          onClick={() => showToast("Προσθήκη tag", "info")}
        >
          <i className="fas fa-plus" style={{ fontSize: 9 }} /> Νέο Tag
        </button>
      </div>
    </div>
  );
}
