import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../layouts/MainLayout";
import CustomerSearch from "./CustomerSearch";

/**
 * AppointmentModal — δημιουργία/επεξεργασία ραντεβού
 *
 * Props:
 *   open:              boolean
 *   onClose:           () => void
 *   initialTime?:      "HH:MM"              (προ-επιλογή ώρας)
 *   initialDate?:      "YYYY-MM-DD"
 *   customers:         Array<Customer>       (για CustomerSearch)
 *   services:          Array<Service>        (επιλογές)
 *   employees:         Array<Employee>
 *   availableSlots?:   string[]              (["09:00", ...])
 *   onSave?:           (payload) => Promise  (αν δοθεί, override του built-in mock)
 *
 * API integration — default handler (αν δεν περαστεί onSave):
 *   POST /api/appointments
 *   Body: { startTime, endTime, status:"SCHEDULED", price,
 *           store:"/api/stores/{id}", customer:"/api/customers/{id}",
 *           service:"/api/services/{id}", employeeId, notes, marketingSource }
 *   Headers: Authorization: Bearer <JWT>, X-Tenant-ID: <slug>
 *   422 → NoOverlappingAppointment constraint violation → show overlap alert
 */

const DEFAULT_SLOTS = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","14:00","15:30","16:30",
];

const SOURCES = ["Τηλέφωνο", "Google / Website", "Instagram", "Walk-in"];

