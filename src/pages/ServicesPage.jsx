import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ToastContext } from "../layouts/MainLayout";
import { CATEGORIES, INITIAL_SERVICES } from "../mocks/servicesMocks";
import styles from "./styles/ServicesPage.module.css"; // CSS Module import

// ============================================================
// HELPER FUNCTIONS (unchanged)
// ============================================================
const formatDuration = (minutes) => {
  if (!minutes) return '—';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? (mins > 0 ? `${hours}ω ${mins}λ` : `${hours}ω`) : `${mins}λ`;
};

const generateId = () => `s${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ServicesPage() {
  const toast = useContext(ToastContext);
  const showToast = toast?.showToast ?? (() => {});

  // State
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('glamour_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Drawer state (add/edit)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    category: 'manicure',
    name: '',
    description: '',
    price: '',
    duration: 30,
    isActive: true,
  });
  const [formErrors, setFormErrors] = useState({ name: false, price: false });

  // Delete confirmation
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  // Persist services to localStorage
  useEffect(() => {
    localStorage.setItem('glamour_services', JSON.stringify(services));
  }, [services]);

  // Filter services based on category and search
  const filteredServices = useMemo(() => {
    let filtered = services;
    if (activeCategory !== 'all') {
      filtered = filtered.filter(s => s.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q))
      );
    }
    return filtered;
  }, [services, activeCategory, searchQuery]);

  // Get category info by id
  const getCategoryInfo = useCallback((categoryId) => {
    return CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  }, []);

  // ========== DRAWER HANDLERS ==========
  const openDrawerForNew = () => {
    setEditingId(null);
    setFormData({
      category: 'manicure',
      name: '',
      description: '',
      price: '',
      duration: 30,
      isActive: true,
    });
    setFormErrors({ name: false, price: false });
    setDrawerOpen(true);
  };

  const openDrawerForEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      category: service.category,
      name: service.name,
      description: service.description || '',
      price: service.price,
      duration: service.duration,
      isActive: service.isActive,
    });
    setFormErrors({ name: false, price: false });
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingId(null);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'name' || field === 'price') {
      setFormErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const stepDuration = (delta) => {
    setFormData(prev => {
      let newVal = prev.duration + delta;
      newVal = Math.max(5, Math.min(1440, newVal));
      return { ...prev, duration: newVal };
    });
  };

  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      price: formData.price === '' || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0,
    };
    setFormErrors(errors);
    return !errors.name && !errors.price;
  };

  const saveService = () => {
    if (!validateForm()) return;

    const newService = {
      category: formData.category,
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price).toFixed(2),
      duration: formData.duration,
      isActive: formData.isActive,
    };

    if (editingId) {
      // Update existing
      setServices(prev => prev.map(s =>
        s.id === editingId ? { ...s, ...newService } : s
      ));
      showToast(`"${newService.name}" ενημερώθηκε`, 'success');
    } else {
      // Create new
      setServices(prev => [{ id: generateId(), ...newService }, ...prev]);
      showToast(`"${newService.name}" προστέθηκε`, 'success');
    }
    closeDrawer();
  };

  // ========== TOGGLE ACTIVE ==========
  const toggleActive = (serviceId, currentStatus) => {
    setServices(prev => prev.map(s =>
      s.id === serviceId ? { ...s, isActive: !currentStatus } : s
    ));
    const service = services.find(s => s.id === serviceId);
    showToast(
      `"${service?.name}" ${!currentStatus ? 'ενεργοποιήθηκε' : 'απενεργοποιήθηκε'}`,
      !currentStatus ? 'success' : 'info'
    );
  };

  // ========== DELETE HANDLERS ==========
  const confirmDelete = (service) => {
    setServiceToDelete(service);
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    if (serviceToDelete) {
      setServices(prev => prev.filter(s => s.id !== serviceToDelete.id));
      showToast(`"${serviceToDelete.name}" διαγράφηκε`, 'error');
      setConfirmOpen(false);
      setServiceToDelete(null);
    }
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setServiceToDelete(null);
  };

  // ========== RENDER HELPERS ==========
  const renderCategoryTabs = () => {
    const allCategories = [{ id: 'all', name: 'Όλες', icon: '' }, ...CATEGORIES];
    return (
      <div className={styles['cat-tabs']} role="tablist">
        {allCategories.map(cat => (
          <button
            key={cat.id}
            className={`${styles['cat-tab']} ${activeCategory === cat.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            role="tab"
            aria-selected={activeCategory === cat.id}
          >
            {cat.icon && `${cat.icon} `}{cat.name}
          </button>
        ))}
      </div>
    );
  };

  const renderServiceCard = (service) => {
    const cat = getCategoryInfo(service.category);
    return (
      <div key={service.id} className={`${styles['svc-card']} ${!service.isActive ? styles.inactive : ''}`}>
        <div className={styles['svc-card-top']}>
          <div className={styles['svc-cat-icon']} style={{ background: cat.color, color: cat.text }}>
            {cat.icon}
          </div>
          <div className={styles['svc-card-info']}>
            <div className={styles['svc-name']}>{service.name}</div>
            <div className={styles['svc-cat-badge']}>{cat.name}</div>
          </div>
        </div>
        {service.description && (
          <div className={styles['svc-desc']}>{service.description}</div>
        )}
        <div className={styles['svc-meta']}>
          <span className={`${styles['svc-chip']} ${styles['chip-price']}`}>
            <i className="fas fa-euro-sign" style={{ fontSize: 9 }}></i>
            {parseFloat(service.price).toFixed(2)}
          </span>
          <span className={`${styles['svc-chip']} ${styles['chip-duration']}`}>
            <i className="fas fa-clock" style={{ fontSize: 9 }}></i>
            {formatDuration(service.duration)}
          </span>
        </div>
        <div className={styles['svc-card-footer']}>
          <div className={styles['toggle-wrap']}>
            <label className={styles.toggle} aria-label="Ενεργή/Ανενεργή υπηρεσία">
              <input
                type="checkbox"
                checked={service.isActive}
                onChange={() => toggleActive(service.id, service.isActive)}
              />
              <div className={styles['toggle-track']}></div>
              <div className={styles['toggle-thumb']}></div>
            </label>
            <span className={`${styles['toggle-lbl']} ${service.isActive ? styles.on : ''}`}>
              {service.isActive ? 'Ενεργή' : 'Ανενεργή'}
            </span>
          </div>
          <div className={styles['svc-actions']}>
            <button
              className={styles['svc-btn']}
              onClick={() => openDrawerForEdit(service)}
              title="Επεξεργασία"
              aria-label={`Επεξεργασία ${service.name}`}
            >
              <i className="fas fa-pen"></i>
            </button>
            <button
              className={`${styles['svc-btn']} ${styles.del}`}
              onClick={() => confirmDelete(service)}
              title="Διαγραφή"
              aria-label={`Διαγραφή ${service.name}`}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ========== RENDER ==========
  return (
    <div className={styles['services-page']}>
      {/* Toolbar */}
      <div className={styles['svc-toolbar']}>
        <div className={styles['search-wrap']}>
          <input
            type="search"
            placeholder="Αναζήτηση υπηρεσίας..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fas fa-search si"></i>
        </div>
        {renderCategoryTabs()}
      </div>

      {/* Services Grid or Empty State */}
      {filteredServices.length === 0 ? (
        <div className={styles['empty-state']}>
          <div className={styles['empty-icon']}><i className="fas fa-spa"></i></div>
          <div className={styles['empty-title']}>Δεν βρέθηκαν υπηρεσίες</div>
          <div className={styles['empty-sub']}>
            {searchQuery ? 'Δοκιμάστε διαφορετικό όρο αναζήτησης' : 'Προσθέστε την πρώτη υπηρεσία'}
          </div>
        </div>
      ) : (
        <div className={styles['svc-grid']}>
          {filteredServices.map(renderServiceCard)}
        </div>
      )}

      {/* New Service Button */}
      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
        <button className={`${styles['btn-topbar']} ${styles.primary}`} onClick={openDrawerForNew}>
          <i className="fas fa-plus" style={{ fontSize: 11 }}></i> Νέα Υπηρεσία
        </button>
      </div>

      {/* Drawer Modal (Add/Edit) */}
      {drawerOpen && (
        <div className={styles['drawer-overlay']} onClick={(e) => {
          if (e.target === e.currentTarget) closeDrawer();
        }}>
          <div className={styles.drawer}>
            <div className={styles['drawer-header']}>
              <div>
                <div className={styles['drawer-title']}>
                  {editingId ? 'Επεξεργασία Υπηρεσίας' : 'Νέα Υπηρεσία'}
                </div>
                <div className={styles['drawer-subtitle']}>
                  {editingId ? formData.name || 'Συμπληρώστε τα στοιχεία' : 'Συμπληρώστε τα στοιχεία'}
                </div>
              </div>
              <button className={styles['drawer-close']} onClick={closeDrawer} aria-label="Κλείσιμο">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className={styles['drawer-body']}>
              {/* Category */}
              <div className={styles.field}>
                <label htmlFor="svcCategory">Κατηγορία</label>
                <select
                  id="svcCategory"
                  value={formData.category}
                  onChange={(e) => handleFormChange('category', e.target.value)}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div className={styles.field}>
                <label htmlFor="svcName">Όνομα Υπηρεσίας <span style={{ color: 'var(--s-urgent)' }}>*</span></label>
                <input
                  id="svcName"
                  type="text"
                  placeholder="πχ. Ημιμόνιμο Χρώμα"
                  maxLength="120"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  className={formErrors.name ? styles.error : ''}
                />
                {formErrors.name && (
                  <div className={styles['field-error']} style={{ display: 'block' }}>Το όνομα είναι υποχρεωτικό</div>
                )}
              </div>

              {/* Description */}
              <div className={styles.field}>
                <label htmlFor="svcDesc">Περιγραφή</label>
                <textarea
                  id="svcDesc"
                  placeholder="Σύντομη περιγραφή υπηρεσίας..."
                  maxLength="5000"
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                />
                <div className={styles['field-hint']}>{formData.description.length} / 5000 χαρακτήρες</div>
              </div>

              {/* Price + Duration */}
              <div className={styles['field-row']}>
                <div className={styles.field}>
                  <label htmlFor="svcPrice">Τιμή (€) <span style={{ color: 'var(--s-urgent)' }}>*</span></label>
                  <input
                    id="svcPrice"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.5"
                    value={formData.price}
                    onChange={(e) => handleFormChange('price', e.target.value)}
                    className={formErrors.price ? styles.error : ''}
                  />
                  {formErrors.price && (
                    <div className={styles['field-error']} style={{ display: 'block' }}>Εισάγετε έγκυρη τιμή (≥ 0)</div>
                  )}
                </div>
                <div className={styles.field}>
                  <label>Διάρκεια</label>
                  <div className={styles['dur-stepper']}>
                    <button
                      type="button"
                      className={styles['dur-btn']}
                      onClick={() => stepDuration(-15)}
                      aria-label="Μείωση 15 λεπτών"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <input
                      className={styles['dur-input']}
                      type="number"
                      value={formData.duration}
                      onChange={(e) => handleFormChange('duration', Math.max(1, Math.min(1440, parseInt(e.target.value) || 30)))}
                      min="1"
                      max="1440"
                      aria-label="Διάρκεια σε λεπτά"
                    />
                    <button
                      type="button"
                      className={styles['dur-btn']}
                      onClick={() => stepDuration(15)}
                      aria-label="Αύξηση 15 λεπτών"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  <div className={styles['field-hint']}>{formatDuration(formData.duration)}</div>
                </div>
              </div>

              {/* Active toggle */}
              <div className={styles['active-row']}>
                <div className={styles['active-row-left']}>
                  <div className={styles.label}>Ενεργή Υπηρεσία</div>
                  <div className={styles.sub}>Εμφανίζεται κατά την κράτηση ραντεβού</div>
                </div>
                <label className={styles.toggle} aria-label="Ενεργή/Ανενεργή υπηρεσία">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleFormChange('isActive', e.target.checked)}
                  />
                  <div className={styles['toggle-track']}></div>
                  <div className={styles['toggle-thumb']}></div>
                </label>
              </div>
            </div>
            <div className={styles['drawer-footer']}>
              <button className={`${styles['btn-topbar']}`} style={{ flex: 1, justifyContent: 'center' }} onClick={closeDrawer}>
                Ακύρωση
              </button>
              <button className={`${styles['btn-topbar']} ${styles.primary}`} style={{ flex: 2, justifyContent: 'center' }} onClick={saveService}>
                <i className="fas fa-save" style={{ fontSize: 11 }}></i> Αποθήκευση
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmOpen && serviceToDelete && (
        <div className={styles['confirm-overlay']} onClick={(e) => {
          if (e.target === e.currentTarget) closeConfirm();
        }}>
          <div className={styles['confirm-box']}>
            <div className={styles['confirm-icon']}><i className="fas fa-trash-alt"></i></div>
            <div className={styles['confirm-title']}>Διαγραφή Υπηρεσίας;</div>
            <div className={styles['confirm-text']}>
              Η υπηρεσία "{serviceToDelete.name}" θα διαγραφεί οριστικά. Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.
            </div>
            <div className={styles['confirm-btns']}>
              <button className={styles['btn-cancel']} onClick={closeConfirm}>Ακύρωση</button>
              <button className={styles['btn-danger']} onClick={handleDelete}>Διαγραφή</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}