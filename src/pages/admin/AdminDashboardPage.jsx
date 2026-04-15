// AdminDashboard.jsx - 2-Tabs Dashboard για Super Admin
import { useState, useContext, useEffect, useCallback } from "react";
import { ToastContext } from "../../layouts/AdminLayout";
import styles from "./styles/AdminDashboardPage.module.css";

// Import mock data για dashboard
import {
  DASHBOARD_STATS,
  SYSTEM_ALERTS,
  RECENT_ACTIVITIES,
  REVENUE_TREND_DATA,
  TENANT_DISTRIBUTION,
  getPlatformStats,
  getLiveMetrics
} from "../../mocks/adminMocks";

// Tab definitions
const TABS = [
  { id: 'operations', label: '🚨 Operations', icon: 'fa-bell' },
  { id: 'analytics', label: '📈 Analytics', icon: 'fa-chart-line' }
];

// Alert severity colors
const ALERT_SEVERITY = {
  critical: { class: styles.alertCritical, icon: 'fa-exclamation-circle' },
  warning: { class: styles.alertWarning, icon: 'fa-exclamation-triangle' },
  info: { class: styles.alertInfo, icon: 'fa-info-circle' },
  success: { class: styles.alertSuccess, icon: 'fa-check-circle' }
};

export default function AdminDashboardPage() {
  const toast = useContext(ToastContext);
  const showToast = toast?.showToast ?? (() => {});

  // State management
  const [activeTab, setActiveTab] = useState('operations');
  const [platformStats, setPlatformStats] = useState(getPlatformStats());
  const [alerts, setAlerts] = useState(SYSTEM_ALERTS);
  const [activities, setActivities] = useState(RECENT_ACTIVITIES);
  const [liveMetrics, setLiveMetrics] = useState(getLiveMetrics());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [dateRange, setDateRange] = useState('today');

  // Auto-refresh για Operations tab
  useEffect(() => {
    if (activeTab === 'operations' && autoRefresh) {
      const interval = setInterval(() => {
        setLiveMetrics(getLiveMetrics());
        // Σε πραγματική εφαρμογή, θα καλούσαμε API
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [activeTab, autoRefresh]);

  // Handlers
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    if (tabId === 'operations') {
      setAutoRefresh(true);
    } else {
      setAutoRefresh(false);
    }
  }, []);

  const handleAcknowledgeAlert = useCallback((alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    showToast('Alert acknowledged', 'success');
  }, [showToast]);

  const handleRefreshData = useCallback(() => {
    setPlatformStats(getPlatformStats());
    setLiveMetrics(getLiveMetrics());
    showToast('Data refreshed', 'info');
  }, [showToast]);

  const handleDateRangeChange = useCallback((range) => {
    setDateRange(range);
    // Σε πραγματική εφαρμογή, θα καλούσαμε API με το νέο date range
    showToast(`Date range changed to: ${range}`, 'info');
  }, [showToast]);

  const handleExportReport = useCallback(() => {
    showToast('Exporting dashboard report...', 'info');
    // Σε πραγματική εφαρμογή, θα καλούσαμε export API
  }, [showToast]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('el-GR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  // Format time
  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Dashboard Header */}
      <div className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
          <p className={styles.dashboardSubtitle}>
            {activeTab === 'operations' 
              ? 'Real-time monitoring & incident response' 
              : 'Business intelligence & strategic insights'}
          </p>
        </div>
        
        <div className={styles.headerControls}>
          {activeTab === 'operations' && (
            <div className={styles.refreshToggle}>
              <label className={styles.toggleLabel}>
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className={styles.toggleInput}
                />
                <span className={styles.toggleSlider}></span>
                Auto-refresh (30s)
              </label>
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <select 
              className={styles.dateRangeSelect}
              value={dateRange}
              onChange={(e) => handleDateRangeChange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          )}
          
          <button 
            className={styles.refreshButton}
            onClick={handleRefreshData}
            title="Refresh data"
          >
            <i className="fas fa-sync-alt" />
          </button>
          
          <button 
            className={styles.exportButton}
            onClick={handleExportReport}
            title="Export report"
          >
            <i className="fas fa-download" />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            <i className={`fas ${tab.icon}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {/* OPERATIONS TAB */}
        {activeTab === 'operations' && (
          <div className={styles.operationsGrid}>
            {/* Left Column - Alerts & Live Metrics */}
            <div className={styles.operationsLeft}>
              {/* Active Alerts */}
              <div className={styles.alertsCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>
                    <i className="fas fa-exclamation-triangle" /> Active Alerts
                    {alerts.length > 0 && (
                      <span className={styles.alertCount}>{alerts.length}</span>
                    )}
                  </h3>
                  <span className={styles.cardSubtitle}>Require immediate attention</span>
                </div>
                
                <div className={styles.alertsList}>
                  {alerts.length > 0 ? (
                    alerts.map(alert => {
                      const severity = ALERT_SEVERITY[alert.severity];
                      return (
                        <div key={alert.id} className={`${styles.alertItem} ${severity.class}`}>
                          <div className={styles.alertIcon}>
                            <i className={`fas ${severity.icon}`} />
                          </div>
                          <div className={styles.alertContent}>
                            <div className={styles.alertTitle}>{alert.title}</div>
                            <div className={styles.alertMessage}>{alert.message}</div>
                            <div className={styles.alertMeta}>
                              <span className={styles.alertComponent}>{alert.component}</span>
                              <span className={styles.alertTime}>{alert.time}</span>
                            </div>
                          </div>
                          <button
                            className={styles.alertAction}
                            onClick={() => handleAcknowledgeAlert(alert.id)}
                            title="Acknowledge alert"
                          >
                            <i className="fas fa-times" />
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className={styles.noAlerts}>
                      <i className="fas fa-check-circle" />
                      <span>All systems operational</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Live System Metrics */}
              <div className={styles.metricsCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>
                    <i className="fas fa-heartbeat" /> System Health
                  </h3>
                  <span className={styles.cardSubtitle}>Live monitoring</span>
                </div>
                
                <div className={styles.metricsGrid}>
                  <div className={styles.metricItem}>
                    <div className={styles.metricValue}>
                      {formatPercentage(liveMetrics.uptime)}
                    </div>
                    <div className={styles.metricLabel}>Uptime (30d)</div>
                    <div className={`${styles.metricTrend} ${styles.trendPositive}`}>
                      <i className="fas fa-arrow-up" /> 0.2%
                    </div>
                  </div>
                  
                  <div className={styles.metricItem}>
                    <div className={styles.metricValue}>
                      {liveMetrics.avgResponseTime}ms
                    </div>
                    <div className={styles.metricLabel}>Avg Response</div>
                    <div className={`${styles.metricTrend} ${styles.trendNegative}`}>
                      <i className="fas fa-arrow-up" /> 15ms
                    </div>
                  </div>
                  
                  <div className={styles.metricItem}>
                    <div className={styles.metricValue}>
                      {liveMetrics.activeSessions}
                    </div>
                    <div className={styles.metricLabel}>Active Sessions</div>
                    <div className={`${styles.metricTrend} ${styles.trendPositive}`}>
                      <i className="fas fa-arrow-up" /> 12
                    </div>
                  </div>
                  
                  <div className={styles.metricItem}>
                    <div className={styles.metricValue}>
                      {formatPercentage(liveMetrics.errorRate)}
                    </div>
                    <div className={styles.metricLabel}>Error Rate</div>
                    <div className={`${styles.metricTrend} ${styles.trendPositive}`}>
                      <i className="fas fa-arrow-down" /> 0.1%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Pending Actions & Activity */}
            <div className={styles.operationsRight}>
              {/* Pending Actions */}
              <div className={styles.pendingCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>
                    <i className="fas fa-tasks" /> Pending Actions
                  </h3>
                  <span className={styles.cardSubtitle}>Require manual intervention</span>
                </div>
                
                <div className={styles.pendingList}>
                  <div className={styles.pendingItem}>
                    <div className={styles.pendingIcon}>
                      <i className="fas fa-credit-card" />
                    </div>
                    <div className={styles.pendingContent}>
                      <div className={styles.pendingTitle}>Failed Payments</div>
                      <div className={styles.pendingCount}>3 tenants</div>
                      <div className={styles.pendingTime}>Last 24 hours</div>
                    </div>
                    <button className={styles.pendingAction}>
                      Review <i className="fas fa-arrow-right" />
                    </button>
                  </div>
                  
                  <div className={styles.pendingItem}>
                    <div className={styles.pendingIcon}>
                      <i className="fas fa-user-clock" />
                    </div>
                    <div className={styles.pendingContent}>
                      <div className={styles.pendingTitle}>Pending Tenants</div>
                      <div className={styles.pendingCount}>8 awaiting approval</div>
                      <div className={styles.pendingTime}>Signups today</div>
                    </div>
                    <button className={styles.pendingAction}>
                      Approve <i className="fas fa-check" />
                    </button>
                  </div>
                  
                  <div className={styles.pendingItem}>
                    <div className={styles.pendingIcon}>
                      <i className="fas fa-life-ring" />
                    </div>
                    <div className={styles.pendingContent}>
                      <div className={styles.pendingTitle}>Support Tickets</div>
                      <div className={styles.pendingCount}>5 unassigned</div>
                      <div className={styles.pendingTime}>Avg wait: 45min</div>
                    </div>
                    <button className={styles.pendingAction}>
                      Assign <i className="fas fa-user-plus" />
                    </button>
                  </div>
                  
                  <div className={styles.pendingItem}>
                    <div className={styles.pendingIcon}>
                      <i className="fas fa-database" />
                    </div>
                    <div className={styles.pendingContent}>
                      <div className={styles.pendingTitle}>Storage Warning</div>
                      <div className={styles.pendingCount}>85% capacity</div>
                      <div className={styles.pendingTime}>Action recommended</div>
                    </div>
                    <button className={styles.pendingAction}>
                      Manage <i className="fas fa-cog" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity Feed */}
              <div className={styles.activityCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>
                    <i className="fas fa-history" /> Recent Activity
                  </h3>
                  <span className={styles.cardSubtitle}>Last 2 hours</span>
                </div>
                
                <div className={styles.activityList}>
                  {activities.map(activity => (
                    <div key={activity.id} className={styles.activityItem}>
                      <div className={`${styles.activityIcon} ${styles[activity.type]}`}>
                        <i className={`fas ${activity.icon}`} />
                      </div>
                      <div className={styles.activityContent}>
                        <div className={styles.activityText}>{activity.description}</div>
                        <div className={styles.activityMeta}>
                          <span className={styles.activityUser}>{activity.user}</span>
                          <span className={styles.activityTime}>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className={styles.viewAllButton}>
                  View All Activity <i className="fas fa-arrow-right" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className={styles.analyticsGrid}>
            {/* Top Row - Key Metrics */}
            <div className={styles.metricsRow}>
              <div className={styles.metricCard}>
                <div className={styles.metricCardHeader}>
                  <i className="fas fa-euro-sign" />
                  <span className={styles.metricCardLabel}>MRR</span>
                </div>
                <div className={styles.metricCardValue}>
                  {formatCurrency(platformStats.mrr)}
                </div>
                <div className={`${styles.metricCardTrend} ${styles.trendPositive}`}>
                  <i className="fas fa-arrow-up" /> +8.5%
                </div>
                <div className={styles.metricCardSubtext}>
                  vs last month
                </div>
              </div>
              
              <div className={styles.metricCard}>
                <div className={styles.metricCardHeader}>
                  <i className="fas fa-building" />
                  <span className={styles.metricCardLabel}>Active Tenants</span>
                </div>
                <div className={styles.metricCardValue}>
                  {platformStats.activeTenants}
                </div>
                <div className={`${styles.metricCardTrend} ${styles.trendPositive}`}>
                  <i className="fas fa-arrow-up" /> +12
                </div>
                <div className={styles.metricCardSubtext}>
                  Net growth this month
                </div>
              </div>
              
              <div className={styles.metricCard}>
                <div className={styles.metricCardHeader}>
                  <i className="fas fa-users" />
                  <span className={styles.metricCardLabel}>Total Users</span>
                </div>
                <div className={styles.metricCardValue}>
                  {platformStats.totalUsers.toLocaleString()}
                </div>
                <div className={`${styles.metricCardTrend} ${styles.trendPositive}`}>
                  <i className="fas fa-arrow-up" /> +3.2%
                </div>
                <div className={styles.metricCardSubtext}>
                  Monthly growth
                </div>
              </div>
              
              <div className={styles.metricCard}>
                <div className={styles.metricCardHeader}>
                  <i className="fas fa-chart-line" />
                  <span className={styles.metricCardLabel}>Churn Rate</span>
                </div>
                <div className={styles.metricCardValue}>
                  {formatPercentage(platformStats.churnRate)}
                </div>
                <div className={`${styles.metricCardTrend} ${styles.trendNegative}`}>
                  <i className="fas fa-arrow-up" /> +0.5%
                </div>
                <div className={styles.metricCardSubtext}>
                  Monthly churn
                </div>
              </div>
            </div>

            {/* Middle Row - Charts */}
            <div className={styles.chartsRow}>
              {/* Revenue Chart */}
              <div className={styles.chartCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>
                    <i className="fas fa-chart-line" /> Revenue Trend
                  </h3>
                  <span className={styles.cardSubtitle}>Last 30 days</span>
                </div>
                <div className={styles.chartPlaceholder}>
                  <div className={styles.chartMock}>
                    {/* Σε πραγματική εφαρμογή, εδώ θα μπαίνει πραγματικό chart */}
                    <div className={styles.chartBars}>
                                            {REVENUE_TREND_DATA.map((item, index) => (
                        <div 
                          key={index} 
                          className={styles.chartBar}
                          style={{ height: `${item.revenue / 50}%` }}
                          title={`${item.date}: €${item.revenue}`}
                        />
                      ))}
                    </div>
                    <div className={styles.chartLabels}>
                      <span>Start</span>
                      <span>Now</span>
                    </div>
                  </div>
                  <div className={styles.chartStats}>
                    <div className={styles.chartStat}>
                      <span className={styles.statLabel}>Total:</span>
                      <span className={styles.statValue}>{formatCurrency(platformStats.totalRevenue)}</span>
                    </div>
                    <div className={styles.chartStat}>
                      <span className={styles.statLabel}>Avg Daily:</span>
                      <span className={styles.statValue}>{formatCurrency(platformStats.avgDailyRevenue)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tenant Distribution Chart */}
              <div className={styles.chartCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>
                    <i className="fas fa-chart-pie" /> Tenant Distribution
                  </h3>
                  <span className={styles.cardSubtitle}>By plan type</span>
                </div>
                <div className={styles.chartPlaceholder}>
                  <div className={styles.pieChartMock}>
                    {/* Pie chart visualization */}
                    <div className={styles.pieSegment} style={{ 
                      '--segment-size': '40%',
                      '--segment-color': 'var(--plan-premium)'
                    }}>
                      <span className={styles.segmentLabel}>Premium</span>
                      <span className={styles.segmentValue}>{TENANT_DISTRIBUTION.premium}</span>
                    </div>
                    <div className={styles.pieSegment} style={{ 
                      '--segment-size': '35%',
                      '--segment-color': 'var(--plan-standard)'
                    }}>
                      <span className={styles.segmentLabel}>Standard</span>
                      <span className={styles.segmentValue}>{TENANT_DISTRIBUTION.standard}</span>
                    </div>
                    <div className={styles.pieSegment} style={{ 
                      '--segment-size': '25%',
                      '--segment-color': 'var(--plan-trial)'
                    }}>
                      <span className={styles.segmentLabel}>Trial</span>
                      <span className={styles.segmentValue}>{TENANT_DISTRIBUTION.trial}</span>
                    </div>
                  </div>
                  <div className={styles.chartLegend}>
                    <div className={styles.legendItem}>
                      <span className={`${styles.legendColor} ${styles.colorPremium}`}></span>
                      <span className={styles.legendLabel}>Premium</span>
                      <span className={styles.legendValue}>{TENANT_DISTRIBUTION.premium}</span>
                    </div>
                    <div className={styles.legendItem}>
                      <span className={`${styles.legendColor} ${styles.colorStandard}`}></span>
                      <span className={styles.legendLabel}>Standard</span>
                      <span className={styles.legendValue}>{TENANT_DISTRIBUTION.standard}</span>
                    </div>
                    <div className={styles.legendItem}>
                      <span className={`${styles.legendColor} ${styles.colorTrial}`}></span>
                      <span className={styles.legendLabel}>Trial</span>
                      <span className={styles.legendValue}>{TENANT_DISTRIBUTION.trial}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - Detailed Analytics */}
            <div className={styles.detailsRow}>
              {/* Growth Metrics */}
              <div className={styles.detailCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>
                    <i className="fas fa-rocket" /> Growth Metrics
                  </h3>
                </div>
                <div className={styles.metricsTable}>
                  <div className={styles.metricRow}>
                    <span className={styles.metricName}>New Tenants (MTD)</span>
                    <span className={styles.metricValue}>{platformStats.newTenantsMTD}</span>
                    <span className={`${styles.metricChange} ${styles.positive}`}>
                      <i className="fas fa-arrow-up" /> +15%
                    </span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricName}>Activation Rate</span>
                    <span className={styles.metricValue}>{formatPercentage(platformStats.activationRate)}</span>
                    <span className={`${styles.metricChange} ${styles.positive}`}>
                      <i className="fas fa-arrow-up" /> +5%
                    </span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricName}>Plan Upgrades</span>
                    <span className={styles.metricValue}>{platformStats.planUpgrades}</span>
                    <span className={`${styles.metricChange} ${styles.positive}`}>
                      <i className="fas fa-arrow-up" /> +8%
                    </span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricName}>Avg. Lifetime Value</span>
                    <span className={styles.metricValue}>{formatCurrency(platformStats.avgLTV)}</span>
                    <span className={`${styles.metricChange} ${styles.positive}`}>
                      <i className="fas fa-arrow-up" /> +12%
                    </span>
                  </div>
                </div>
              </div>

              {/* Geographic Distribution */}
              <div className={styles.detailCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>
                    <i className="fas fa-globe-europe" /> Geographic Spread
                  </h3>
                  <span className={styles.cardSubtitle}>Top locations</span>
                </div>
                <div className={styles.geoList}>
                  <div className={styles.geoItem}>
                    <span className={styles.geoFlag}>🇬🇷</span>
                    <span className={styles.geoCountry}>Greece</span>
                    <div className={styles.geoBar}>
                      <div 
                        className={styles.geoBarFill}
                        style={{ width: '65%' }}
                      ></div>
                    </div>
                    <span className={styles.geoValue}>65%</span>
                  </div>
                  <div className={styles.geoItem}>
                    <span className={styles.geoFlag}>🇨🇾</span>
                    <span className={styles.geoCountry}>Cyprus</span>
                    <div className={styles.geoBar}>
                      <div 
                        className={styles.geoBarFill}
                        style={{ width: '20%' }}
                      ></div>
                    </div>
                    <span className={styles.geoValue}>20%</span>
                  </div>
                  <div className={styles.geoItem}>
                    <span className={styles.geoFlag}>🇩🇪</span>
                    <span className={styles.geoCountry}>Germany</span>
                    <div className={styles.geoBar}>
                      <div 
                        className={styles.geoBarFill}
                        style={{ width: '8%' }}
                      ></div>
                    </div>
                    <span className={styles.geoValue}>8%</span>
                  </div>
                  <div className={styles.geoItem}>
                    <span className={styles.geoFlag}>🇬🇧</span>
                    <span className={styles.geoCountry}>UK</span>
                    <div className={styles.geoBar}>
                      <div 
                        className={styles.geoBarFill}
                        style={{ width: '5%' }}
                      ></div>
                    </div>
                    <span className={styles.geoValue}>5%</span>
                  </div>
                  <div className={styles.geoItem}>
                    <span className={styles.geoFlag}>🌍</span>
                    <span className={styles.geoCountry}>Other</span>
                    <div className={styles.geoBar}>
                      <div 
                        className={styles.geoBarFill}
                        style={{ width: '2%' }}
                      ></div>
                    </div>
                    <span className={styles.geoValue}>2%</span>
                  </div>
                </div>
              </div>

              {/* Performance vs Goals */}
              <div className={styles.detailCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>
                    <i className="fas fa-bullseye" /> Monthly Goals
                  </h3>
                  <span className={styles.cardSubtitle}>Progress tracking</span>
                </div>
                <div className={styles.goalsList}>
                  <div className={styles.goalItem}>
                    <div className={styles.goalHeader}>
                      <span className={styles.goalName}>Revenue Target</span>
                      <span className={styles.goalProgress}>85%</span>
                    </div>
                    <div className={styles.goalBar}>
                      <div 
                        className={`${styles.goalBarFill} ${styles.goalOnTrack}`}
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                    <div className={styles.goalDetails}>
                      <span>€12,450 / €14,500</span>
                      <span>15 days remaining</span>
                    </div>
                  </div>
                  <div className={styles.goalItem}>
                    <div className={styles.goalHeader}>
                      <span className={styles.goalName}>New Tenants</span>
                      <span className={styles.goalProgress}>120%</span>
                    </div>
                    <div className={styles.goalBar}>
                      <div 
                        className={`${styles.goalBarFill} ${styles.goalExceeded}`}
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                    <div className={styles.goalDetails}>
                      <span>12 / 10 target</span>
                      <span>Exceeded! 🎉</span>
                    </div>
                  </div>
                  <div className={styles.goalItem}>
                    <div className={styles.goalHeader}>
                      <span className={styles.goalName}>Churn Rate</span>
                      <span className={styles.goalProgress}>110%</span>
                    </div>
                    <div className={styles.goalBar}>
                      <div 
                        className={`${styles.goalBarFill} ${styles.goalAtRisk}`}
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                    <div className={styles.goalDetails}>
                      <span>3.2% / 2.9% target</span>
                      <span>Needs attention ⚠️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Footer */}
      <div className={styles.dashboardFooter}>
        <div className={styles.footerInfo}>
          <span className={styles.footerText}>
            Last updated: {new Date().toLocaleTimeString('el-GR')}
            {activeTab === 'operations' && autoRefresh && ' • Auto-refresh enabled'}
          </span>
        </div>
        <div className={styles.footerActions}>
          <button className={styles.footerButton}>
            <i className="fas fa-cog" /> Settings
          </button>
          <button className={styles.footerButton}>
            <i className="fas fa-question-circle" /> Help
          </button>
          <button className={styles.footerButton}>
            <i className="fas fa-bug" /> Report Issue
          </button>
        </div>
      </div>
    </div>
  );
}