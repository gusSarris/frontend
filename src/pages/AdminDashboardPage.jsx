// AdminDashboardPage.jsx
import { useState, useContext, useCallback, useEffect } from "react";
import { ToastContext } from "../layouts/MainLayout";
import styles from "./styles/AdminDashboardPage.module.css";

// Mock data for tenants
const MOCK_TENANTS = [
  { id: 1, name: 'Glamour Nails', slug: 'glamour-nails', status: 'active', createdAt: '2025-02-10', users: 12 },
  { id: 2, name: 'Beauty Spot', slug: 'beauty-spot', status: 'active', createdAt: '2025-01-15', users: 8 },
  { id: 3, name: 'Zen Massage', slug: 'zen-massage', status: 'pending', createdAt: '2026-04-01', users: 2 },
  { id: 4, name: 'Hair Studio', slug: 'hair-studio', status: 'suspended', createdAt: '2024-11-20', users: 5 },
  { id: 5, name: 'Nail Art Athens', slug: 'nail-art-athens', status: 'active', createdAt: '2025-06-05', users: 15 },
  { id: 6, name: 'Spa Retreat', slug: 'spa-retreat', status: 'pending', createdAt: '2026-03-28', users: 1 },
  { id: 7, name: 'Barber Club', slug: 'barber-club', status: 'active', createdAt: '2025-09-12', users: 6 },
];

// Mock activity data
const MOCK_ACTIVITIES = [
  { id: 1, icon: 'fa-plus-circle', text: '<b>Glamour Nails</b> δημιουργήθηκε', time: '5 λεπτά' },
  { id: 2, icon: 'fa-check-circle', text: '<b>Beauty Spot</b> ενεργοποιήθηκε', time: '1 ώρα' },
  { id: 3, icon: 'fa-pause-circle', text: '<b>Hair Studio</b> ανεστάλη', time: '3 ώρες' },
  { id: 4, icon: 'fa-user-plus', text: 'Νέος Sales χρήστης <b>marketing@</b>', time: 'Χθες' },
];

// KPI data
const KPI_DATA = [
  { icon: 'fa-building', iconClass: styles.kpiIconAccent, value: '24', label: 'Σύνολο Tenants' },
  { icon: 'fa-check-circle', iconClass: styles.kpiIconDone, value: '18', label: 'Ενεργοί' },
  { icon: 'fa-hourglass-half', iconClass: styles.kpiIconDark, value: '4', label: 'Pending' },
  { icon: 'fa-euro-sign', iconClass: styles.kpiIconNext, value: '€12.8k', label: 'Μηνιαία έσοδα' },
];

