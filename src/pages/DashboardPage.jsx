// DashboardPage.jsx
import { useCallback, useContext, useState } from "react";

import { ToastContext, StoreContext } from "../layouts/MainLayout";
import AppointmentModal from "../components/modals/AppointmentModal";
import WaitlistPanel from "../components/modals/WaitlistPanel";

import KpiRibbon from "../components/dashboard/KpiRibbon";
import EmpTabs from "../components/dashboard/EmpTabs";
import TimelineGrid from "../components/dashboard/TimelineGrid";
import DatePickerControl from "../components/dashboard/DatePickerControl";

import {
  MOCK_CUSTOMERS,
  MOCK_EMPLOYEES,
  MOCK_SERVICES,
  INITIAL_APPOINTMENTS,
  WAITLIST,
} from "../mocks/dashboardMocks";

import { formatDateLabel, startOfToday } from "../utils/dateLabel";
import styles from "./styles/DashboardPage.module.css"; // CSS Module import

// Re-export for any consumers that imported these from DashboardPage
export { MOCK_CUSTOMERS, MOCK_EMPLOYEES, MOCK_SERVICES } from "../mocks/dashboardMocks";

export default function DashboardPage() {
  const toast = useContext(ToastContext);
  const showToast = toast?.showToast ?? (() => {});

  const { activeStore } = useContext(StoreContext) ?? {};

  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [activeEmp, setActiveEmp] = useState("all");
  const [date, setDate] = useState(startOfToday());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTime, setModalTime] = useState(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOverKey, setDragOverKey] = useState(null);
  const [loadingDate, setLoadingDate] = useState(false);

  /* Date change — flips the skeleton for 500ms then toasts.
     API wiring: GET /api/appointments?date=YYYY-MM-DD */
  const handleDateChange = useCallback((nextDate) => {
    setLoadingDate(true);
    setDate(nextDate);
    setTimeout(() => {
      setLoadingDate(false);
      showToast(`Πλάνο ${formatDateLabel(nextDate)} φορτώθηκε`, "info");
    }, 500);
  }, [showToast]);

  /* Status change
     API: PATCH /api/appointments/{id}  { status: newStatus }
          Content-Type: application/merge-patch+json
     Loyalty points update γίνεται αυτόματα server-side (βλ. §6.2 PDF). */
  const handleStatusChange = useCallback((id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        const updated = { ...a, status: newStatus };
        if (newStatus === "COMPLETED") showToast("Ραντεβού ολοκληρώθηκε!", "success");
        if (newStatus === "CANCELED")  showToast("Ραντεβού ακυρώθηκε", "error");
        return updated;
      })
    );
  }, [showToast]);

  /* Drag and drop
     API: PATCH /api/appointments/{id}  { startTime, endTime }
     422 → NoOverlappingAppointment → revert + show toast */
  const handleDrop = useCallback((targetKey) => {
    if (!draggingId || !targetKey) return;
    const src = appointments.find(a => a.id === draggingId);
    if (!src || src.slotKey === targetKey) { setDraggingId(null); setDragOverKey(null); return; }
    setAppointments(prev => prev.map(a => a.id === draggingId ? { ...a, slotKey: targetKey } : a));
    showToast("Ραντεβού μετακινήθηκε επιτυχώς!", "success");
    setDraggingId(null); setDragOverKey(null);
  }, [draggingId, appointments, showToast]);

  /* Filtered appointments — by store first, then by employee
     API: GET /api/appointments?date=YYYY-MM-DD  (X-Tenant-ID φιλτράρει store server-side για Employee/Manager)
     Εδώ ο Owner φιλτράρει client-side βάσει του activeStore που επέλεξε. */
  const storeFiltered = activeStore
    ? appointments.filter(a => a.storeId === activeStore.id)
    : appointments;
  const visibleAppts = activeEmp === "all" ? storeFiltered : storeFiltered.filter(a => a.empId === activeEmp);

  const getApptAt = (timeRow, empIdx) => {
    const [h] = timeRow.split(":");
    const key = `${h}-${empIdx}`;
    return visibleAppts.find(a => a.slotKey === key);
  };

  const dateLabel = formatDateLabel(date);

  /* Appointment save handler (passed to modal)
     Uncomment to wire real API call:
     --------------------------------
     import api from "../api/client";
     const handleSaveAppointment = async (payload) => {
       const created = await api.post("/api/appointments", {
         ...payload,
         date: toISODate(date),
         store: "/api/stores/{current-store-id}",
       });
       setAppointments(prev => [...prev, mapApiToLocal(created)]);
     };
  */

  return (
    <>
      {/* All styles are now in DashboardPage.module.css */}

      {/* KPI Ribbon */}
      <KpiRibbon appointments={appointments} />

      {/* Content Panel */}
      <div className={styles.contentPanel}>
        {/* Panel header */}
        <div className={styles.panelHeader}>
          <div className={styles.panelTitleSection}>
            <div className={styles.panelTitle}>Ημερήσιο Πλάνο</div>
            <div className={styles.panelSubtitle}>
              {activeEmp === "all" ? "Όλοι οι υπάλληλοι" : MOCK_EMPLOYEES.find(e => e.id === activeEmp)?.name} · {dateLabel}
            </div>
          </div>

          <div className={styles.controlsContainer}>
            <DatePickerControl value={date} onChange={handleDateChange} />
            <EmpTabs
              activeId={activeEmp}
              onSelect={(id) => {
                setActiveEmp(id);
                showToast("Φίλτρο: " + (id === "all" ? "Όλοι" : MOCK_EMPLOYEES.find(e=>e.id===id)?.name), "info");
              }}
            />
          </div>
        </div>

        {/* Timeline */}
        <TimelineGrid
          loadingDate={loadingDate}
          getApptAt={getApptAt}
          handleStatusChange={handleStatusChange}
          setModalTime={setModalTime}
          setModalOpen={setModalOpen}
          draggingId={draggingId}
          setDraggingId={setDraggingId}
          dragOverKey={dragOverKey}
          setDragOverKey={setDragOverKey}
          handleDrop={handleDrop}
        />
      </div>

      {/* ─────────── MODALS ─────────── */}
      <AppointmentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTime={modalTime}
        customers={MOCK_CUSTOMERS}
        services={MOCK_SERVICES}
        employees={MOCK_EMPLOYEES}
        // onSave={handleSaveAppointment}   ← ξεκλείδωσέ το όταν συνδέσεις το API
      />

      <WaitlistPanel
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        items={WAITLIST}
      />
    </>
  );
}