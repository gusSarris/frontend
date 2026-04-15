/* ═══════════════════════════════════════
   ADMIN MOCK DATA (Platform Admin)
   ─────────────────────────────────────────
   GET /api/admin/tenants           Super Admin
   GET /api/admin/users             Super Admin  
   GET /api/admin/activities        Super Admin
   GET /api/admin/stats             Super Admin
═══════════════════════════════════════ */

// Mock tenants data
export const MOCK_TENANTS = [
  { 
    id: 1, 
    name: 'Glamour Nails', 
    slug: 'glamour-nails', 
    status: 'active', 
    createdAt: '2025-02-10', 
    users: 12,
    plan: 'premium',
    monthlyRevenue: 850,
    lastActive: '2025-03-15'
  },
  { 
    id: 2, 
    name: 'Beauty Spot', 
    slug: 'beauty-spot', 
    status: 'active', 
    createdAt: '2025-01-15', 
    users: 8,
    plan: 'standard',
    monthlyRevenue: 420,
    lastActive: '2025-03-14'
  },
  { 
    id: 3, 
    name: 'Zen Massage', 
    slug: 'zen-massage', 
    status: 'pending', 
    createdAt: '2026-04-01', 
    users: 2,
    plan: 'trial',
    monthlyRevenue: 0,
    lastActive: '2026-03-28'
  },
  { 
    id: 4, 
    name: 'Hair Studio', 
    slug: 'hair-studio', 
    status: 'suspended', 
    createdAt: '2024-11-20', 
    users: 5,
    plan: 'standard',
    monthlyRevenue: 320,
    lastActive: '2025-02-28'
  },
  { 
    id: 5, 
    name: 'Nail Art Athens', 
    slug: 'nail-art-athens', 
    status: 'active', 
    createdAt: '2025-06-05', 
    users: 15,
    plan: 'premium',
    monthlyRevenue: 1200,
    lastActive: '2025-03-15'
  },
  { 
    id: 6, 
    name: 'Spa Retreat', 
    slug: 'spa-retreat', 
    status: 'pending', 
    createdAt: '2026-03-28', 
    users: 1,
    plan: 'trial',
    monthlyRevenue: 0,
    lastActive: '2026-03-28'
  },
  { 
    id: 7, 
    name: 'Barber Club', 
    slug: 'barber-club', 
    status: 'active', 
    createdAt: '2025-09-12', 
    users: 6,
    plan: 'standard',
    monthlyRevenue: 380,
    lastActive: '2025-03-14'
  },
  { 
    id: 8, 
    name: 'Wellness Center', 
    slug: 'wellness-center', 
    status: 'active', 
    createdAt: '2025-03-01', 
    users: 10,
    plan: 'premium',
    monthlyRevenue: 950,
    lastActive: '2025-03-15'
  },
];

// Mock activity data
export const MOCK_ACTIVITIES = [
  { 
    id: 1, 
    icon: 'fa-plus-circle', 
    text: '<b>Glamour Nails</b> δημιουργήθηκε', 
    time: '5 λεπτά',
    type: 'tenant_created',
    tenantId: 1
  },
  { 
    id: 2, 
    icon: 'fa-check-circle', 
    text: '<b>Beauty Spot</b> ενεργοποιήθηκε', 
    time: '1 ώρα',
    type: 'tenant_activated',
    tenantId: 2
  },
  { 
    id: 3, 
    icon: 'fa-pause-circle', 
    text: '<b>Hair Studio</b> ανεστάλη', 
    time: '3 ώρες',
    type: 'tenant_suspended',
    tenantId: 4
  },
  { 
    id: 4, 
    icon: 'fa-user-plus', 
    text: 'Νέος Sales χρήστης <b>marketing@</b>', 
    time: 'Χθες',
    type: 'user_created',
    userId: 'sales-1'
  },
  { 
    id: 5, 
    icon: 'fa-euro-sign', 
    text: 'Πληρωμή από <b>Nail Art Athens</b>', 
    time: '2 ημέρες',
    type: 'payment_received',
    tenantId: 5,
    amount: 1200
  },
  { 
    id: 6, 
    icon: 'fa-cog', 
    text: 'Ενημέρωση πλατφόρμας v2.1.0', 
    time: '1 εβδομάδα',
    type: 'system_update'
  },
];

// KPI data
export const KPI_DATA = [
  { 
    icon: 'fa-building', 
    iconClass: 'kpi-icon-accent', 
    value: '24', 
    label: 'Σύνολο Tenants',
    trend: '+3',
    description: 'Συνολικοί tenants πλατφόρμας'
  },
  { 
    icon: 'fa-check-circle', 
    iconClass: 'kpi-icon-done', 
    value: '18', 
    label: 'Ενεργοί',
    trend: '+2',
    description: 'Tenants με ενεργή συνδρομή'
  },
  { 
    icon: 'fa-hourglass-half', 
    iconClass: 'kpi-icon-dark', 
    value: '4', 
    label: 'Pending',
    trend: '-1',
    description: 'Tenants σε δοκιμαστική περίοδο'
  },
  { 
    icon: 'fa-euro-sign', 
    iconClass: 'kpi-icon-next', 
    value: '€12.8k', 
    label: 'Μηνιαία έσοδα',
    trend: '+8%',
    description: 'Μηνιαία έσοδα από συνδρομές'
  },
];

