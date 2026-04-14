import { useEffect, useMemo, useRef, useState } from "react";

export default function CommandPalette({ open, onClose, customers, quickActions, onSelectCustomer }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const { matchedCustomers, matchedActions, allItems } = useMemo(() => {
    const q = query.toLowerCase().trim();
    const mc = customers
      .filter((c) => c.name.toLowerCase().includes(q) || c.phone.includes(q))
      .slice(0, 5);
    const ma = q
      ? quickActions.filter((a) => a.label.toLowerCase().includes(q))
      : quickActions;
    const items = [
      ...mc.map((c) => ({ kind: "customer", data: c })),
      ...ma.map((a) => ({ kind: "action", data: a })),
    ];
    return { matchedCustomers: mc, matchedActions: ma, allItems: items };
  }, [query, customers, quickActions]);

  /* Reset + focus on open */
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setSelectedIndex(0);
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  /* Keep selection in bounds as results shrink */
  useEffect(() => {
    if (selectedIndex >= allItems.length) setSelectedIndex(Math.max(0, allItems.length - 1));
  }, [allItems.length, selectedIndex]);

  if (!open) return null;

  const runItem = (item) => {
    if (!item) return;
    if (item.kind === "customer") {
      onSelectCustomer(item.data.id);
    } else {
      item.data.action();
    }
    onClose();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, allItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runItem(allItems[selectedIndex]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const kbdStyle = {
    background: "var(--c-muted)",
    padding: "1px 4px",
    borderRadius: 3,
    fontSize: 9,
  };

  let globalIdx = 0;

  return (
    <div className="cmd-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cmd-palette" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-search-wrap">
          <i className="fas fa-search cmd-search-icon" />
          <input
            ref={inputRef}
            className="cmd-input"
            placeholder="Αναζήτηση πελάτη ή ενέργεια..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
          />
          <span className="cmd-esc">ESC</span>
        </div>

        <div style={{ maxHeight: 340, overflowY: "auto" }}>
          {allItems.length === 0 && (
            <div style={{
              padding: 24, textAlign: "center",
              color: "var(--c-primary)", opacity: 0.5, fontSize: 13,
            }}>
              Δεν βρέθηκαν αποτελέσματα
            </div>
          )}

          {matchedCustomers.length > 0 && (
            <>
              <div className="cmd-section-lbl">Πελάτες</div>
              {matchedCustomers.map((c) => {
                const idx = globalIdx++;
                return (
                  <div
                    key={`c-${c.id}`}
                    className={`cmd-item${idx === selectedIndex ? " selected" : ""}`}
                    onClick={() => runItem({ kind: "customer", data: c })}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className="cmd-item-av">
                      {c.photo
                        ? <img src={c.photo} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : c.initials}
                    </div>
                    <div>
                      <div className="cmd-item-name">{c.name}</div>
                      <div className="cmd-item-sub">{c.phone} · {c.visits} επισκέψεις</div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {matchedActions.length > 0 && (
            <>
              <div className="cmd-section-lbl">Ενέργειες</div>
              {matchedActions.map((a, i) => {
                const idx = globalIdx++;
                return (
                  <div
                    key={`a-${i}`}
                    className={`cmd-item${idx === selectedIndex ? " selected" : ""}`}
                    onClick={() => runItem({ kind: "action", data: a })}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className="cmd-item-icon"><i className={`fas ${a.icon}`} /></div>
                    <div>
                      <div className="cmd-item-name">{a.label}</div>
                      <div className="cmd-item-sub">{a.sub}</div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        <div className="cmd-footer">
          <span className="cmd-hint"><kbd style={kbdStyle}>↑↓</kbd> πλοήγηση</span>
          <span className="cmd-hint"><kbd style={kbdStyle}>↵</kbd> επιλογή</span>
          <span className="cmd-hint"><kbd style={kbdStyle}>ESC</kbd> κλείσιμο</span>
        </div>
      </div>
    </div>
  );
}
