import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ToastContext } from "../layouts/MainLayout";
import styles from "./styles/CustomersPage.module.css";
import {INITIAL_CUSTOMERS,FILTERS} from '../mocks/customersMocks'
/* ═══════════════════════════════════════════════════════════
   MOCK DATA (same as before)
   ... (keep all mock data unchanged)
   ═══════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════
   SPARKLINE (unchanged)
═══════════════════════════════════════ */
function Sparkline({ data, color }) {
  // ... same implementation
}

/* ═══════════════════════════════════════
   CUSTOMER LIST ITEM (CSS Module applied)
═══════════════════════════════════════ */
function CustomerListItem({ customer, active, onClick }) {
  const visitsText = customer.visits === 1 ? "1 επίσκεψη" : `${customer.visits} επισκέψεις`;

  return (
    <div
      className={`${styles['c-item']} ${active ? styles.active : ''}`}
      onClick={onClick}
      role="listitem"
      tabIndex={0}
      aria-label={customer.name}
      onKeyDown={(e) => { if (e.key === "Enter") onClick?.(); }}
    >
      <div className={styles['c-av']}>
        {customer.photo ? <img src={customer.photo} alt={customer.name} /> : customer.initials}
      </div>
      <div className={styles['c-info']}>
        <div className={styles['c-name']}>
          {customer.name}
          {customer.isVip && <i className="fas fa-star icon-vip" />}
          {customer.listTags.map((t, i) => (
            <span key={i} className={`tag tag-${t.type}`} style={{ fontSize: 8, padding: "2px 4px" }}>
              {t.label}
            </span>
          ))}
        </div>
        <div className={styles['c-phone']}>{customer.phone}</div>
      </div>
      <div className={styles['c-meta']}>
        <div className={styles['c-visits']}>{visitsText}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SKELETON DETAIL (CSS Module)
═══════════════════════════════════════ */
function SkeletonDetail() {
  return (
    <>
      <div className={styles['detail-header']}>
        <div className={styles['d-profile']}>
          <div className="sk sk-avatar" />
          <div style={{ flex: 1 }}>
            <div className="sk sk-line w-60" style={{ marginBottom: 10 }} />
            <div className="sk sk-line w-40" />
          </div>
        </div>
      </div>
      <div className={styles['detail-body']}>
        <div className={styles['stats-grid']}>
          {[1, 2, 3, 4].map((i) => <div key={i} className="sk sk-stat" />)}
        </div>
        <div className="sk sk-block" />
        <div className="sk sk-block" style={{ height: 60 }} />
        <div className="sk sk-block" style={{ height: 80 }} />
      </div>
    </>
  );
}

/* ═══════════════════════════════════════
   EMPTY STATE (CSS Module)
═══════════════════════════════════════ */
function EmptyDetail() {
  return (
    <div className={styles['empty-state']}>
      <svg className={styles['empty-illustration']} width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="44" r="28" stroke="#C4874F" strokeWidth="2.5" />
        <path d="M32 100c0-15.464 12.536-28 28-28h0c15.464 0 28 12.536 28 28" stroke="#C4874F" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="60" cy="44" r="14" fill="#C4874F" opacity="0.15" />
        <path d="M52 44l5 5 11-11" stroke="#C4874F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className={styles['empty-title']}>Επιλέξτε έναν πελάτη</div>
      <div className={styles['empty-sub']}>
        Κάντε κλικ σε οποιονδήποτε πελάτη στη λίστα<br />
        για να δείτε το πλήρες προφίλ του.
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   DETAIL PANEL (CSS Module)
═══════════════════════════════════════ */
function CustomerDetail({ customer, onUpdate, onBack, showToast }) {
  // ... all state and hooks unchanged
  const [notes, setNotes] = useState(customer.notes);
  const [saveVisible, setSaveVisible] = useState(false);
  const [loyaltyAnim, setLoyaltyAnim] = useState(0);
  const saveTimerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setNotes(customer.notes);
    setSaveVisible(false);
  }, [customer.id, customer.notes]);

  useEffect(() => {
    if (!customer.loyaltyTier) return;
    const pct = Math.min(100, Math.round((customer.loyaltyPoints / customer.loyaltyThreshold) * 100));
    setLoyaltyAnim(0);
    const id = setTimeout(() => setLoyaltyAnim(pct), 120);
    return () => clearTimeout(id);
  }, [customer.id, customer.loyaltyPoints, customer.loyaltyThreshold, customer.loyaltyTier]);

  const handleNotesChange = (value) => {
    setNotes(value);
    setSaveVisible(false);
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      onUpdate?.(customer.id, { notes: value });
      setSaveVisible(true);
      setTimeout(() => setSaveVisible(false), 2000);
    }, 800);
  };

  const handleAvatarClick = () => fileInputRef.current?.click();
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onUpdate?.(customer.id, { photo: ev.target.result });
      showToast?.("Η φωτογραφία ενημερώθηκε!", "success");
    };
    reader.readAsDataURL(file);
  };

  const loyaltyLeft = customer.loyaltyThreshold - customer.loyaltyPoints;
  const lastVisitDays = customer.daysSinceLast ?? null;
  const lastVisitColor =
    lastVisitDays === null ? "var(--c-mid)"
    : lastVisitDays > 45    ? "var(--s-urgent)"
    : lastVisitDays > 30    ? "var(--c-accent)"
    :                          "var(--s-done)";

  const statusLabels = { active: "Προγραμματισμένο", done: "Ολοκληρώθηκε" };
  const statusColors = { active: "var(--s-active)",   done: "var(--s-done)"   };

  return (
    <>
      <div className={styles['detail-header']} style={{ animation: "fadeUp .3s ease" }}>
        <div className={styles['d-profile']}>
          <div
            className={styles['d-av-wrap']}
            onClick={handleAvatarClick}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") handleAvatarClick(); }}
            title="Αλλαγή φωτογραφίας"
          >
            <div className={styles['d-av']}>
              {customer.photo ? <img src={customer.photo} alt={customer.name} /> : customer.initials}
            </div>
            <div className={styles['d-av-overlay']}>
              <i className="fas fa-camera" style={{ fontSize: 16 }} />
              <span style={{ fontSize: 10, fontWeight: 700 }}>Αλλαγή</span>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className={styles['d-av-input']}
            accept="image/*"
            onChange={handleAvatarUpload}
          />
          <div>
            <div className={styles['d-name']}>
              {customer.name}
              {customer.isVip && (
                <i className="fas fa-star icon-vip" style={{ fontSize: 20, verticalAlign: "middle", marginLeft: 6 }} />
              )}
            </div>
            <div className={styles['d-since']}>
              Πελάτης από: {customer.since} ·{" "}
              <span style={{ color: "var(--s-done)", fontWeight: 700 }}>
                {customer.status === "new" ? "Νέος" : "Ενεργός"}
              </span>
              {customer.detailTags.length > 0 && (
                <>
                  {"\u00A0\u00A0"}
                  {customer.detailTags.map((t, i) => (
                    <span key={i} className={`tag tag-${t.type}`} style={{ marginLeft: 4 }}>
                      <i className="fas fa-circle-info" style={{ fontSize: 8 }} /> {t.label}
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {onBack && (
            <button className={styles['btn-topbar']} onClick={onBack} title="Πίσω" aria-label="Πίσω στη λίστα">
              <i className="fas fa-arrow-left" style={{ margin: 0, fontSize: 11 }} />
            </button>
          )}
          <button
            className={styles['btn-topbar']}
            style={{ background: "var(--c-bg)" }}
            onClick={() => showToast?.(`Επεξεργασία: ${customer.name}`, "info")}
            title="Επεξεργασία"
          >
            <i className="fas fa-pen" style={{ margin: 0, fontSize: 11 }} />
          </button>
          <button
            className={`${styles['btn-topbar']} ${styles['btn-topbar-primary']}`}
            onClick={() => showToast?.(`Νέο ραντεβού για ${customer.name}`, "success")}
          >
            <i className="fas fa-plus" /> Νέο Ραντεβού
          </button>
        </div>
      </div>

      <div className={styles['detail-body']}>
        <div className={styles['stats-grid']}>
          <div className={styles['stat-box']}>
            <div className={styles['sb-val']}>{customer.visits}</div>
            <div className={styles['sb-lbl']}>Επισκέψεις</div>
            <div className={styles.sparkline}><Sparkline data={customer.sparkVisits} color="#C4874F" /></div>
          </div>
          <div className={styles['stat-box']}>
            <div className={styles['sb-val']}>{customer.revenue}</div>
            <div className={styles['sb-lbl']}>Συνολικά Έσοδα</div>
            <div className={styles.sparkline}><Sparkline data={customer.sparkRevenue} color="#5A8A6A" /></div>
          </div>
          <div className={styles['stat-box']}>
            <div className={styles['sb-val']} style={{ color: lastVisitColor }}>
              {lastVisitDays ?? "—"}
            </div>
            <div className={styles['sb-lbl']}>Μέρες από τελ. επίσκεψη</div>
            {lastVisitDays !== null && lastVisitDays > 30 ? (
              <div className={styles['noshows-hint']} style={{ color: lastVisitColor, marginTop: 2 }}>
                <i className="fas fa-phone" style={{ fontSize: 8 }} /> Καλέστε
              </div>
            ) : (
              <div className={styles['noshows-hint']}>
                <i className="fas fa-check" style={{ fontSize: 8 }} /> Πρόσφατη
              </div>
            )}
          </div>
          <div className={styles['stat-box']}>
            <div className={`${styles['sb-val']} ${customer.noShows > 0 ? styles.bad : styles.good}`}>
              {customer.noShows}
            </div>
            <div className={styles['sb-lbl']}>No-Shows</div>
            {customer.noShows === 0 && (
              <div className={styles['noshows-hint']}>
                <i className="fas fa-check" style={{ fontSize: 8 }} /> Άριστο
              </div>
            )}
          </div>
        </div>

        <div>
          <div className={styles['section-title']}>Ιστορικό Επισκέψεων</div>
          <div className={styles['history-list']}>
            {customer.history.map((h, i) => {
              const isToday = h.status === "active";
              return (
                <div
                  key={i}
                  className={styles['hist-item']}
                  style={isToday ? {
                    background: "rgba(196,135,79,0.05)",
                    padding: 12,
                    borderRadius: "var(--r-sm)",
                    border: "1px solid rgba(196,135,79,0.2)",
                  } : undefined}
                >
                  <div className={styles['hist-date']}>
                    <div className={styles['hd-day']} style={isToday ? { color: "var(--c-accent)" } : undefined}>
                      {h.date}
                    </div>
                    <div className={styles['hd-mo']}>{h.month}</div>
                  </div>
                  <div className={styles['hist-content']}>
                    <div className={styles['hc-title']}>
                      {h.service}
                      {h.note && (
                        <span style={{ color: "var(--c-mid)", fontWeight: 400 }}> ({h.note})</span>
                      )}
                    </div>
                    <div className={styles['hc-sub']}>
                      {h.sub}
                      <span style={{ margin: "0 4px" }}>•</span>
                      <span style={{ color: statusColors[h.status], fontWeight: 700 }}>
                        {statusLabels[h.status]}
                      </span>
                    </div>
                  </div>
                  <div className={styles['hist-price']}>{h.price}</div>
                </div>
              );
            })}
          </div>
        </div>

        {customer.loyaltyTier && (
          <div>
            <div className={styles['loyalty-card']}>
              <div className={styles['lc-header']}>
                <div className={styles['lc-title']}>Loyalty Club ({customer.loyaltyTier})</div>
                <i className="fas fa-crown" style={{ color: "var(--c-accent)", fontSize: 18 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
                <div className={styles['lc-points']}>
                  {customer.loyaltyPoints}<span>πόντοι</span>
                </div>
                <button
                  className={styles['btn-redeem']}
                  onClick={() => showToast?.(`Εξαργύρωση πόντων για ${customer.name}! 🎉`, "success")}
                >
                  Εξαργύρωση
                </button>
              </div>
              <div className={styles['lc-progress-bg']}>
                <div className={styles['lc-progress-fill']} style={{ width: `${loyaltyAnim}%` }} />
              </div>
              <div className={styles['lc-desc']}>
                {loyaltyLeft > 0
                  ? `${loyaltyLeft} πόντοι ακόμα για δωρεάν υπηρεσία!`
                  : "Έτοιμο για εξαργύρωση!"}
              </div>
            </div>
          </div>
        )}

        <div>
          <div className={styles['info-list']} style={{ marginBottom: 20 }}>
            <div className={styles['info-row']}>
              <div className={styles['info-icon']}><i className="fas fa-mobile-alt" /></div>
              <div style={{ flex: 1 }}>
                <div className={styles['info-text']}>{customer.phone}</div>
                <div className={styles['info-sub']}>Κύριο Τηλέφωνο</div>
              </div>
              <div className={styles['contact-actions']}>
                <button className={`${styles['btn-contact']} whatsapp`} onClick={() => showToast?.(`WhatsApp: ${customer.phone}`, "success")}>
                  <i className="fab fa-whatsapp" />
                </button>
                <button className={`${styles['btn-contact']} viber`} onClick={() => showToast?.(`Viber: ${customer.phone}`, "info")}>
                  <i className="fab fa-viber" />
                </button>
                <button className={styles['btn-contact']} onClick={() => showToast?.(`SMS σε: ${customer.phone}`, "info")}>
                  <i className="fas fa-comment-sms" /> SMS
                </button>
              </div>
            </div>
            {customer.email && (
              <div className={styles['info-row']}>
                <div className={styles['info-icon']}><i className="far fa-envelope" /></div>
                <div>
                  <div className={styles['info-text']}>{customer.email}</div>
                  <div className={styles['info-sub']}>Email (Δέχεται Newsletters)</div>
                </div>
              </div>
            )}
          </div>

          <div className={styles['section-title']}>
            Σημειώσεις
            <i className="fas fa-lock" style={{ fontSize: 9, opacity: 0.4, marginLeft: 4 }} />
          </div>
          <textarea
            className={styles['notes-box']}
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Προσθέστε σημειώσεις..."
          />
          <div className={`${styles['notes-save-indicator']} ${saveVisible ? styles.visible : ''}`}>
            <i className="fas fa-check" style={{ fontSize: 9 }} /> Αποθηκεύτηκε
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
            {customer.warningTags.map((w, i) => (
              <span key={i} className="tag tag-red">
                <i className="fas fa-triangle-exclamation" style={{ fontSize: 8 }} /> {w}
              </span>
            ))}
            <button
              className={styles['btn-topbar']}
              style={{ height: 24, padding: "0 8px", fontSize: 10 }}
              onClick={() => showToast?.("Προσθήκη tag", "info")}
            >
              <i className="fas fa-plus" style={{ fontSize: 9 }} /> Νέο Tag
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════
   PAGE (CSS Module)
═══════════════════════════════════════ */
export default function CustomersPage() {
  const { showToast } = useContext(ToastContext);

  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [activeId, setActiveId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return customers.filter((c) => {
      const matchFilter = c.filter.includes(filter);
      const matchSearch = !q || c.name.toLowerCase().includes(q) || c.phone.replace(/\s/g, "").includes(q.replace(/\s/g, ""));
      return matchFilter && matchSearch;
    });
  }, [customers, filter, query]);

  const activeCustomer = customers.find((c) => c.id === activeId);

  const selectCustomer = (id) => {
    setActiveId(id);
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  };

  const updateCustomer = (id, patch) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const showDetail = isMobile && activeId != null;

  return (
    <div className={`${styles['crm-container']} ${showDetail ? styles['detail-visible'] : ''}`}>
      <aside className={styles['customer-list-panel']}>
        <div className={styles['list-header']}>
          <div className={styles['search-box']}>
            <i className="fas fa-search search-icon" />
            <input
              type="text"
              className={styles['search-input']}
              placeholder="Αναζήτηση με όνομα ή τηλέφωνο..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Αναζήτηση πελάτη"
            />
          </div>
          <div className={styles['filter-tags']} role="tablist">
            {FILTERS.map((f) => {
              const count =
                f.id === "all" ? customers.length
                : f.id === "vip" ? customers.filter((c) => c.isVip).length
                : 0;
              return (
                <div
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  tabIndex={0}
                  className={`${styles['f-tag']} ${filter === f.id ? styles.active : ''}`}
                  style={f.color ? { color: f.color } : undefined}
                  onClick={() => setFilter(f.id)}
                  onKeyDown={(e) => { if (e.key === "Enter") setFilter(f.id); }}
                >
                  {f.icon && (
                    <i className={`fas ${f.icon}`} style={{ color: "var(--c-accent)", marginRight: 3, fontSize: 9 }} />
                  )}
                  {f.label} ({count})
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles['list-body']} role="list">
          {filtered.length === 0 ? (
            <div className={styles['no-results']}>
              <div className={styles['no-results-icon']}><i className="fas fa-user-magnifying-glass" /></div>
              <div className={styles['no-results-title']}>Δεν βρέθηκαν πελάτες</div>
              <div className={styles['no-results-sub']}>
                {query ? `Δοκιμάστε διαφορετική αναζήτηση για "${query}"` : "Δεν υπάρχουν πελάτες σε αυτή την κατηγορία"}
              </div>
            </div>
          ) : (
            filtered.map((c) => (
              <CustomerListItem
                key={c.id}
                customer={c}
                active={c.id === activeId}
                onClick={() => selectCustomer(c.id)}
              />
            ))
          )}
        </div>
      </aside>

      <section className={styles['customer-detail-panel']}>
        {!activeCustomer ? (
          <EmptyDetail />
        ) : loading ? (
          <SkeletonDetail />
        ) : (
          <CustomerDetail
            customer={activeCustomer}
            onUpdate={updateCustomer}
            onBack={isMobile ? () => setActiveId(null) : undefined}
            showToast={showToast}
          />
        )}
      </section>
    </div>
  );
}