// Platform users (admin users)
export const MOCK_ADMIN_USERS = [
  {
    id: 1,
    name: 'Ελένη Παππά',
    email: 'elena@connect-saas.gr',
    role: 'SUPER_ADMIN',
    lastLogin: '2025-03-15 14:30',
    status: 'active'
  },
  {
    id: 2,
    name: 'Μαρία Αντωνίου',
    email: 'maria@connect-saas.gr',
    role: 'SUPPORT',
    lastLogin: '2025-03-14 11:20',
    status: 'active'
  },
  {
    id: 3,
    name: 'Γιώργος Δημητρίου',
    email: 'george@connect-saas.gr',
    role: 'SALES',
    lastLogin: '2025-03-13 09:45',
    status: 'active'
  },
  {
    id: 4,
    name: 'Ανδρέας Νικολάου',
    email: 'andreas@connect-saas.gr',
    role: 'SUPPORT',
    lastLogin: '2025-03-10 16:15',
    status: 'inactive'
  },
];

// Platform plans
export const PLATFORM_PLANS = [
  {
    id: 'trial',
    name: 'Δοκιμαστική',
    price: 0,
    duration: '14 ημέρες',
    features: ['Μέχρι 3 χρήστες', 'Βασικές λειτουργίες', 'Email support'],
    tenantCount: 4
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 49,
    duration: 'μηνιαία',
    features: ['Μέχρι 10 χρήστες', 'Όλες οι λειτουργίες', 'Priority support', 'Βασικές αναφορές'],
    tenantCount: 12
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99,
    duration: 'μηνιαία',
    features: ['Απεριόριστοι χρήστες', 'Όλες οι λειτουργίες', '24/7 support', 'Προχωρημένες αναφορές', 'Custom integrations'],
    tenantCount: 8
  },
];

// Quick actions
export const QUICK_ACTIONS = [
  {
    id: 'new-tenant',
    icon: 'fa-plus',
    label: 'Νέος Tenant',
    description: 'Δημιουργία νέου tenant',
    action: 'showNewTenantForm'
  },
  {
    id: 'invite-user',
    icon: 'fa-user-plus',
    label: 'Πρόσκληση Sales/Support',
    description: 'Πρόσκληση νέου χρήστη πλατφόρμας',
    action: 'showInviteUserForm'
  },
  {
    id: 'platform-settings',
    icon: 'fa-cog',
    label: 'Ρυθμίσεις πλατφόρμας',
    description: 'Ρυθμίσεις συστήματος και τιμολόγησης',
    action: 'navigateToSettings'
  },
  {
    id: 'system-backup',
    icon: 'fa-database',
    label: 'Backup Συστήματος',
    description: 'Δημιουργία backup βάσης δεδομένων',
    action: 'createSystemBackup'
  },
];

// Helper functions
export const getStatusBadgeInfo = (status) => {
  switch (status) {
    case 'active':
      return {
        class: 'status-active',
        icon: 'fa-check',
        text: 'ΕΝΕΡΓΟ',
        color: 'var(--s-done)',
        bgColor: 'rgba(90,138,106,0.12)'
      };
    case 'pending':
      return {
        class: 'status-pending',
        icon: 'fa-clock',
        text: 'PENDING',
        color: 'var(--c-accent)',
        bgColor: 'rgba(196,135,79,0.12)'
      };
    case 'suspended':
      return {
        class: 'status-suspended',
        icon: 'fa-pause',
        text: 'ΑΝΕΣΤΑΛΜΕΝΟ',
        color: 'var(--s-urgent)',
        bgColor: 'rgba(184,84,80,0.12)'
      };
    default:
      return {
        class: 'status-pending',
        icon: 'fa-question',
        text: status.toUpperCase(),
        color: 'var(--c-mid)',
        bgColor: 'rgba(107,63,58,0.12)'
      };
  }
};

export const getFilterLabel = (filter) => {
  switch (filter) {
    case 'all': return 'Όλοι';
    case 'pending': return 'Pending';
    case 'active': return 'Active';
    case 'suspended': return 'Suspended';
    default: return filter;
  }
};

// Calculate total monthly revenue
export const calculateMonthlyRevenue = () => {
  return MOCK_TENANTS.reduce((total, tenant) => {
    if (tenant.status === 'active') {
      return total + (tenant.monthlyRevenue || 0);
    }
    return total;
  }, 0);
};

// Get tenant statistics
export const getTenantStats = () => {
  const total = MOCK_TENANTS.length;
  const active = MOCK_TENANTS.filter(t => t.status === 'active').length;
  const pending = MOCK_TENANTS.filter(t => t.status === 'pending').length;
  const suspended = MOCK_TENANTS.filter(t => t.status === 'suspended').length;
  const revenue = calculateMonthlyRevenue();
  
  return { total, active, pending, suspended, revenue };
};