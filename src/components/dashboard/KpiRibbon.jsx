import Sparkline from "./Sparkline";

export default function KpiRibbon({ appointments }) {
  const total = appointments.length;
  const done = appointments.filter(a => a.status === "COMPLETED").length;
  const revenue = appointments.filter(a => a.status !== "CANCELED").reduce((s, a) => s + (a.price || 0), 0);

  const kpis = [
    { icon:"fa-calendar-check", iconClass:"kpi-accent", val:`${total}`,    lbl:"Ραντεβού Σήμερα",  spark:[7,9,8,10,11,9,10],                  color:"#C4874F" },
    { icon:"fa-check-circle",   iconClass:"kpi-done",   val:`${done}`,     lbl:"Ολοκληρωμένα",     spark:[2,3,2,4,3,3,3],                      color:"#5A8A6A" },
    { icon:"fa-euro-sign",      iconClass:"kpi-dark",   val:`${revenue}€`, lbl:"Πρόβλεψη Εσόδων",  spark:[220,280,260,310,290,300,revenue],   color:"#2E1A18" },
  ];

  const bgColors  = { "kpi-accent":"rgba(196,135,79,0.12)", "kpi-done":"rgba(90,138,106,0.12)", "kpi-dark":"rgba(46,26,24,0.08)" };
  const txtColors = { "kpi-accent":"var(--c-accent)",       "kpi-done":"var(--s-done)",         "kpi-dark":"var(--c-dark)" };

  return (
    <div style={{
      display:"flex", alignItems:"stretch", background:"var(--c-surface)",
      border:"1.5px solid var(--c-light)", borderRadius:"var(--r-md)",
      marginBottom:24, overflow:"hidden", animation:"fadeUp .4s ease both",
    }}>
      {kpis.map((k, i) => (
        <div key={i} style={{
          display:"flex", alignItems:"center", gap:14,
          padding:"16px 24px", flex:1, position:"relative",
          borderLeft: i > 0 ? "1px solid var(--c-muted)" : "none",
        }}>
          <div style={{ width:40, height:40, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background:bgColors[k.iconClass], color:txtColors[k.iconClass] }}>
            <i className={`fas ${k.icon}`} style={{ fontSize:16 }} />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:22, fontWeight:900, color:"var(--c-dark)", lineHeight:1 }}>{k.val}</div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:".05em", textTransform:"uppercase", color:"var(--c-primary)", opacity:.7, marginTop:2 }}>{k.lbl}</div>
          </div>
          <Sparkline data={k.spark} color={k.color} />
        </div>
      ))}
    </div>
  );
}
