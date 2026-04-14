import ApptSlot from "./ApptSlot";
import { TIME_ROWS, EMPLOYEES_DISPLAY } from "../../mocks/dashboardMocks";

export default function TimelineGrid({
  loadingDate,
  getApptAt,
  handleStatusChange,
  setModalTime,
  setModalOpen,
  draggingId,
  setDraggingId,
  dragOverKey,
  setDragOverKey,
  handleDrop,
}) {
  return (
    <div style={{ padding:"16px 24px", overflowX:"auto" }}>
      <div style={{ minWidth:500, position:"relative" }}>

        <div className="timeline-header-row" style={{ display:"grid", gridTemplateColumns:"55px 1fr 1fr", gap:16, paddingBottom:12, borderBottom:"2px solid var(--c-muted)", marginBottom:8 }}>
          <div />
          {EMPLOYEES_DISPLAY.map((emp) => (
            <div key={emp.id} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontSize:13, fontWeight:700, color:"var(--c-dark)" }}>
              <div style={{ width:28, height:28, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontFamily:"'Cormorant Garamond', serif", fontWeight:700, flexShrink:0, background:emp.color, color:emp.textColor }}>
                {emp.initials}
              </div>
              {emp.name} · {emp.specialty}
            </div>
          ))}
        </div>

        {TIME_ROWS.map((time, rowIdx) => (
          <div
            key={time}
            className="timeline-row-grid"
            style={{ display:"grid", gridTemplateColumns:"55px 1fr 1fr", gap:16, minHeight:64, borderBottom: rowIdx < TIME_ROWS.length - 1 ? "1px solid var(--c-muted)" : "none", alignItems:"stretch", padding:"4px 0", animation:`fadeUp .4s ease ${rowIdx * 50}ms both` }}
          >
            <div style={{ fontSize:12, fontWeight:700, color:"var(--c-primary)", opacity:.6, paddingTop:10, textAlign:"right", paddingRight:12, borderRight:"1px solid var(--c-muted)" }}>
              {time}
            </div>

            {EMPLOYEES_DISPLAY.map((emp, empIdx) => {
              const [h] = time.split(":");
              const slotKey = `${h}-${empIdx}`;
              const appt = getApptAt(time, empIdx);

              if (loadingDate) {
                return <div key={emp.id} className="sk" style={{ height:48, borderRadius:"var(--r-sm)" }} />;
              }

              if (appt) {
                return (
                  <ApptSlot
                    key={emp.id}
                    appt={appt}
                    empIdx={empIdx}
                    onStatusChange={handleStatusChange}
                    onOpenModal={() => { setModalTime(time); setModalOpen(true); }}
                    onDragStart={() => setDraggingId(appt.id)}
                    onDragOver={(e) => { e.preventDefault(); }}
                    onDragLeave={() => setDragOverKey(null)}
                    onDrop={(e) => { e.preventDefault(); }}
                    isDragging={draggingId === appt.id}
                    isDragOver={dragOverKey === slotKey}
                  />
                );
              }

              return (
                <div
                  key={emp.id}
                  onClick={() => { setModalTime(time); setModalOpen(true); }}
                  onDragOver={(e) => { e.preventDefault(); setDragOverKey(slotKey); }}
                  onDragLeave={() => setDragOverKey(null)}
                  onDrop={(e) => { e.preventDefault(); handleDrop(slotKey); }}
                  style={{
                    borderRadius:"var(--r-sm)", display:"flex",
                    alignItems:"center", justifyContent:"center",
                    border:"1.5px dashed rgba(196,135,79,0.15)",
                    color:"var(--c-accent)", cursor:"pointer", fontSize:14,
                    opacity: dragOverKey === slotKey ? 1 : 0,
                    transition:"opacity .2s, background .2s, border-color .2s",
                    background: dragOverKey === slotKey ? "rgba(196,135,79,0.12)" : "transparent",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.background = "rgba(196,135,79,0.05)"; e.currentTarget.style.borderColor = "rgba(196,135,79,0.4)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = dragOverKey === slotKey ? "1" : "0"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(196,135,79,0.15)"; }}
                >
                  <i className="fas fa-plus" style={{ fontSize:11 }} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
