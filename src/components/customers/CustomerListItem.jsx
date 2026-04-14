export default function CustomerListItem({ customer: c, isActive, onSelect }) {
  const visitsText = c.visits === 1 ? "1 επίσκεψη" : `${c.visits} επισκέψεις`;

  return (
    <div
      className={`c-item${isActive ? " active" : ""}`}
      onClick={() => onSelect(c.id)}
      role="listitem"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onSelect(c.id); }}
      aria-label={c.name}
      data-id={c.id}
    >
      <div className="c-av">
        {c.photo ? <img src={c.photo} alt={c.name} /> : c.initials}
      </div>
      <div className="c-info">
        <div className="c-name">
          {c.name}
          {c.isVip && <i className="fas fa-star icon-vip" />}
          {c.listTags.map((t, i) => (
            <span key={i} className={`tag tag-${t.type}`} style={{ fontSize: 8, padding: "2px 4px" }}>
              {t.label}
            </span>
          ))}
        </div>
        <div className="c-phone">{c.phone}</div>
      </div>
      <div className="c-meta">
        <div className="c-visits">{visitsText}</div>
      </div>
    </div>
  );
}
