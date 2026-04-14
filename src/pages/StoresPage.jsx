import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ToastContext } from "../layouts/MainLayout";
import { MOCK_STORES, STORE_COLORS } from "../mocks/storesMocks";
import styles from "./styles/StoresPage.module.css";

/* ══════════════════════════════════════
   STORE FORM MODAL
══════════════════════════════════════ */
function StoreFormModal({ open, store, onClose, onSave }) {
  const [name, setName]       = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone]     = useState("");
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors]   = useState({});
  const nameRef = useRef(null);

  const isEdit = Boolean(store);

  useEffect(() => {
    if (open) {
      setName(store?.name    ?? "");
      setAddress(store?.address ?? "");
      setPhone(store?.phone   ?? "");
      setIsActive(store?.isActive ?? true);
      setErrors({});
      setTimeout(() => nameRef.current?.focus(), 60);
    }
  }, [open, store]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Το όνομα είναι υποχρεωτικό";
    else if (name.trim().length < 3) errs.name = "Ελάχιστο 3 χαρακτήρες";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave({ id: store?.id, name: name.trim(), address: address.trim(), phone: phone.trim(), isActive });
  };

  if (!open) return null;

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div>
            <div className={styles.modalTitle}>
              {isEdit ? "Επεξεργασία Καταστήματος" : "Νέο Κατάστημα"}
            </div>
            <div className={styles.modalApiHint}>
              {isEdit ? `Τροποποίηση στοιχείων — PATCH /api/stores/${store.id}` : "Δημιουργία — POST /api/stores"}
            </div>
          </div>
          <button onClick={onClose} className={styles.modalCloseBtn}>
            <i className="fas fa-xmark" />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formField}>
            <label className={styles.formLabel}>
              Όνομα Καταστήματος <span className={styles.formLabelRequired}>*</span>
            </label>
            <input
              ref={nameRef}
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
              placeholder="π.χ. Κεντρικό"
              className={`${styles.formInput} ${errors.name ? styles.formInputError : ""}`}
            />
            {errors.name && <div className={styles.fieldError}>{errors.name}</div>}
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Διεύθυνση</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="π.χ. Ερμού 45, Αθήνα"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Τηλέφωνο</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="210 0000000"
              type="tel"
              className={styles.formInput}
            />
          </div>

          <div className={styles.activeToggleRow}>
            <div>
              <div className={styles.activeToggleLabel}>Ενεργό κατάστημα</div>
              <div className={styles.activeToggleHint}>Ανενεργά καταστήματα δεν δέχονται ραντεβού</div>
            </div>
            <button
              role="switch"
              aria-checked={isActive}
              onClick={() => setIsActive((p) => !p)}
              className={styles.activeToggleButton}
              style={{ background: isActive ? "var(--c-accent)" : "var(--c-light)" }}
            >
              <span
                className={styles.activeToggleKnob}
                style={{ left: isActive ? 23 : 3 }}
              />
            </button>
          </div>

          <div className={styles.infoNote}>
            <i className={`fas fa-circle-info ${styles.infoNoteIcon}`} />
            <div className={styles.infoNoteText}>
              Η διαγραφή καταστήματος δεν επιτρέπεται από το API. Για απενεργοποίηση χρησιμοποιήστε την παραπάνω επιλογή.
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.cancelButton}>
            Ακύρωση
          </button>
          <button onClick={handleSubmit} className={styles.submitButton}>
            <i className={`fas ${isEdit ? "fa-floppy-disk" : "fa-plus"}`} />
            {isEdit ? "Αποθήκευση" : "Δημιουργία"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   STORE CARD
══════════════════════════════════════ */
function StoreCard({ store, colorIdx, onEdit, onToggleActive }) {
  const color = STORE_COLORS[colorIdx % STORE_COLORS.length];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.storeCard}
    >
      <div className={`${styles.storeActiveStrip} ${store.isActive ? styles.storeActiveStripActive : styles.storeActiveStripInactive}`} />

      <div className={styles.storeHeader}>
        <div className={styles.storeInfo}>
          <div className={styles.storeAvatar} style={{ background: color.bg }}>
            <i className={`fas fa-store ${styles.storeAvatarIcon}`} style={{ color: color.text }} />
          </div>
          <div>
            <div className={styles.storeName}>{store.name}</div>
            <span className={`${styles.storeStatusBadge} ${store.isActive ? styles.storeStatusBadgeActive : styles.storeStatusBadgeInactive}`}>
              <span className={styles.storeStatusDot} />
              {store.isActive ? "ΕΝΕΡΓΟ" : "ΑΝΕΝΕΡΓΟ"}
            </span>
          </div>
        </div>

        <div className={styles.storeActions}>
          <button
            onClick={() => onEdit(store)}
            title="Επεξεργασία"
            className={styles.iconButton}
          >
            <i className="fas fa-pen" />
          </button>
          <button
            onClick={() => onToggleActive(store.id)}
            title={store.isActive ? "Απενεργοποίηση" : "Ενεργοποίηση"}
            className={`${styles.iconButton} ${store.isActive ? styles.iconButtonDanger : styles.iconButtonSuccess}`}
          >
            <i className={`fas ${store.isActive ? "fa-toggle-off" : "fa-toggle-on"}`} />
          </button>
        </div>
      </div>

      <div className={styles.storeDetails}>
        {store.address && (
          <div className={styles.storeDetailRow}>
            <i className={`fas fa-location-dot ${styles.storeDetailIcon}`} />
            {store.address}
          </div>
        )}
        {store.phone && (
          <div className={styles.storeDetailRow}>
            <i className={`fas fa-phone ${styles.storeDetailIcon}`} />
            {store.phone}
          </div>
        )}
      </div>

      <div className={styles.storeStats}>
        <div className={styles.storeStat}>
          <div className={styles.storeStatValue}>{store.employeeCount}</div>
          <div className={styles.storeStatLabel}>ΥΠΑΛΛΗΛΟΙ</div>
        </div>
        <div className={styles.storeStatDivider} />
        <div className={styles.storeStat}>
          <div className={styles.storeStatValue}>{store.appointmentsThisMonth}</div>
          <div className={styles.storeStatLabel}>ΡΑΝΤΕΒΟΥ / ΜΗΝΑ</div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   KPI RIBBON
══════════════════════════════════════ */
function KpiRibbon({ stores }) {
  const active   = stores.filter((s) => s.isActive).length;
  const inactive = stores.filter((s) => !s.isActive).length;
  const totalEmp = stores.reduce((sum, s) => sum + s.employeeCount, 0);
  const totalAppt = stores.reduce((sum, s) => sum + s.appointmentsThisMonth, 0);

  const items = [
    { label: "Σύνολο", value: stores.length, icon: "fa-store",    color: "var(--c-accent)" },
    { label: "Ενεργά",  value: active,        icon: "fa-circle-check", color: "var(--s-done)"   },
    { label: "Ανενεργά",value: inactive,      icon: "fa-circle-xmark", color: "var(--s-urgent)" },
    { label: "Υπάλληλοι",value: totalEmp,     icon: "fa-users",   color: "var(--s-next)"   },
    { label: "Ραντεβού / μήνα", value: totalAppt, icon: "fa-calendar-check", color: "var(--c-mid)" },
  ];

  return (
    <div className={styles.kpiRibbon}>
      {items.map((item) => (
        <div key={item.label} className={styles.kpiCard}>
          <div className={styles.kpiIconWrapper} style={{ background: `${item.color}1a` }}>
            <i className={`fas ${item.icon} ${styles.kpiIcon}`} style={{ color: item.color }} />
          </div>
          <div>
            <div className={styles.kpiValue}>{item.value}</div>
            <div className={styles.kpiLabel}>{item.label.toUpperCase()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════
   EMPTY STATE
══════════════════════════════════════ */
function EmptyState({ onAdd }) {
  return (
    <div className={styles.emptyState}>
      <i className={`fas fa-store-slash ${styles.emptyStateIcon}`} />
      <div className={styles.emptyStateTitle}>Δεν υπάρχουν καταστήματα</div>
      <div className={styles.emptyStateText}>Δημιουργήστε το πρώτο κατάστημα για να ξεκινήσετε</div>
      <button onClick={onAdd} className={styles.emptyStateButton}>
        <i className="fas fa-plus" style={{ marginRight: 8 }} />
        Νέο Κατάστημα
      </button>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function StoresPage() {
  const { showToast } = useContext(ToastContext);
  const [stores, setStores]         = useState(MOCK_STORES);
  const [modalOpen, setModalOpen]   = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [search, setSearch]         = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = stores.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" ||
      (filterStatus === "active" && s.isActive) ||
      (filterStatus === "inactive" && !s.isActive);
    return matchSearch && matchStatus;
  });

  const openCreate = useCallback(() => {
    setEditingStore(null);
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((store) => {
    setEditingStore(store);
    setModalOpen(true);
  }, []);

  const handleToggleActive = useCallback((id) => {
    setStores((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const updated = { ...s, isActive: !s.isActive };
        showToast(
          updated.isActive ? `«${s.name}» ενεργοποιήθηκε` : `«${s.name}» απενεργοποιήθηκε`,
          updated.isActive ? "success" : "error"
        );
        return updated;
      })
    );
  }, [showToast]);

  const handleSave = useCallback(({ id, name, address, phone, isActive }) => {
    if (id) {
      setStores((prev) => prev.map((s) => s.id === id ? { ...s, name, address, phone, isActive } : s));
      showToast(`«${name}» ενημερώθηκε`, "success");
    } else {
      const newStore = {
        id: `store-${Date.now()}`,
        name, address, phone, isActive,
        employeeCount: 0,
        appointmentsThisMonth: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setStores((prev) => [...prev, newStore]);
      showToast(`Το κατάστημα «${name}» δημιουργήθηκε!`, "success");
    }
    setModalOpen(false);
  }, [showToast]);

  return (
    <div className={styles.storesPage}>
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.pageTitle}>Καταστήματα</div>
          <div className={styles.pageSubtitle}>Διαχείριση παραρτημάτων της επιχείρησης</div>
        </div>
        <button onClick={openCreate} className={styles.createButton}>
          <i className="fas fa-plus" />
          Νέο Κατάστημα
        </button>
      </div>

      <KpiRibbon stores={stores} />

      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <i className={`fas fa-magnifying-glass ${styles.searchIcon}`} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Αναζήτηση καταστήματος..."
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          {[
            { val: "all",      label: "Όλα" },
            { val: "active",   label: "Ενεργά" },
            { val: "inactive", label: "Ανενεργά" },
          ].map((opt) => (
            <button
              key={opt.val}
              onClick={() => setFilterStatus(opt.val)}
              className={`${styles.filterPill} ${filterStatus === opt.val ? styles.filterPillActive : ""}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className={styles.resultCount}>
          {filtered.length} {filtered.length === 1 ? "κατάστημα" : "καταστήματα"}
        </div>
      </div>

      {filtered.length === 0 ? (
        search || filterStatus !== "all"
          ? (
            <div className={styles.noResults}>
              <i className={`fas fa-search ${styles.noResultsIcon}`} />
              <div className={styles.noResultsTitle}>Δεν βρέθηκαν αποτελέσματα</div>
            </div>
          )
          : <EmptyState onAdd={openCreate} />
      ) : (
        <div className={styles.storeGrid}>
          {filtered.map((store, idx) => (
            <StoreCard
              key={store.id}
              store={store}
              colorIdx={idx}
              onEdit={openEdit}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>
      )}

      <StoreFormModal
        open={modalOpen}
        store={editingStore}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}