import { MOCK_EMPLOYEES } from "../../mocks/dashboardMocks";

export default function ApptSlot({ appt, empIdx, onStatusChange, onDragStart, onDragOver, onDragLeave, onDrop, onOpenModal, isDragging, isDragOver }) {
  const emp = MOCK_EMPLOYEES[empIdx];

  const slotBorderColor = appt.status === "COMPLETED" ? "var(--s-done)" : appt.status === "CANCELED" ? "var(--s-urgent)" : "var(--s-active)";
  const slotBg = appt.status === "COMPLETED" ? "rgba(90,138,106,0.05)" : appt.status === "CANCELED" ? "rgba(184,84,80,0.05)" : "rgba(196,135,79,0.05)";

  return (
    <div
      draggable
      onClick={() => onOpenModal(appt)}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{
        borderRadius:"var(--r-sm)", padding:"10px 14px",
        display:"flex", flexDirection:"column", justifyContent:"flex-start",
        gap:6, cursor:"grab",
        background: isDragOver ? "rgba(196,135,79,0.12)" : slotBg,
        border: isDragOver ? "2px dashed var(--c-accent)" : `1px solid rgba(196,135,79,0.2)`,
        borderLeft: `4px solid ${slotBorderColor}`,
        opacity: isDragging ? .4 : (appt.status === "CANCELED" ? .7 : 1),
        transform: isDragging ? "scale(0.98)" : "none",
        transition:".2s",
      }}
    >
      {emp && (
        <span style={{
          display:"none", alignItems:"center", gap:4,
          background:`${emp.color}`, color:emp.textColor,
          padding:"3px 8px", borderRadius:4, fontSize:10, fontWeight:700, marginBottom:4,
        }} className="mobile-emp-label">
          <span style={{ width:16, height:16, borderRadius:4, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:900, fontFamily:"'Cormorant Garamond', serif", background:emp.color, color:emp.textColor }}>
            {emp.initials}
          </span>
          {emp.name}
        </span>
      )}

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", width:"100%" }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:700, color:"var(--c-dark)", display:"flex", alignItems:"center", gap:5, flexWrap:"wrap", textDecoration: appt.status === "CANCELED" ? "line-through" : "none" }}>
            {appt.customer}
            {appt.vip && <i className="fas fa-star" style={{ color:"#D4AF37", fontSize:11 }} />}
          </div>
          <div style={{ fontSize:10.5, color:"var(--c-primary)", opacity:.85, marginTop:2, display:"flex", alignItems:"center" }}>
            {emp && (
              <span style={{ display:"inline-flex", alignItems:"center", background:`${emp.color}`, color:"var(--c-dark)", padding:"2px 6px", borderRadius:4, fontWeight:700, fontSize:9, marginRight:6, letterSpacing:".05em" }}>
                {emp.name}
              </span>
            )}
            {appt.service}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
          {appt.paid && <i className="fas fa-euro-sign" style={{ fontSize:10, color:"var(--s-done)" }} title="Πληρωμένο" />}
          <button
            onClick={(e) => e.stopPropagation()}
            style={{ background:"transparent", border:"none", color:"var(--c-mid)", opacity:.5, cursor:"pointer", padding:"2px 6px", borderRadius:4, transition:".2s", outline:"none" }}
          >
            <i className="fas fa-ellipsis-v" />
          </button>
        </div>
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginTop:4 }}>
        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
          {appt.tags?.map((tag, ti) => (
            <span key={ti} className={`tag ${tag.cls}`} style={{ fontSize:9, fontWeight:700, padding:"3px 6px", borderRadius:4, letterSpacing:".05em", display:"inline-flex", alignItems:"center", gap:4 }}>
              {tag.icon && <i className={`fas ${tag.icon}`} />}
              {tag.text}
            </span>
          ))}
        </div>
        <div style={{ position:"relative", display:"inline-flex", alignItems:"center" }} onClick={(e) => e.stopPropagation()}>
          <select
            value={appt.status}
            onChange={(e) => onStatusChange(appt.id, e.target.value)}
            style={{
              appearance:"none", background:"transparent",
              border:"1px solid var(--c-muted)", borderRadius:6,
              fontFamily:"inherit", fontSize:9, fontWeight:700,
              padding:"2px 18px 2px 6px", cursor:"pointer", outline:"none",
              color: appt.status === "SCHEDULED" ? "var(--s-active)" : appt.status === "COMPLETED" ? "var(--s-done)" : "var(--s-urgent)",
              transition:".2s",
            }}
          >
            <option value="SCHEDULED">ΠΡΟΓΡΑΜΜΑΤΙΣΜΕΝΟ</option>
            <option value="COMPLETED">ΟΛΟΚΛΗΡΩΘΗΚΕ</option>
            <option value="CANCELED">ΑΚΥΡΩΘΗΚΕ</option>
          </select>
          <i className="fas fa-caret-down" style={{ position:"absolute", right:6, fontSize:8, pointerEvents:"none", color:"var(--c-mid)" }} />
        </div>
      </div>
    </div>
  );
}
