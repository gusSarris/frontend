// servicesMocks.js
export const CATEGORIES = [
  { id: 'manicure',  name: 'Μανικιούρ',      icon: '💅', color: 'rgba(196,135,79,0.12)',  text: 'var(--c-accent)' },
  { id: 'pedicure',  name: 'Πεντικιούρ',     icon: '🦶', color: 'rgba(74,127,165,0.12)', text: 'var(--s-next)' },
  { id: 'nails',     name: 'Τεχνητά Νύχια',  icon: '💎', color: 'rgba(90,138,106,0.12)', text: 'var(--s-done)' },
  { id: 'spa',       name: 'Spa & Θεραπείες', icon: '🌿', color: 'rgba(157,106,101,0.12)', text: 'var(--c-primary)' },
];

export const INITIAL_SERVICES = [
  { id: 's1', name: 'Απλό Μανικιούρ',        category: 'manicure', description: 'Κλασικό μανικιούρ με σχηματισμό νυχιών και απλό βάψιμο.', price: '15.00', duration: 30, isActive: true },
  { id: 's2', name: 'Ημιμόνιμο Χρώμα',       category: 'manicure', description: 'Ημιμόνιμο βερνίκι gel, διάρκειας έως 3 εβδομάδων. Αποξήρανση σε UV.', price: '25.00', duration: 45, isActive: true },
  { id: 's3', name: 'Γαλλικό Μανικιούρ',     category: 'manicure', description: 'Κλασικό γαλλικό με λευκή άκρη και διαφανή βάση.', price: '20.00', duration: 40, isActive: true },
  { id: 's4', name: 'Απλό Πεντικιούρ',       category: 'pedicure', description: 'Φροντίδα νυχιών ποδιών, μπάνιο, φτιασίδωμα και απλό χρώμα.', price: '20.00', duration: 40, isActive: true },
  { id: 's5', name: 'Spa Πεντικιούρ',        category: 'pedicure', description: 'Premium πεντικιούρ με απολέπιση, μάσκα, μασάζ και gel χρώμα.', price: '35.00', duration: 60, isActive: true },
  { id: 's6', name: 'Ημιμόνιμο Ποδιών',      category: 'pedicure', description: 'Ημιμόνιμο βερνίκι για τα πόδια με μεγάλη διάρκεια.', price: '28.00', duration: 50, isActive: true },
  { id: 's7', name: 'Τεχνητά Νύχια Gel',     category: 'nails',    description: 'Κατασκευή τεχνητών νυχιών με gel builder. Περιλαμβάνει σχηματισμό και χρώμα.', price: '55.00', duration: 90, isActive: true },
  { id: 's8', name: 'Ακρυλικά Νύχια',        category: 'nails',    description: 'Επαγγελματική κατασκευή ακρυλικών, ιδανικά για επιμήκυνση.', price: '60.00', duration: 90, isActive: true },
  { id: 's9', name: 'Infill Gel (γέμισμα)',  category: 'nails',    description: 'Επαναπλήρωση gel σε υπάρχοντα τεχνητά νύχια κάθε 3-4 εβδομάδες.', price: '35.00', duration: 60, isActive: true },
  { id: 's10', name: 'Αφαίρεση Τεχνητών',    category: 'nails',    description: 'Απαλή αφαίρεση τεχνητών νυχιών με εξειδικευμένα προϊόντα.', price: '15.00', duration: 30, isActive: false },
  { id: 's11', name: 'Μασάζ Χεριών',         category: 'spa',      description: 'Χαλαρωτικό μασάζ χεριών με ενυδατική κρέμα και αρωματικά έλαια.', price: '20.00', duration: 30, isActive: true },
  { id: 's12', name: 'Θεραπεία Παραφίνης',   category: 'spa',      description: 'Ενυδατική θεραπεία με ζεστή παραφίνη για χέρια και πόδια.', price: '18.00', duration: 25, isActive: false },
];
