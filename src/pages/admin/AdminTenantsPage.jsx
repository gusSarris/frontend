// AdminTenantsPage.jsx - Πλήρης σελίδα διαχείρισης Tenants
import { useState, useContext, useCallback, useEffect, useMemo } from "react";
import { ToastContext } from "../../layouts/AdminLayout";
import styles from "./styles/AdminTenantsPage.module.css";

// Import mock data
import {
  MOCK_TENANTS,
  MOCK_ADMIN_USERS,
  PLATFORM_PLANS,
  getStatusBadgeInfo,
  getTenantStats,
  calculateMonthlyRevenue
} from "../../mocks/adminMocks";

// Stats icons configuration
const STATS_CONFIG = [
  { 
    icon: 'fa-building', 
    iconClass: styles.statIcon,
    iconStyle: { background: 'rgba(196,135,79,0.12)', color: 'var(--c-accent)' },
    label: 'Σύνολο Tenants',
    trend: '+3 από τον προηγούμενο μήνα'
  },
  { 
    icon: 'fa-check-circle', 
    iconClass: styles.statIcon,
    iconStyle: { background: 'rgba(90,138,106,0.12)', color: 'var(--s-done)' },
    label: 'Ενεργοί',
    trend: '+2 από τον προηγούμενο μήνα'
  },
  { 
    icon: 'fa-hourglass-half', 
    iconClass: styles.statIcon,
    iconStyle: { background: 'rgba(46,26,24,0.08)', color: 'var(--c-dark)' },
    label: 'Pending',
    trend: '-1 από τον προηγούμενο μήνα'
  },
  { 
    icon: 'fa-euro-sign', 
    iconClass: styles.statIcon,
    iconStyle: { background: 'rgba(74,127,165,0.12)', color: 'var(--s-next)' },
    label: 'Μηνιαία έσοδα',
    trend: '+8% από τον προηγούμενο μήνα'
  },
];

// Status filter options
const STATUS_FILTERS = [
  { value: 'all', label: 'Όλες οι καταστάσεις' },
  { value: 'active', label: 'Ενεργοί' },
  { value: 'pending', label: 'Pending' },
  { value: 'suspended', label: 'Ανεσταλμένοι' },
];

// Plan filter options
const PLAN_FILTERS = [
  { value: 'all', label: 'Όλα τα πλάνα' },
  { value: 'trial', label: 'Δοκιμαστική' },
  { value: 'standard', label: 'Standard' },
  { value: 'premium', label: 'Premium' },
];

// Sort options
const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Όνομα (Α-Ω)' },
  { value: 'name-desc', label: 'Όνομα (Ω-Α)' },
  { value: 'created-desc', label: 'Νεότεροι πρώτοι' },
  { value: 'created-asc', label: 'Παλαιότεροι πρώτοι' },
  { value: 'revenue-desc', label: 'Υψηλότερα έσοδα' },
  { value: 'revenue-asc', label: 'Χαμηλότερα έσοδα' },
];