export default function AppointmentModal({
  open,
  onClose,
  initialTime = "",
  initialDate,
  customers = [],
  services = [],
  employees = [],
  availableSlots = DEFAULT_SLOTS,
  onSave,
}) {
  const toastCtx = useContext(ToastContext);
  const showToast = toastCtx?.showToast ?? (() => {});

  const [customer, setCustomer] = useState(null);
  const [serviceId, setServiceId] = useState("");
  const [employeeId, setEmployeeId] = useState(employees[0]?.id ?? "");
  const [selectedDate, setSelectedDate] = useState(
    initialDate ?? new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState(initialTime);
  const [price, setPrice] = useState("");
  const [source, setSource] = useState(SOURCES[0]);
  const [notes, setNotes] = useState("");
  const [showOverlap, setShowOverlap] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedService = services.find((s) => s.id === serviceId);

  /* ── Reset when opened ── */
  useEffect(() => {
    if (open) {
      setShowOverlap(false);
      if (initialTime) setSelectedTime(initialTime);
      if (initialDate) setSelectedDate(initialDate);
    }
  }, [open, initialTime, initialDate]);

  /* ── Auto-fill price from service ── */
  useEffect(() => {
    if (selectedService) setPrice(selectedService.price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  /* ── Derive endTime ── */
  const getEndTime = () => {
    if (!selectedTime || !selectedService) return "";
    const [h, m] = selectedTime.split(":").map(Number);
    const end = new Date();
    end.setHours(h, m + selectedService.duration, 0, 0);
    return `${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`;
  };

  /* ── Save ── */
  const handleSave = async () => {
    if (!customer || !serviceId || !selectedTime) {
      showToast("Συμπλήρωσε όλα τα υποχρεωτικά πεδία", "error");
      return;
    }

    const payload = {
      startTime: `${selectedDate}T${selectedTime}:00+00:00`,
      endTime: `${selectedDate}T${getEndTime()}:00+00:00`,
      status: "SCHEDULED",
      price: String(price),
      customer: customer.id,            // IRI e.g. "/api/customers/{id}"
      service: serviceId,               // IRI e.g. "/api/services/{id}"
      employeeId,                       // UUID v7
      notes,
      marketingSource: source,
      // store: "/api/stores/{id}"  ← καλύτερα να περαστεί από parent βάσει επιλογής store του χρήστη
    };

    setLoading(true);
    try {
      if (onSave) {
        await onSave(payload);
      } else {
        // Mock fallback — αντικαταστήστε με api.post("/api/appointments", payload)
        await new Promise((r) => setTimeout(r, 600));
      }
      showToast("Ραντεβού αποθηκεύτηκε επιτυχώς!", "success");
      onClose?.();
    } catch (err) {
      // API Platform 422: { "@type":"ConstraintViolationList", "violations":[...] }
      const violations = err?.body?.violations;
      const overlap = violations?.some(
        (v) => v.propertyPath === "startTime" || /επικαλ/i.test(v.message)
      );
      if (overlap) {
        setShowOverlap(true);
      } else {
        showToast(err?.message || "Σφάλμα αποθήκευσης", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="apptModalTitle"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(46,26,24,0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "fadeIn .3s ease",
      }}
    >
      <div
        style={{
          background: "var(--c-surface)",
          width: "100%",
          maxWidth: 520,
          borderRadius: "var(--r-xl)",
          boxShadow: "0 20px 40px rgba(46,26,24,0.15)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
          animation: "fadeUp .3s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--c-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            id="apptModalTitle"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22,
              fontWeight: 700,
              color: "var(--c-dark)",
            }}
          >
            Νέο Ραντεβού
          </div>
          <button
            onClick={onClose}
            aria-label="Κλείσιμο"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--c-bg)",
              border: "1px solid var(--c-light)",
              color: "var(--c-mid)",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: 24,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Customer */}
          <Field>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <Label required>Πελάτης</Label>
              <button
                onClick={() =>
                  setCustomer({ id: "walkin", name: "Walk-in", mobile: "—", points: 0 })
                }
                style={walkinBtn}
              >
                + Περαστικός
              </button>
            </div>
            <CustomerSearch customers={customers} onSelect={setCustomer} />

            {customer?.lastService && (
              <div
                style={{
                  display: "flex",
                  background: "rgba(90,138,106,0.1)",
                  border: "1px solid rgba(90,138,106,0.2)",
                  borderRadius: "var(--r-sm)",
                  padding: "10px 14px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  animation: "fadeUp .3s ease",
                }}
              >
                <div style={{ fontSize: 12, color: "var(--s-done)" }}>
                  <i className="fas fa-history" style={{ marginRight: 4 }} />
                  Τελευταία: <b>{customer.lastService}</b>
                  {customer.lastDaysAgo != null && <> ({customer.lastDaysAgo} μέρες πριν)</>}
                </div>
                <button
                  onClick={() => services[0] && setServiceId(services[0].id)}
                  style={{
                    background: "var(--s-done)",
                    color: "white",
                    border: "none",
                    padding: "4px 10px",
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  Επανακράτηση
                </button>
              </div>
            )}
          </Field>

          {/* Service + Employee */}
          <Row>
            <Field flex={2}>
              <Label required>Υπηρεσία</Label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                style={inputBase}
              >
                <option value="" disabled>
                  Επιλέξτε...
                </option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.price}€ - {s.duration}')
                  </option>
                ))}
              </select>
            </Field>
            <Field flex={1.5}>
              <Label>Υπάλληλος</Label>
              <select
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                style={inputBase}
              >
                {employees.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </Field>
          </Row>

          {/* Date + Time slots */}
          <Row>
            <Field flex={1}>
              <Label required>Ημερομηνία</Label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={inputBase}
              />
            </Field>
            <Field flex={2}>
              <Label required>Διαθέσιμες Ώρες</Label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(65px, 1fr))",
                  gap: 8,
                }}
              >
                {availableSlots.map((slot) => {
                  const selected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => {
                        setSelectedTime(slot);
                        setShowOverlap(false);
                      }}
                      style={{
                        border: `1.5px solid ${selected ? "var(--c-accent)" : "var(--c-light)"}`,
                        background: selected ? "var(--c-accent)" : "var(--c-bg)",
                        color: selected ? "white" : "var(--c-mid)",
                        padding: "8px 0",
                        textAlign: "center",
                        borderRadius: "var(--r-xs)",
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all .2s",
                        userSelect: "none",
                        outline: "none",
                        boxShadow: selected ? "0 4px 10px rgba(196,135,79,0.25)" : "none",
                      }}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              {selectedService && selectedTime && (
                <div style={{ fontSize: 10, color: "var(--c-primary)", opacity: 0.8 }}>
                  Διάρκεια: {selectedService.duration} λεπτά (Λήξη στις {getEndTime()})
                </div>
              )}
            </Field>
          </Row>

          {/* Price + Source */}
          <Row>
            <Field flex={1}>
              <Label>Τελική Τιμή (€)</Label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="π.χ. 15.00"
                style={inputBase}
              />
            </Field>
            <Field flex={1}>
              <Label>Πηγή Κράτησης</Label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                style={inputBase}
              >
                {SOURCES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
          </Row>

          {/* Notes */}
          <Field>
            <Label>Σημειώσεις</Label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ιδιαιτερότητες, αλλεργίες, προτιμήσεις..."
              style={{
                background: "var(--c-bg)",
                border: "1.5px solid var(--c-light)",
                borderRadius: "var(--r-sm)",
                padding: "12px 14px",
                fontFamily: "inherit",
                fontSize: 13,
                color: "var(--c-dark)",
                resize: "vertical",
                minHeight: 80,
                outline: "none",
              }}
            />
          </Field>

          {/* Overlap alert */}
          {showOverlap && (
            <div
              role="alert"
              style={{
                display: "flex",
                background: "rgba(184,84,80,0.1)",
                border: "1px solid rgba(184,84,80,0.2)",
                borderRadius: "var(--r-sm)",
                padding: "12px 14px",
                alignItems: "flex-start",
                gap: 10,
                animation: "fadeUp .3s ease",
              }}
            >
              <i
                className="fas fa-exclamation-triangle"
                style={{ color: "var(--s-urgent)", fontSize: 16, marginTop: 2 }}
              />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--s-urgent)" }}>
                  Σύγκρουση Ωραρίου
                </div>
                <div style={{ fontSize: 12, color: "var(--c-mid)", marginTop: 4 }}>
                  Ο υπάλληλος έχει ήδη ραντεβού εκείνη την ώρα. Δοκίμασε άλλη θυρίδα από τη
                  λίστα.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid var(--c-muted)",
            background: "rgba(249,246,243,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 12,
            borderRadius: "0 0 var(--r-xl) var(--r-xl)",
          }}
        >
          <button
            onClick={onClose}
            style={{
              height: 40,
              padding: "0 20px",
              borderRadius: "var(--r-sm)",
              background: "transparent",
              border: "1px solid transparent",
              color: "var(--c-mid)",
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              outline: "none",
            }}
          >
            Ακύρωση
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              height: 40,
              padding: "0 24px",
              borderRadius: "var(--r-sm)",
              background: "var(--c-dark)",
              color: "var(--c-bg)",
              border: "none",
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 700,
              cursor: loading ? "wait" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              outline: "none",
              opacity: loading ? 0.7 : 1,
            }}
          >
            <i className={`fas ${loading ? "fa-spinner fa-spin" : "fa-check"}`} />
            Αποθήκευση
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Layout primitives ── */
function Field({ children, flex }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex }}>
      {children}
    </div>
  );
}

function Row({ children }) {
  return <div style={{ display: "flex", gap: 16 }}>{children}</div>;
}

function Label({ children, required }) {
  return (
    <label
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: ".05em",
        textTransform: "uppercase",
        color: "var(--c-primary)",
      }}
    >
      {children} {required && <span style={{ color: "var(--s-urgent)" }}>*</span>}
    </label>
  );
}

const inputBase = {
  height: 42,
  background: "var(--c-bg)",
  border: "1.5px solid var(--c-light)",
  borderRadius: "var(--r-sm)",
  padding: "0 14px",
  fontFamily: "inherit",
  fontSize: 13,
  color: "var(--c-dark)",
  outline: "none",
  cursor: "pointer",
};

const walkinBtn = {
  fontSize: 10,
  padding: "4px 8px",
  borderRadius: 4,
  background: "rgba(74,127,165,.1)",
  color: "var(--s-next)",
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
  textTransform: "uppercase",
  outline: "none",
};
