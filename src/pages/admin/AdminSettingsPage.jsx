// AdminSettingsPage.jsx - Placeholder για τη σελίδα Ρυθμίσεων
import { useContext } from "react";
import { ToastContext } from "../../layouts/AdminLayout";

export default function AdminSettingsPage() {
  const toast = useContext(ToastContext);
  const showToast = toast?.showToast ?? (() => {});

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, marginBottom: 20 }}>
        Ρυθμίσεις Πλατφόρμας
      </h1>
      <p style={{ color: "var(--c-mid)", marginBottom: 30 }}>
        Ρυθμίσεις συστήματος, τιμολόγησης, και διαμόρφωσης πλατφόρμας.
      </p>
      <button
        onClick={() => showToast('Η σελίδα Ρυθμίσεων είναι υπό ανάπτυξη', 'info')}
        style={{
          padding: "12px 24px",
          background: "var(--c-accent)",
          color: "white",
          border: "none",
          borderRadius: "var(--r-md)",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Ρύθμιση Πλατφόρμας
      </button>
    </div>
  );
}