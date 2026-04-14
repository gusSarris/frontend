import { useRef } from "react";
import {
  addDays, formatDateLabel, fromISODate, isSameDay,
  startOfToday, subMonths, toISODate,
} from "../../utils/dateLabel";

export default function DatePickerControl({ value, onChange }) {
  const inputRef = useRef(null);

  const today = startOfToday();
  const minDate = subMonths(today, 1); // 1 μήνας πίσω

  const isToday = isSameDay(value, today);
  const prevDisabled = addDays(value, -1) < minDate;

  const goRel = (delta) => {
    const next = addDays(value, delta);
    if (next < minDate) return;
    onChange(next);
  };

  /* Ανοίγει το native picker από κλικ στο κουμπί ημερομηνίας.
     showPicker() υποστηρίζεται: Chrome 99+, Firefox 101+, Safari 16+ */
  const openPicker = () => {
    const el = inputRef.current;
    if (!el) return;
    if (typeof el.showPicker === "function") {
      try { el.showPicker(); return; } catch { /* user gesture required — εδώ είμαστε ok */ }
    }
    // Fallback για παλιά browsers
    el.focus();
    el.click();
  };

  const onInputChange = (e) => {
    if (!e.target.value) return;
    onChange(fromISODate(e.target.value));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative",marginRight:"30px" }}>
      {/* Hidden native date input — δέχεται τα clicks μέσω showPicker().
         Anchored στο κάτω-μέσο του wrapper ώστε το browser popup να ανοίγει εκεί. */}
      <input
        ref={inputRef}
        type="date"
        value={toISODate(value)}
        min={toISODate(minDate)}
        onChange={onInputChange}
        tabIndex={-1}
        aria-hidden="true"
        style={{
          position: "absolute", left: "50%", bottom: 0,
          width: 1, height: 1, opacity: 0, pointerEvents: "none",
          padding: 0, margin: 0, border: 0,
        }}
      />

      {/* Prev / date button / Next */}
      <div style={{
        display: "flex", alignItems: "center",
        background: "var(--c-bg)", border: "1.5px solid var(--c-light)",
        borderRadius: "var(--r-sm)", height: 32,
      }}>
        <button
          onClick={() => goRel(-1)}
          disabled={prevDisabled}
          aria-label="Προηγούμενη ημέρα"
          style={{
            height: "100%", border: "none",
            borderRadius: "var(--r-sm) 0 0 var(--r-sm)",
            padding: "0 10px", background: "transparent",
            cursor: prevDisabled ? "not-allowed" : "pointer",
            outline: "none",
            opacity: prevDisabled ? 0.3 : 1,
          }}
        >
          <i className="fas fa-chevron-left" style={{ fontSize: 10, color: "var(--c-mid)" }} />
        </button>
        <div style={{ width: 1, height: 16, background: "var(--c-light)" }} />

        <button
          onClick={openPicker}
          aria-label="Επιλογή ημερομηνίας"
          style={{
            height: "100%", border: "none",
            padding: "0 12px", background: "transparent",
            cursor: "pointer", outline: "none",
            display: "flex", alignItems: "center", gap: 4,
          }}
        >
          <i className="far fa-calendar-alt" style={{ fontSize: 11, color: "var(--c-primary)" }} />
          <span style={{ fontSize: 12, color: "var(--c-dark)" }}>{formatDateLabel(value)}</span>
        </button>

        <div style={{ width: 1, height: 16, background: "var(--c-light)" }} />
        <button
          onClick={() => goRel(1)}
          aria-label="Επόμενη ημέρα"
          style={{
            height: "100%", border: "none",
            borderRadius: "0 var(--r-sm) var(--r-sm) 0",
            padding: "0 10px", background: "transparent",
            cursor: "pointer", outline: "none",
          }}
        >
          <i className="fas fa-chevron-right" style={{ fontSize: 10, color: "var(--c-mid)" }} />
        </button>
      </div>

      {/* Σήμερα — εμφανίζεται μόνο αν δεν είσαι ήδη σήμερα */}
      {!isToday && (
        <button
          onClick={() => onChange(today)}
          style={{
            height: 32, padding: "0 12px", borderRadius: "var(--r-sm)",
            border: "1.5px solid var(--c-light)", background: "var(--c-bg)",
            color: "var(--c-mid)", fontFamily: "inherit",
            fontSize: 11, fontWeight: 700,
            cursor: "pointer", transition: "all .2s", outline: "none",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--c-dark)";
            e.currentTarget.style.color = "var(--c-dark)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--c-light)";
            e.currentTarget.style.color = "var(--c-mid)";
          }}
        >
          Σήμερα
        </button>
      )}
    </div>
  );
}
