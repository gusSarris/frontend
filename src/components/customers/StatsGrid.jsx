import Sparkline from "../dashboard/Sparkline";

export default function StatsGrid({ customer: c }) {
  const lastVisitDays =
    c.lastVisitDays !== undefined
      ? c.lastVisitDays
      : (c.history.length > 0 ? (c.daysSinceLast ?? 29) : null);

  const lastVisitColor =
    lastVisitDays === null ? "var(--c-mid)"
      : lastVisitDays > 45 ? "var(--s-urgent)"
      : lastVisitDays > 30 ? "var(--c-accent)"
      : "var(--s-done)";

  const noShowClass = c.noShows > 0 ? "bad" : "good";

  return (
    <div className="stats-grid">
      <div className="stat-box">
        <div className="sb-val">{c.visits}</div>
        <div className="sb-lbl">Επισκέψεις</div>
        <div className="sparkline"><Sparkline data={c.sparkVisits} color="#C4874F" /></div>
      </div>

      <div className="stat-box">
        <div className="sb-val">{c.revenue}</div>
        <div className="sb-lbl">Συνολικά Έσοδα</div>
        <div className="sparkline"><Sparkline data={c.sparkRevenue} color="#5A8A6A" /></div>
      </div>

      <div className="stat-box">
        <div className="sb-val" style={{ color: lastVisitColor }}>
          {lastVisitDays !== null ? lastVisitDays : "—"}
        </div>
        <div className="sb-lbl">Μέρες από τελ. επίσκεψη</div>
        {lastVisitDays !== null && lastVisitDays > 30 ? (
          <div className="noshows-hint" style={{ color: lastVisitColor, marginTop: 2 }}>
            <i className="fas fa-phone" style={{ fontSize: 8 }} /> Καλέστε
          </div>
        ) : (
          <div className="noshows-hint">
            <i className="fas fa-check" style={{ fontSize: 8 }} /> Πρόσφατη
          </div>
        )}
      </div>

      <div className="stat-box">
        <div className={`sb-val ${noShowClass}`}>{c.noShows}</div>
        <div className="sb-lbl">No-Shows</div>
        {c.noShows === 0 && (
          <div className="noshows-hint">
            <i className="fas fa-check" style={{ fontSize: 8 }} /> Άριστο
          </div>
        )}
      </div>
    </div>
  );
}
