import { useContext, useRef } from "react";
import { ToastContext } from "../../layouts/MainLayout";
import StatsGrid from "./StatsGrid";
import HistoryList from "./HistoryList";
import LoyaltyCard from "./LoyaltyCard";
import ContactAndNotes from "./ContactAndNotes";

export default function CustomerDetail({ customer: c, onAvatarChange, onNotesChange }) {
  const { showToast } = useContext(ToastContext);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onAvatarChange?.(c.id, ev.target.result);
      showToast("Φωτογραφία αποθηκεύτηκε!", "success");
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // allow re-upload of same file
  };

  const handleRedeem = () => showToast(`Εξαργύρωση πόντων για ${c.name}! 🎉`, "success");

  return (
    <>
      <div className="detail-header" style={{ animation: "fadeUp 0.3s ease" }}>
        <div className="d-profile">
          <div
            className="d-av-wrap"
            onClick={() => fileInputRef.current?.click()}
            title="Αλλαγή φωτογραφίας"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") fileInputRef.current?.click(); }}
          >
            <div className="d-av">
              {c.photo ? <img src={c.photo} alt={c.name} /> : c.initials}
            </div>
            <div className="d-av-overlay">
              <i className="fas fa-camera" style={{ fontSize: 16 }} />
              <span style={{ fontSize: 10, fontWeight: 700 }}>Αλλαγή</span>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="d-av-input"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div>
            <div className="d-name">
              {c.name}
              {c.isVip && (
                <i className="fas fa-star icon-vip" style={{ fontSize: 20, verticalAlign: "middle" }} />
              )}
            </div>
            <div className="d-since">
              Πελάτης από: {c.since} ·{" "}
              <span style={{ color: "var(--s-done)", fontWeight: 700 }}>
                {c.status === "new" ? "Νέος" : "Ενεργός"}
              </span>
              {c.detailTags.length > 0 && <span>&nbsp;&nbsp;</span>}
              {c.detailTags.map((t, i) => (
                <span key={i} className={`tag tag-${t.type}`}>
                  <i className="fas fa-circle-info" style={{ fontSize: 8 }} /> {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="btn-topbar"
            style={{ background: "var(--c-bg)" }}
            onClick={() => showToast(`Επεξεργασία: ${c.name}`, "info")}
            title="Επεξεργασία"
          >
            <i className="fas fa-pen" style={{ margin: 0, fontSize: 11 }} />
          </button>
          <button
            className="btn-topbar btn-topbar-primary"
            onClick={() => showToast(`Νέο ραντεβού για ${c.name}`, "success")}
          >
            <i className="fas fa-plus" /> Νέο Ραντεβού
          </button>
        </div>
      </div>

      <div className="detail-body">
        <StatsGrid customer={c} />
        <HistoryList history={c.history} />
        <LoyaltyCard customer={c} onRedeem={handleRedeem} />
        <ContactAndNotes customer={c} onNotesChange={onNotesChange} />
      </div>
    </>
  );
}
