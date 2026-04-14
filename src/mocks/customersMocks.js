/* ═══════════════════════════════════════
   MOCK DATA  (replace with API calls)
═══════════════════════════════════════ */

export const INITIAL_CUSTOMERS = [
  {
    id: 1, initials: "ΜΚ", name: "Μαρία Κωνσταντίνου", phone: "691 234 5678", storeId: "store-1",
    email: "maria.k@glamournails.gr", isVip: true, photo: null,
    listTags: [], detailTags: [], warningTags: ["ΟΧΙ ΑΣΕΤΟΝ"],
    visits: 24, revenue: "845€", avgDays: 15, noShows: 0,
    since: "12 Μαρτίου 2023", status: "active",
    loyaltyTier: "Gold", loyaltyPoints: 280, loyaltyThreshold: 300,
    notes: "- Πίνει καφέ σκέτο.\n- Έχει ευαισθησία στα πετσάκια, θέλει πολύ απαλό κόψιμο.\n- Προτιμάει την Ελένη για πεντικιούρ.",
    sparkVisits: [18, 20, 19, 22, 21, 23, 24],
    sparkRevenue: [580, 640, 690, 720, 760, 800, 845],
    daysSinceLast: 2,
    history: [
      { date:"08", month:"Απρ", service:"Spa Πεντικιούρ", note:"Σήμερα", sub:"10:00 με Ελένη", status:"active", price:"25€" },
      { date:"12", month:"Μαρ", service:"Ημιμόνιμο Μανικιούρ", sub:"Χαρά", status:"done", price:"15€" },
      { date:"20", month:"Φεβ", service:"Spa Πεντικιούρ & Απλό Μανικιούρ", sub:"Ελένη", status:"done", price:"37€" },
    ],
    totalHistory: 24, filter: ["all", "vip"],
  },
  {
    id: 2, initials: "ΑΓ", name: "Άννα Γεωργίου", phone: "699 876 5432", storeId: "store-1",
    email: "anna.g@example.com", isVip: false, photo: null,
    listTags: [{ label:"ΑΛΛΕΡΓΙΑ", type:"red" }],
    detailTags: [{ label:"ΑΛΛΕΡΓΙΑ", type:"red" }],
    warningTags: ["ΑΛΛΕΡΓΙΑ ΣΕ ΑΚΡΥΛΙΚΑ"],
    visits: 8, revenue: "210€", avgDays: 22, noShows: 1,
    since: "5 Ιουνίου 2023", status: "active",
    loyaltyTier: "Silver", loyaltyPoints: 80, loyaltyThreshold: 150,
    notes: "- Αλλεργία σε ακρυλικά. Χρησιμοποιούμε μόνο gel.",
    sparkVisits: [4, 5, 5, 6, 6, 7, 8],
    sparkRevenue: [90, 110, 140, 160, 175, 195, 210],
    daysSinceLast: 9,
    history: [
      { date:"01", month:"Απρ", service:"Απλό Μανικιούρ", sub:"Χαρά", status:"done", price:"10€" },
      { date:"10", month:"Μαρ", service:"Spa Πεντικιούρ", sub:"Ελένη", status:"done", price:"25€" },
    ],
    totalHistory: 8, filter: ["all"],
  },
  {
    id: 3, initials: "ΣΚ", name: "Σοφία Καλαντζή", phone: "694 555 1122", storeId: "store-2",
    email: "", isVip: false, photo: null,
    listTags: [{ label:"ΕΓΚΥΟΣ", type:"yellow" }],
    detailTags: [{ label:"ΕΓΚΥΟΣ", type:"yellow" }],
    warningTags: ["ΕΓΚΥΟΣ 5ου ΜΗΝΑ — ΑΠΟΦΥΓΗ ΧΗΜΙΚΩΝ"],
    visits: 6, revenue: "155€", avgDays: 30, noShows: 0,
    since: "3 Σεπτεμβρίου 2023", status: "active",
    loyaltyTier: "Bronze", loyaltyPoints: 30, loyaltyThreshold: 100,
    notes: "- Έγκυος 5ου μήνα. Αποφύγετε ισχυρά χημικά.",
    sparkVisits: [2, 3, 3, 4, 4, 5, 6],
    sparkRevenue: [40, 60, 85, 100, 120, 140, 155],
    daysSinceLast: 26,
    history: [
      { date:"15", month:"Μαρ", service:"Spa Πεντικιούρ", sub:"Ελένη", status:"done", price:"25€" },
    ],
    totalHistory: 6, filter: ["all"],
  },
  {
    id: 4, initials: "ΓΠ", name: "Γιώργος Παπαδόπουλος", phone: "697 111 2233", storeId: "store-2",
    email: "", isVip: false, photo: null,
    listTags: [], detailTags: [], warningTags: [],
    visits: 3, revenue: "75€", avgDays: 45, noShows: 0,
    since: "20 Ιανουαρίου 2024", status: "active",
    loyaltyTier: null, loyaltyPoints: 15, loyaltyThreshold: 100,
    notes: "",
    sparkVisits: [1, 1, 2, 2, 2, 3, 3],
    sparkRevenue: [15, 30, 40, 50, 60, 65, 75],
    daysSinceLast: 36,
    history: [
      { date:"05", month:"Μαρ", service:"Απλό Μανικιούρ", sub:"Χαρά", status:"done", price:"10€" },
    ],
    totalHistory: 3, filter: ["all"],
  },
  {
    id: 5, initials: "ΚΛ", name: "Κατερίνα Λέκκα", phone: "693 444 5566", storeId: "store-2",
    email: "", isVip: false, photo: null,
    listTags: [], detailTags: [], warningTags: [],
    visits: 1, revenue: "25€", avgDays: null, noShows: 0,
    since: "1 Απριλίου 2024", status: "new",
    loyaltyTier: null, loyaltyPoints: 5, loyaltyThreshold: 100,
    notes: "",
    sparkVisits: [0, 0, 0, 0, 0, 0, 1],
    sparkRevenue: [0, 0, 0, 0, 0, 0, 25],
    daysSinceLast: 9,
    history: [
      { date:"01", month:"Απρ", service:"Spa Πεντικιούρ", sub:"Ελένη", status:"done", price:"25€" },
    ],
    totalHistory: 1, filter: ["all", "new"],
  },
];

export const FILTERS = [
  { id: "all",  label: "Όλοι (247)" },
  { id: "vip",  label: "VIP (42)",   icon: "fa-star", iconColor: "var(--c-accent)" },
  { id: "debt", label: "Χρέος (3)",  color: "var(--s-urgent)" },
];