export default function AdminTenantsPage() {
  const toast = useContext(ToastContext);
  const showToast = toast?.showToast ?? (() => {});

  // State management
  const [tenants, setTenants] = useState(MOCK_TENANTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [tenantStats, setTenantStats] = useState(getTenantStats());

  // Constants
  const ITEMS_PER_PAGE = 10;

  // Update stats when tenants change
  useEffect(() => {
    setTenantStats(getTenantStats());
  }, [tenants]);

  // Filter and sort tenants
  const filteredAndSortedTenants = useMemo(() => {
    let filtered = [...tenants];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(tenant =>
        tenant.name.toLowerCase().includes(term) ||
        tenant.slug.toLowerCase().includes(term) ||
        tenant.plan.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(tenant => tenant.status === statusFilter);
    }

    // Apply plan filter
    if (planFilter !== 'all') {
      filtered = filtered.filter(tenant => tenant.plan === planFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'created-desc':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'created-asc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'revenue-desc':
          return (b.monthlyRevenue || 0) - (a.monthlyRevenue || 0);
        case 'revenue-asc':
          return (a.monthlyRevenue || 0) - (b.monthlyRevenue || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [tenants, searchTerm, statusFilter, planFilter, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedTenants.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTenants = filteredAndSortedTenants.slice(startIndex, endIndex);

  // Event handlers
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  }, []);

  const handleStatusFilterChange = useCallback((e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  }, []);

  const handlePlanFilterChange = useCallback((e) => {
    setPlanFilter(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleSelectTenant = useCallback((tenantId) => {
    setSelectedTenants(prev => {
      if (prev.includes(tenantId)) {
        return prev.filter(id => id !== tenantId);
      } else {
        return [...prev, tenantId];
      }
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedTenants.length === paginatedTenants.length) {
      setSelectedTenants([]);
    } else {
      setSelectedTenants(paginatedTenants.map(t => t.id));
    }
  }, [paginatedTenants]);

  const handleToggleTenantStatus = useCallback((tenantId, newStatus) => {
    setTenants(prev => prev.map(t => {
      if (t.id === tenantId) {
        const statusText = newStatus === 'active' ? 'ενεργός' : 
                          newStatus === 'suspended' ? 'ανεσταλμένος' : 'pending';
        showToast(`Ο tenant ${t.name} είναι τώρα ${statusText}`, 'success');
        return { ...t, status: newStatus };
      }
      return t;
    }));
  }, [showToast]);

  const handleBulkAction = useCallback((action) => {
    if (selectedTenants.length === 0) {
      showToast('Παρακαλώ επιλέξτε τουλάχιστον ένα tenant', 'error');
      return;
    }

    switch (action) {
      case 'activate':
        setTenants(prev => prev.map(t => 
          selectedTenants.includes(t.id) ? { ...t, status: 'active' } : t
        ));
        showToast(`${selectedTenants.length} tenants ενεργοποιήθηκαν`, 'success');
        break;
      case 'suspend':
        setTenants(prev => prev.map(t => 
          selectedTenants.includes(t.id) ? { ...t, status: 'suspended' } : t
        ));
        showToast(`${selectedTenants.length} tenants ανεστάλησαν`, 'success');
        break;
      case 'delete':
        if (window.confirm(`Θέλετε να διαγράψετε ${selectedTenants.length} tenants;`)) {
          setTenants(prev => prev.filter(t => !selectedTenants.includes(t.id)));
          setSelectedTenants([]);
          showToast(`${selectedTenants.length} tenants διαγράφηκαν`, 'success');
        }
        break;
    }
  }, [selectedTenants, showToast]);

  const handleCreateTenant = useCallback(() => {
    showToast('Άνοιγμα φόρμας δημιουργίας νέου tenant', 'info');
    // In a real app, this would open a modal or navigate to create form
  }, [showToast]);

  const handleExportData = useCallback(() => {
    showToast('Εξαγωγή δεδομένων tenants σε CSV', 'info');
    // In a real app, this would trigger CSV export
  }, [showToast]);

  const handleViewTenant = useCallback((tenant) => {
    showToast(`Προβολή λεπτομερειών για: ${tenant.name}`, 'info');
    // In a real app, this would navigate to tenant details
  }, [showToast]);

  const handleImpersonateTenant = useCallback((tenant, e) => {
    e.stopPropagation();
    showToast(`Μετάβαση στο tenant dashboard: ${tenant.slug}`, 'info');
    // In a real app, this would switch to tenant view
  }, [showToast]);

  // Format stats data
  const formattedStats = [
    { ...STATS_CONFIG[0], value: tenantStats.total.toString() },
    { ...STATS_CONFIG[1], value: tenantStats.active.toString() },
    { ...STATS_CONFIG[2], value: tenantStats.pending.toString() },
    { ...STATS_CONFIG[3], value: `€${(tenantStats.revenue / 1000).toFixed(1)}k` },
  ];

  // Get plan badge class
  const getPlanBadgeClass = (plan) => {
    switch (plan) {
      case 'premium': return `${styles.planBadge} ${styles.planPremium}`;
      case 'standard': return `${styles.planBadge} ${styles.planStandard}`;
      case 'trial': return `${styles.planBadge} ${styles.planTrial}`;
      default: return styles.planBadge;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('el-GR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.fadeIn}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Διαχείριση Tenants</h1>
        <p className={styles.pageSubtitle}>
          Διαχείριση όλων των tenants της πλατφόρμας. {filteredAndSortedTenants.length} tenants βρέθηκαν.
        </p>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {formattedStats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={stat.iconClass} style={stat.iconStyle}>
              <i className={`fas ${stat.icon}`} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
              {stat.trend && (
                <div className={`${styles.statTrend} ${
                  stat.trend.includes('+') ? styles.trendPositive : styles.trendNegative
                }`}>
                  {stat.trend}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Panel */}
      <div className={styles.contentPanel}>
        {/* Panel Header with Search and Actions */}
        <div className={styles.panelHeader}>
          <div className={styles.searchFilters}>
            <div className={styles.searchBox}>
              <i className={`fas fa-search ${styles.searchIcon}`} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Αναζήτηση tenants..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <select 
              className={styles.filterSelect}
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              {STATUS_FILTERS.map(filter => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
            
            <select 
              className={styles.filterSelect}
              value={planFilter}
              onChange={handlePlanFilterChange}
            >
              {PLAN_FILTERS.map(filter => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
            
            <select 
              className={styles.filterSelect}
              value={sortBy}
              onChange={handleSortChange}
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.actionButtons}>
            {selectedTenants.length > 0 && (
              <>
                <button 
                  className={styles.btnSecondary}
                  onClick={() => handleBulkAction('activate')}
                >
                  <i className="fas fa-check" /> Ενεργοποίηση ({selectedTenants.length})
                </button>
                <button 
                  className={styles.btnSecondary}
                  onClick={() => handleBulkAction('suspend')}
                >
                  <i className="fas fa-pause" /> Αναστολή ({selectedTenants.length})
                </button>
                <button 
                  className={styles.btnSecondary}
                  onClick={() => handleBulkAction('delete')}
                >
                  <i className="fas fa-trash" /> Διαγραφή ({selectedTenants.length})
                </button>
              </>
            )}
            <button 
              className={styles.btnSecondary}
              onClick={handleExportData}
            >
              <i className="fas fa-download" /> Εξαγωγή
            </button>
            <button 
              className={styles.btnPrimary}
              onClick={handleCreateTenant}
            >
              <i className="fas fa-plus" /> Νέος Tenant
            </button>
          </div>
        </div>

        {/* Tenants Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className={styles.tenantsTable}>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={selectedTenants.length === paginatedTenants.length && paginatedTenants.length > 0}
                    onChange={handleSelectAll}
                    style={{ cursor: 'pointer' }}
                  />
                </th>
                <th>Tenant</th>
                <th>Slug</th>
                <th>Κατάσταση</th>
                <th>Πλάνο</th>
                <th>Έσοδα</th>
                <th>Χρήστες</th>
                <th>Δημιουργία</th>
                <th>Τελευταία δραστηριότητα</th>
                <th style={{ width: '100px' }}>Ενέργειες</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTenants.length > 0 ? (
                paginatedTenants.map((tenant) => {
                  const statusInfo = getStatusBadgeInfo(tenant.status);
                  return (
                    <tr 
                      key={tenant.id} 
                      className={styles.tenantRow}
                      onClick={() => handleViewTenant(tenant)}
                    >
                      <td onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedTenants.includes(tenant.id)}
                          onChange={() => handleSelectTenant(tenant.id)}
                          onClick={(e) => e.stopPropagation()}
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                      <td>
                        <b>{tenant.name}</b>
                        <br />
                        <span style={{ fontSize: '11px', color: 'var(--c-mid)', opacity: 0.7 }}>
                          ID: {tenant.id}
                        </span>
                      </td>
                      <td>
                        <code style={{ 
                          fontSize: '11px', 
                          background: 'var(--c-muted)', 
                          padding: '2px 6px', 
                          borderRadius: '4px',
                          fontFamily: 'monospace'
                        }}>
                          {tenant.slug}
                        </code>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[statusInfo.class]}`}>
                                                   <i className={`fas ${statusInfo.icon}`} /> {statusInfo.text}
                        </span>
                      </td>
                      <td>
                        <span className={getPlanBadgeClass(tenant.plan)}>
                          {tenant.plan === 'premium' ? 'Premium' : 
                           tenant.plan === 'standard' ? 'Standard' : 'Δοκιμαστική'}
                        </span>
                      </td>
                      <td>
                        <b>€{tenant.monthlyRevenue?.toLocaleString('el-GR') || '0'}</b>
                        <br />
                        <span style={{ fontSize: '11px', color: 'var(--c-mid)', opacity: 0.7 }}>
                          μηνιαία
                        </span>
                      </td>
                      <td>
                        <b>{tenant.userCount || 0}</b>
                        <br />
                        <span style={{ fontSize: '11px', color: 'var(--c-mid)', opacity: 0.7 }}>
                          ενεργοί
                        </span>
                      </td>
                      <td>
                        {formatDate(tenant.createdAt)}
                      </td>
                      <td>
                        {tenant.lastActivity ? formatDate(tenant.lastActivity) : 'Καμία δραστηριότητα'}
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div className={styles.actionButtons}>
                          <button 
                            className={styles.btnIcon}
                            onClick={() => handleViewTenant(tenant)}
                            title="Προβολή λεπτομερειών"
                          >
                            <i className="fas fa-eye" />
                          </button>
                          <button 
                            className={styles.btnIcon}
                            onClick={(e) => handleImpersonateTenant(tenant, e)}
                            title="Μετάβαση στο tenant"
                          >
                            <i className="fas fa-sign-in-alt" />
                          </button>
                          {tenant.status === 'active' ? (
                            <button 
                              className={styles.btnIcon}
                              onClick={() => handleToggleTenantStatus(tenant.id, 'suspended')}
                              title="Αναστολή tenant"
                            >
                              <i className="fas fa-pause" />
                            </button>
                          ) : (
                            <button 
                              className={styles.btnIcon}
                              onClick={() => handleToggleTenantStatus(tenant.id, 'active')}
                              title="Ενεργοποίηση tenant"
                            >
                              <i className="fas fa-play" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '40px' }}>
                    <div style={{ fontSize: '16px', color: 'var(--c-mid)', marginBottom: '10px' }}>
                      <i className="fas fa-search" style={{ fontSize: '24px', marginBottom: '10px' }} />
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--c-mid)' }}>
                      Δεν βρέθηκαν tenants με τα τρέχοντα κριτήρια
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button 
              className={styles.paginationBtn}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left" /> Προηγούμενη
            </button>
            
            <div className={styles.paginationNumbers}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`${styles.paginationNumber} ${page === currentPage ? styles.active : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button 
              className={styles.paginationBtn}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Επόμενη <i className="fas fa-chevron-right" />
            </button>
          </div>
        )}

        {/* Summary Footer */}
        <div className={styles.summaryFooter}>
          <div className={styles.summaryText}>
            Εμφάνιση {startIndex + 1}-{Math.min(endIndex, filteredAndSortedTenants.length)} από {filteredAndSortedTenants.length} tenants
            {selectedTenants.length > 0 && ` (${selectedTenants.length} επιλεγμένοι)`}
          </div>
          <div className={styles.summaryActions}>
            <button 
              className={styles.btnSecondary}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <i className="fas fa-arrow-up" /> Κορυφή
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}