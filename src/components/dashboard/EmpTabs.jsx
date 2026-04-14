import { MOCK_EMPLOYEES } from "../../mocks/dashboardMocks";

export default function EmpTabs({ activeId, onSelect }) {
  return (
    <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap" }} role="tablist" aria-label="Φιλτράρισμα υπαλλήλων">
      {[{ id:"all", name:"Όλοι" }, ...MOCK_EMPLOYEES].map((e) => {
        const active = activeId === e.id;
        return (
          <button
            key={e.id}
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(e.id)}
            style={{
              display:"flex", alignItems:"center", gap:6,
              padding:"5px 12px", borderRadius:99,
              border:`1.5px solid ${active ? "var(--c-dark)" : "var(--c-light)"}`,
              background: active ? "var(--c-dark)" : "transparent",
              cursor:"pointer", fontFamily:"inherit", fontSize:11, fontWeight:700,
              color: active ? "var(--c-bg)" : "var(--c-mid)",
              transition:"all .2s", outline:"none", whiteSpace:"nowrap",
            }}
          >
            {e.initials && (
              <span style={{
                width:20, height:20, borderRadius:6,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:9, fontWeight:900, fontFamily:"'Cormorant Garamond', serif",
                background: e.color || "transparent",
                color: e.textColor || "inherit",
                border: active ? "1.5px solid rgba(255,255,255,0.3)" : "none",
                flexShrink:0,
              }}>
                {e.initials}
              </span>
            )}
            {e.name}
          </button>
        );
      })}
    </div>
  );
}
