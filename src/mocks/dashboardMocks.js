/* ═══════════════════════════════════════
   MOCK DATA  (replace with API calls)
   ─────────────────────────────────────────
   GET /api/customers           Employee+
   GET /api/services            Employee+
   GET /api/users (employees)   Owner+
   GET /api/appointments        Employee+ (store-filtered)
═══════════════════════════════════════ */

export const MOCK_CUSTOMERS = [
  { id:"/api/customers/1", name:"Μαρία Κωνσταντίνου",  mobile:"6912345678", points:125, vip:true,  lastService:"Ημιμόνιμο Μανικιούρ", lastDaysAgo:21, storeId:"store-1" },
  { id:"/api/customers/2", name:"Γιώργος Παπαδόπουλος",mobile:"6998765432", points:80,  vip:false, storeId:"store-2" },
  { id:"/api/customers/3", name:"Άννα Γεωργίου",        mobile:"6944556677", points:30,  vip:false, storeId:"store-1" },
  { id:"/api/customers/4", name:"Κατερίνα Λιάπη",       mobile:"6933221100", points:45,  vip:false, storeId:"store-2" },
  { id:"/api/customers/5", name:"Σοφία Κωστοπούλου",    mobile:"6977889900", points:200, vip:true,  storeId:"store-1" },
  { id:"/api/customers/6", name:"Ιωάννα Μαρκοπούλου",  mobile:"6955443322", points:15,  vip:false, storeId:"store-2" },
  { id:"/api/customers/7", name:"Ελένη Τσιγαρίδα",      mobile:"6966778899", points:55,  vip:false, storeId:"store-2" },
  { id:"/api/customers/8", name:"Γεωργία Παππά",         mobile:"6988112233", points:310, vip:true,  storeId:"store-1" },
];

export const MOCK_EMPLOYEES = [
  { id:"emp-chara", name:"Χαρά", initials:"Χ", specialty:"Μανικιούρ", color:"rgba(196,135,79,0.15)",  textColor:"var(--c-accent)", storeId:"store-1" },
  { id:"emp-eleni", name:"Ελένη",initials:"Ε", specialty:"Πεντικιούρ",color:"rgba(74,127,165,0.15)",  textColor:"var(--s-next)",   storeId:"store-2" },
  { id:"emp-nikos", name:"Νίκος", initials:"Ν", specialty:"Nail Art",  color:"rgba(90,138,106,0.15)", textColor:"var(--s-done)",   storeId:"store-1" },
];

export const MOCK_SERVICES = [
  { id:"/api/services/1", name:"Ημιμόνιμο Μανικιούρ",   price:"15.00", duration:30, isActive:true },
  { id:"/api/services/2", name:"Spa Πεντικιούρ",          price:"25.00", duration:45, isActive:true },
  { id:"/api/services/3", name:"Τεχνητά Νύχια",           price:"40.00", duration:60, isActive:true },
  { id:"/api/services/4", name:"Ανδρικό Μανικιούρ",       price:"12.00", duration:30, isActive:true },
  { id:"/api/services/5", name:"Απλό Μανικιούρ",          price:"10.00", duration:20, isActive:true },
  { id:"/api/services/6", name:"Ημιμόνιμο Ποδιών",        price:"18.00", duration:30, isActive:true },
];

export const INITIAL_APPOINTMENTS = [
  { id:"appt-1", slotKey:"10-0", customer:"Άννα Γεωργίου",        service:"Ημιμόνιμο (30')",        empId:"emp-chara", status:"SCHEDULED", tags:[{cls:"tag-green",icon:"fa-sparkles",text:"ΝΕΑ ΠΕΛΑΤΙΣΣΑ"}], price:15, vip:false,  storeId:"store-1" },
  { id:"appt-2", slotKey:"10-1", customer:"Μαρία Κωνσταντίνου",   service:"Spa Πεντικιούρ (45')",   empId:"emp-eleni", status:"SCHEDULED", tags:[{cls:"tag-red",icon:"fa-triangle-exclamation",text:"ΟΧΙ ΑΣΕΤΟΝ"}], price:25, vip:true, paid:true, storeId:"store-2" },
  { id:"appt-3", slotKey:"11-0", customer:"Κατερίνα Λ.",           service:"Απλό Μανικιούρ (30')",   empId:"emp-eleni", status:"COMPLETED", tags:[], price:10, storeId:"store-2" },
  { id:"appt-4", slotKey:"11-1", customer:"Ιωάννα Μ.",             service:"Ημιμόνιμο Ποδιών (30')", empId:"emp-chara", status:"SCHEDULED", tags:[{cls:"tag-blue",icon:"fa-clock",text:"ΒΙΑΣΤΙΚΗ"}], price:18, storeId:"store-1" },
  { id:"appt-5", slotKey:"12-0", customer:"Γεωργία Παππά",         service:"Τεχνητά Νύχια (60')",    empId:"emp-chara", status:"SCHEDULED", tags:[{cls:"tag-red",icon:"fa-notes-medical",text:"ΑΛΛΕΡΓΙΑ UV"}], price:40, vip:true, storeId:"store-1" },
  { id:"appt-6", slotKey:"13-0", customer:"Γιώργος Παπαδόπουλος", service:"Ανδρικό Μανικιούρ (30')",empId:"emp-chara", status:"COMPLETED", tags:[], price:12, paid:true, storeId:"store-1" },
  { id:"appt-7", slotKey:"13-1", customer:"Σοφία Κ.",              service:"Spa Πεντικιούρ (45')",   empId:"emp-eleni", status:"SCHEDULED", tags:[{cls:"tag-yellow",icon:"fa-baby",text:"ΕΓΚΥΟΣ"}], price:25, vip:true, storeId:"store-2" },
  { id:"appt-8", slotKey:"14-0", customer:"Ελένη Τ.",              service:"Ημιμόνιμο (30')",        empId:"emp-eleni", status:"SCHEDULED", tags:[{cls:"tag-green",text:"ΝΕΑ"},{cls:"tag-red",text:"ΟΧΙ ΑΣΕΤΟΝ"}], price:15, storeId:"store-2" },
];

export const TIME_ROWS = ["10:00","11:00","12:00","13:00","14:00"];
export const EMPLOYEES_DISPLAY = MOCK_EMPLOYEES.slice(0, 2); // Χαρά & Ελένη

export const WAITLIST = [
  { name:"Άννα Γεωργίου",  detail:"Οποιαδήποτε ώρα μετά τις 15:00" },
  { name:"Κατερίνα Λ.",    detail:"Πρωί (10:00–12:00) · Spa Πεντικιούρ" },
];