export default function AdminDashboardPage() {
  const toast = useContext(ToastContext);
  const showToast = toast?.showToast ?? (() => {});
  
  const [tenants, setTenants] = useState(MOCK_TENANTS);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [filteredTenants, setFilteredTenants] = useState(MOCK_TENANTS);

  // Filter tenants based on current filter
  useEffect(() => {
    if (currentFilter === 'all') {
      setFilteredTenants(tenants);
    } else {
      setFilteredTenants(tenants.filter(t => t.status === currentFilter));
    }
  }, [currentFilter, tenants]);

  const handleFilterChange = useCallback((filter) => {
    setCurrentFilter(filter);
    showToast(`Φίλτρο: ${getFilterLabel(filter)}`, 'info');
  }, [showToast]);

  const handleOpenTenant = useCallback((tenant) => {
    showToast(`Προβολή tenant: ${tenant.name} (${tenant.slug})`, 'info');
    // In a real app, this would navigate to tenant details
  }, [showToast]);

  const handleToggleTenantStatus = useCallback((tenantId, event) => {
    event.stopPropagation();
    setTenants(prev => prev.map(t => {
      if (t.id === tenantId) {
        const newStatus = t.status === 'active' ? 'suspended' : 'active';
        showToast(`Ο tenant ${t.name} είναι τώρα ${newStatus === 'active' ? 'ενεργός' : 'ανεσταλμένος'}`, 'success');
        return { ...t, status: newStatus };
      }
      return t;
    }));
  }, [showToast]);

  const handleImpersonateTenant = useCallback((tenantSlug, event) => {
    event.stopPropagation();
    showToast(`Μετάβαση στο tenant dashboard: ${tenantSlug} (προσομοίωση)`, 'info');
    // In a real app, this would switch to tenant view
    // setTimeout(() => { window.location.href = '/'; }, 800);
  }, [showToast]);

  const handleQuickAction = useCallback((action) => {
    const messages = {
      'new-tenant': 'Φόρμα νέου tenant',
      'invite-user': 'Πρόσκληση χρήστη',
      'platform-settings': 'Μετάβαση σε ρυθμίσεις'
    };
    showToast(messages[action], 'info');
  }, [showToast]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active': return `${styles.statusBadge} ${styles.statusActive}`;
      case 'pending': return `${styles.statusBadge} ${styles.statusPending}`;
      case 'suspended': return `${styles.statusBadge} ${styles.statusSuspended}`;
      default: return styles.statusBadge;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'fa-check';
      case 'pending': return 'fa-clock';
      case 'suspended': return 'fa-pause';
      default: return 'fa-question';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'ΕΝΕΡΓΟ';
      case 'pending': return 'PENDING';
      case 'suspended': return 'ΑΝΕΣΤΑΛΜΕΝΟ';
      default: return status.toUpperCase();
    }
  };

  const getFilterLabel = (filter) => {
    switch (filter) {
      case 'all': return 'Όλοι';
      case 'pending': return 'Pending';
      case 'active': return 'Active';
      case 'suspended': return 'Suspended';
      default: return filter;
    }
  };

  return (
    <>
      {/* KPI Ribbon */}
      <div className={styles.kpiRibbon}>
        {KPI_DATA.map((kpi, index) => (
          <div key={index} className={styles.kpiStat}>
            <div className={`${styles.kpiIconWrap} ${kpi.iconClass}`}>
              <i className={`fas ${kpi.icon}`} />
            </div>
            <div className={styles.kpiText}>
              <div className={styles.kpiStatVal}>{kpi.value}</div>
              <div className={styles.kpiStatLbl}>{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className={styles.twoColumnLayout}>
        {/* Left: Tenants Table */}
        <div className={styles.contentPanel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle}>Διαχείριση Tenants</div>
            <div className={styles.filterTabs}>
              <button 
                className={`${styles.filterTab} ${currentFilter === 'all' ? styles.active : ''}`}
                onClick={() => handleFilterChange('all')}
              >
                Όλοι
              </button>
              <button 
                className={`${styles.filterTab} ${currentFilter === 'pending' ? styles.active : ''}`}
                onClick={() => handleFilterChange('pending')}
              >
                Pending
              </button>
              <button 
                className={`${styles.filterTab} ${currentFilter === 'active' ? styles.active : ''}`}
                onClick={() => handleFilterChange('active')}
              >
                Active
              </button>
              <button 
                className={`${styles.filterTab} ${currentFilter === 'suspended' ? styles.active : ''}`}
                onClick={() => handleFilterChange('suspended')}
              >
                Suspended
              </button>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.tenantTable}>
              <thead>
                <tr>
                  <th>Tenant</th>
                  <th>Slug</th>
                  <th>Κατάσταση</th>
                  <th>Δημιουργία</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredTenants.map((tenant) => (
                  <tr 
                    key={tenant.id} 
                    className={styles.tenantRow}
                    onClick={() => handleOpenTenant(tenant)}
                  >
                    <td>
                      <b>{tenant.name}</b>
                      <br />
                      <span style={{ fontSize: '10px', opacity: 0.6 }}>
                        {tenant.users} χρήστες
                      </span>
                    </td>
                    <td>{tenant.slug}</td>
                    <td>
                      <span className={getStatusBadgeClass(tenant.status)}>
                        <i className={`fas ${getStatusIcon(tenant.status)}`} /> {getStatusText(tenant.status)}
                      </span>
                    </td>
                    <td>{tenant.createdAt}</td>
                    <td>
                      <button 
                        className={styles.actionBtn}
                        onClick={(e) => handleToggleTenantStatus(tenant.id, e)}
                        title="Αλλαγή κατάστασης"
                      >
                        <i className="fas fa-sync-alt" />
                      </button>
                      <button 
                        className={styles.actionBtn}
                        onClick={(e) => handleImpersonateTenant(tenant.slug, e)}
                        title="Μετάβαση ως Owner"
                      >
                        <i className="fas fa-sign-in-alt" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ 
            padding: '12px 16px', 
            borderTop: '1px solid var(--c-muted)', 
            fontSize: '12px', 
            color: 'var(--c-primary)',
            cursor: 'pointer'
          }}
          onClick={() => showToast('Προβολή όλων των tenants', 'info')}
          >
            <i className="fas fa-chevron-right" style={{ marginRight: '6px', opacity: 0.5 }} />
            Προβολή όλων των tenants →
          </div>
        </div>

        {/* Right: Recent Activity & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Recent Activity */}
          <div className={styles.contentPanel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>Πρόσφατη δραστηριότητα</div>
            </div>
            <div className={styles.activityFeed}>
              {MOCK_ACTIVITIES.map((activity) => (
                <div key={activity.id} className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <i className={`fas ${activity.icon}`} />
                  </div>
                  <div 
                    className={styles.activityText}
                    dangerouslySetInnerHTML={{ __html: activity.text }}
                  />
                  <div className={styles.activityTime}>{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.contentPanel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>Γρήγορες ενέργειες</div>
            </div>
            <div className={styles.quickActions}>
              <button 
                className={styles.btnTopbar}
                onClick={() => handleQuickAction('new-tenant')}
              >
                <i className="fas fa-plus" /> Νέος Tenant
              </button>
              <button 
                className={styles.btnTopbar}
                onClick={() => handleQuickAction('invite-user')}
              >
                <i className="fas fa-user-plus" /> Πρόσκληση Sales/Support
              </button>
              <button 
                className={styles.btnTopbar}
                onClick={() => handleQuickAction('platform-settings')}
              >
                <i className="fas fa-cog" /> Ρυθμίσεις πλατφόρμας
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}