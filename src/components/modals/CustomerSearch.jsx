import { useEffect, useRef, useState } from "react";

/**
 * CustomerSearch — typeahead dropdown για επιλογή πελάτη
 *
 * Props:
 *   customers:  Array<{ id, name, mobile, points, vip?, lastService?, lastDaysAgo? }>
 *   onSelect:   (customer|null) => void    // null = νέος πελάτης
 *   placeholder?: string
 *
 * API integration (replace static `customers` prop with fetch):
 *   GET /api/customers?mobile={query}      // Employee+
 */
export default function CustomerSearch({
  customers = [],
  onSelect,
  placeholder = "Αναζήτηση με όνομα ή τηλέφωνο...",
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(-1);
  const wrapRef = useRef(null);

  const results = query.trim()
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          (c.mobile || "").includes(query)
      )
    : customers;

  const pick = (c) => {
    setQuery(c ? c.name : "");
    setOpen(false);
    onSelect?.(c);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, results.length));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, -1));
    }
    if (e.key === "Enter" && idx >= 0) {
      e.preventDefault();
      pick(idx < results.length ? results[idx] : null);
    }
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setIdx(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          style={{
            width: "100%",
            height: 42,
            background: "var(--c-bg)",
            border: "1.5px solid var(--c-light)",
            borderRadius: "var(--r-sm)",
            padding: "0 36px 0 14px",
            fontFamily: "inherit",
            fontSize: 13,
            color: "var(--c-dark)",
            transition: "all .2s",
            outline: "none",
          }}
        />
        <i
          className="fas fa-search"
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 12,
            color: "var(--c-primary)",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
      </div>

      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: 4,
            background: "var(--c-surface)",
            border: "1.5px solid var(--c-light)",
            borderRadius: "var(--r-md)",
            boxShadow: "0 12px 32px rgba(46,26,24,0.15)",
            maxHeight: 220,
            overflowY: "auto",
            zIndex: 110,
            animation: "fadeUp .15s ease",
          }}
        >
          {results.map((c, i) => {
            const initials = c.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2);
            return (
              <div
                key={c.id}
                role="option"
                aria-selected={i === idx}
                onClick={() => pick(c)}
                onMouseEnter={() => setIdx(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  cursor: "pointer",
                  borderBottom: "1px solid var(--c-muted)",
                  background: i === idx ? "rgba(196,135,79,0.08)" : "transparent",
                  transition: "background .15s",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 900,
                    fontFamily: "'Cormorant Garamond', serif",
                    flexShrink: 0,
                    background: c.vip ? "rgba(212,175,55,0.15)" : "rgba(196,135,79,0.1)",
                    color: c.vip ? "#D4AF37" : "var(--c-accent)",
                  }}
                >
                  {initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--c-dark)" }}>
                    {c.name}{" "}
                    {c.vip && (
                      <i
                        className="fas fa-star"
                        style={{ color: "#D4AF37", fontSize: 11 }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--c-primary)",
                      opacity: 0.7,
                      marginTop: 1,
                    }}
                  >
                    {c.mobile}
                  </div>
                </div>
                {c.points > 0 && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "var(--s-done)",
                      background: "rgba(90,138,106,0.1)",
                      padding: "2px 6px",
                      borderRadius: 4,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.points} pts
                  </span>
                )}
              </div>
            );
          })}

          <div
            onClick={() => pick(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              cursor: "pointer",
              transition: "background .15s",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                background: "rgba(90,138,106,0.1)",
                color: "var(--s-done)",
                flexShrink: 0,
              }}
            >
              <i className="fas fa-plus" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--s-done)" }}>
                + Νέος Πελάτης
              </div>
              <div style={{ fontSize: 11, color: "var(--c-primary)", opacity: 0.7 }}>
                Δημιουργία νέου πελάτη
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
