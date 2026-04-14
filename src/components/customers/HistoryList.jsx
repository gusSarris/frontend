const STATUS_LABELS = { active: "Προγραμματισμένο", done: "Ολοκληρώθηκε" };
const STATUS_COLORS = { active: "var(--s-active)", done: "var(--s-done)" };

export default function HistoryList({ history }) {
  return (
    <div>
      <div className="section-title">Ιστορικό Επισκέψεων</div>
      <div className="history-list">
        {history.map((h, i) => {
          const todayStyle = h.status === "active"
            ? {
                background: "rgba(196,135,79,0.05)",
                padding: 12,
                borderRadius: "var(--r-sm)",
                border: "1px solid rgba(196,135,79,0.2)",
              }
            : undefined;
          const dayColor = h.status === "active" ? "var(--c-accent)" : undefined;

          return (
            <div key={i} className="hist-item" style={todayStyle}>
              <div className="hist-date">
                <div className="hd-day" style={{ color: dayColor }}>{h.date}</div>
                <div className="hd-mo">{h.month}</div>
              </div>
              <div className="hist-content">
                <div className="hc-title">
                  {h.service}
                  {h.note && (
                    <span style={{ color: "var(--c-mid)", fontWeight: 400 }}> ({h.note})</span>
                  )}
                </div>
                <div className="hc-sub">
                  {h.sub} <span style={{ margin: "0 4px" }}>•</span>
                  <span style={{ color: STATUS_COLORS[h.status], fontWeight: 700 }}>
                    {STATUS_LABELS[h.status]}
                  </span>
                </div>
              </div>
              <div className="hist-price">{h.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
