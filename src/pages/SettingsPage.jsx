import { useContext, useState } from "react";
import { ToastContext, ThemeContext } from "../layouts/MainLayout";
import { MOCK_PROFILE, MOCK_BUSINESS, TABS } from '../mocks/settingsMocks';
import styles from './styles/SettingsPage.module.css';

/* ══════════════════════════════════════
   RE-USABLE UI PRIMITIVES (with CSS modules)
══════════════════════════════════════ */
function SettingsCard({ title, description, children }) {
  return (
    <div className={styles.settingsCard}>
      {(title || description) && (
        <div className={styles.cardHeader}>
          {title && <div className={styles.cardTitle}>{title}</div>}
          {description && <div className={styles.cardDescription}>{description}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

function FieldRow({ label, hint, children }) {
  return (
    <div className={styles.fieldRow}>
      <div>
        <div className={styles.fieldLabel}>{label}</div>
        {hint && <div className={styles.fieldHint}>{hint}</div>}
      </div>
      <div className={styles.fieldControl}>{children}</div>
    </div>
  );
}

function FieldRowLast({ label, hint, children }) {
  return (
    <div className={styles.fieldRowLast}>
      <div>
        <div className={styles.fieldLabel}>{label}</div>
        {hint && <div className={styles.fieldHint}>{hint}</div>}
      </div>
      <div className={styles.fieldControl}>{children}</div>
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.input}
    />
  );
}

function Select({ value, onChange, options }) {
  return (
    <div className={styles.selectWrapper}>
      <select value={value} onChange={onChange} className={styles.select}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <i className={`fas fa-caret-down ${styles.selectIcon}`} />
    </div>
  );
}

function Toggle({ checked, onChange, label, description, isLast = false }) {
  const containerClass = isLast ? styles.toggleItemLast : styles.toggleItem;
  return (
    <div className={containerClass}>
      <div className={styles.toggleText}>
        <div className={styles.toggleLabel}>{label}</div>
        {description && <div className={styles.toggleDescription}>{description}</div>}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={styles.toggleButton}
        style={{ background: checked ? "var(--c-accent)" : "var(--c-muted)" }}
      >
        <span
          className={styles.toggleKnob}
          style={{
            left: checked ? 21 : 3,
            background: checked ? "#fff" : "var(--c-light)",
          }}
        />
      </button>
    </div>
  );
}

function ToggleLast({ checked, onChange, label, description }) {
  return <Toggle checked={checked} onChange={onChange} label={label} description={description} isLast={true} />;
}

function SaveButton({ onClick }) {
  return (
    <button onClick={onClick} className={styles.saveButton}>
      <i className="fas fa-check" /> Αποθήκευση
    </button>
  );
}

/* ══════════════════════════════════════
   TAB PANELS
══════════════════════════════════════ */
function GeneralPanel({ showToast }) {
  const [biz, setBiz] = useState(MOCK_BUSINESS);

  const field = (key) => ({
    value: biz[key],
    onChange: (e) => setBiz((p) => ({ ...p, [key]: e.target.value })),
  });

  return (
    <>
      <SettingsCard title="Στοιχεία Επιχείρησης" description="Βασικές πληροφορίες που εμφανίζονται στα τιμολόγια και τις επικοινωνίες.">
        <FieldRow label="Επωνυμία" hint="Εμφανίζεται στο header και στις αποδείξεις">
          <Input {...field("name")} placeholder="Glamour Nails" />
        </FieldRow>
        <FieldRow label="Tagline">
          <Input {...field("tagline")} placeholder="Σύντομη περιγραφή" />
        </FieldRow>
        <FieldRow label="Διεύθυνση">
          <Input {...field("address")} placeholder="Οδός, Αριθμός, Πόλη" />
        </FieldRow>
        <FieldRow label="Τηλέφωνο">
          <Input {...field("phone")} placeholder="210 0000000" type="tel" />
        </FieldRow>
        <FieldRow label="Email Επικοινωνίας">
          <Input {...field("email")} placeholder="info@example.gr" type="email" />
        </FieldRow>
        <FieldRowLast label="Website">
          <Input {...field("website")} placeholder="www.example.gr" />
        </FieldRowLast>
      </SettingsCard>

      <SettingsCard title="Τοπικές Ρυθμίσεις" description="Ζώνη ώρας και νόμισμα για σωστή εμφάνιση ημερομηνιών και τιμών.">
        <FieldRow label="Ζώνη Ώρας">
          <Select
            value={biz.timezone}
            onChange={(e) => setBiz((p) => ({ ...p, timezone: e.target.value }))}
            options={[
              { value: "Europe/Athens",    label: "Europe/Athens (EET, UTC+2)" },
              { value: "Europe/London",    label: "Europe/London (GMT, UTC+0)" },
              { value: "Europe/Berlin",    label: "Europe/Berlin (CET, UTC+1)" },
              { value: "America/New_York", label: "America/New_York (EST, UTC-5)" },
            ]}
          />
        </FieldRow>
        <FieldRowLast label="Νόμισμα">
          <Select
            value={biz.currency}
            onChange={(e) => setBiz((p) => ({ ...p, currency: e.target.value }))}
            options={[
              { value: "EUR", label: "€ Euro (EUR)" },
              { value: "USD", label: "$ US Dollar (USD)" },
              { value: "GBP", label: "£ British Pound (GBP)" },
            ]}
          />
        </FieldRowLast>
      </SettingsCard>

      <div className={styles.saveButtonWrapper}>
        <SaveButton onClick={() => showToast("Οι ρυθμίσεις αποθηκεύτηκαν!", "success")} />
      </div>
    </>
  );
}

function AccountPanel({ showToast }) {
  const [profile, setProfile] = useState(MOCK_PROFILE);

  const field = (key) => ({
    value: profile[key],
    onChange: (e) => setProfile((p) => ({ ...p, [key]: e.target.value })),
  });

  return (
    <>
      <SettingsCard title="Προφίλ Χρήστη" description="Τα στοιχεία του λογαριασμού σου.">
        <div className={styles.avatarSection}>
          <div className={styles.avatarImage}>{profile.initials}</div>
          <div className={styles.avatarInfo}>
            <div className={styles.avatarName}>{profile.name}</div>
            <div className={styles.avatarRole}>{profile.role}</div>
            <button className={styles.avatarButton}>
              <i className="fas fa-camera" /> Αλλαγή φωτογραφίας
            </button>
          </div>
        </div>

        <FieldRow label="Ονοματεπώνυμο">
          <Input {...field("name")} placeholder="Ονοματεπώνυμο" />
        </FieldRow>
        <FieldRow label="Email">
          <Input {...field("email")} placeholder="email@example.gr" type="email" />
        </FieldRow>
        <FieldRowLast label="Τηλέφωνο">
          <Input {...field("phone")} placeholder="69xxxxxxxx" type="tel" />
        </FieldRowLast>
      </SettingsCard>

      <div className={styles.saveButtonWrapper}>
        <SaveButton onClick={() => showToast("Το προφίλ αποθηκεύτηκε!", "success")} />
      </div>
    </>
  );
}

function NotificationsPanel({ showToast }) {
  const [n, setN] = useState({
    smsNewAppt:       true,
    smsReminder:      true,
    smsCancel:        true,
    emailDailySummary:true,
    emailNewAppt:     false,
    emailMarketing:   false,
    pushBrowser:      true,
  });

  const toggle = (key) => setN((p) => ({ ...p, [key]: !p[key] }));

  return (
    <>
      <SettingsCard title="SMS Ειδοποιήσεις" description="Αποστολή SMS στους πελάτες μέσω της πλατφόρμας.">
        <Toggle checked={n.smsNewAppt}  onChange={() => toggle("smsNewAppt")}  label="Νέο ραντεβού" description="SMS επιβεβαίωσης μόλις κλειστεί ένα ραντεβού" />
        <Toggle checked={n.smsReminder} onChange={() => toggle("smsReminder")} label="Υπενθύμιση" description="Αυτόματο SMS 24 ώρες πριν το ραντεβού" />
        <ToggleLast checked={n.smsCancel}   onChange={() => toggle("smsCancel")}   label="Ακύρωση" description="SMS ενημέρωσης σε περίπτωση ακύρωσης" />
      </SettingsCard>

      <SettingsCard title="Email Ειδοποιήσεις" description="Αποστολή emails στον λογαριασμό σου και στους πελάτες.">
        <Toggle checked={n.emailDailySummary} onChange={() => toggle("emailDailySummary")} label="Ημερήσια σύνοψη" description="Περίληψη ραντεβού κάθε πρωί στα 08:00" />
        <Toggle checked={n.emailNewAppt}      onChange={() => toggle("emailNewAppt")}      label="Νέο ραντεβού (email)" description="Email αντίγραφο για κάθε νέο ραντεβού" />
        <ToggleLast checked={n.emailMarketing}     onChange={() => toggle("emailMarketing")}     label="Marketing emails" description="Νέες δυνατότητες και ενημερώσεις της πλατφόρμας" />
      </SettingsCard>

      <SettingsCard title="Push Ειδοποιήσεις">
        <ToggleLast checked={n.pushBrowser} onChange={() => toggle("pushBrowser")} label="Browser notifications" description="Ειδοποιήσεις στον browser για νέα ραντεβού σε πραγματικό χρόνο" />
      </SettingsCard>

      <div className={styles.saveButtonWrapper}>
        <SaveButton onClick={() => showToast("Οι ειδοποιήσεις ενημερώθηκαν!", "success")} />
      </div>
    </>
  );
}

function AppearancePanel({ showToast }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [lang, setLang] = useState("el");
  const [density, setDensity] = useState("normal");

  return (
    <>
      <SettingsCard title="Θέμα" description="Επίλεξε light ή dark mode για το interface.">
        <div className={styles.themeSelector}>
          {[
            { value: "light", icon: "fa-sun",  label: "Light" },
            { value: "dark",  icon: "fa-moon", label: "Dark" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => { if (theme !== opt.value) toggleTheme(); }}
              className={`${styles.themeOption} ${theme === opt.value ? styles.themeOptionActive : ''}`}
            >
              <i className={`fas ${opt.icon} ${theme === opt.value ? styles.themeIconActive : styles.themeIcon}`} />
              <span className={`${styles.themeLabel} ${theme === opt.value ? styles.themeLabelActive : ''}`}>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard title="Γλώσσα & Πυκνότητα">
        <FieldRow label="Γλώσσα Interface">
          <Select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            options={[
              { value: "el", label: "Ελληνικά" },
              { value: "en", label: "English" },
            ]}
          />
        </FieldRow>
        <FieldRowLast label="Πυκνότητα εμφάνισης" hint="Επηρεάζει το spacing στις λίστες">
          <Select
            value={density}
            onChange={(e) => setDensity(e.target.value)}
            options={[
              { value: "compact", label: "Compact" },
              { value: "normal",  label: "Normal" },
              { value: "relaxed", label: "Relaxed" },
            ]}
          />
        </FieldRowLast>
      </SettingsCard>

      <div className={styles.saveButtonWrapper}>
        <SaveButton onClick={() => showToast("Οι ρυθμίσεις εμφάνισης αποθηκεύτηκαν!", "success")} />
      </div>
    </>
  );
}

function SecurityPanel({ showToast }) {
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [twoFa, setTwoFa] = useState(false);
  const [sessions] = useState([
    { device: "Chrome · macOS", location: "Αθήνα, GR", time: "Τώρα", current: true },
    { device: "Safari · iPhone 15", location: "Αθήνα, GR", time: "Χθες, 19:42", current: false },
    { device: "Firefox · Windows", location: "Θεσσαλονίκη, GR", time: "7 Απρ, 11:05", current: false },
  ]);

  const handlePwChange = () => {
    if (!passwords.current || !passwords.next) { showToast("Συμπλήρωσε όλα τα πεδία", "error"); return; }
    if (passwords.next !== passwords.confirm) { showToast("Οι κωδικοί δεν ταιριάζουν", "error"); return; }
    setPasswords({ current: "", next: "", confirm: "" });
    showToast("Ο κωδικός άλλαξε επιτυχώς!", "success");
  };

  return (
    <>
      <SettingsCard title="Αλλαγή Κωδικού" description="Χρησιμοποίησε ισχυρό κωδικό τουλάχιστον 8 χαρακτήρων.">
        <FieldRow label="Τρέχων κωδικός">
          <Input type="password" value={passwords.current} onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))} placeholder="••••••••" />
        </FieldRow>
        <FieldRow label="Νέος κωδικός">
          <Input type="password" value={passwords.next} onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))} placeholder="••••••••" />
        </FieldRow>
        <FieldRowLast label="Επαλήθευση νέου">
          <Input type="password" value={passwords.confirm} onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))} placeholder="••••••••" />
        </FieldRowLast>
        <div className={styles.saveButtonWrapper} style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--c-muted)" }}>
          <SaveButton onClick={handlePwChange} />
        </div>
      </SettingsCard>

      <SettingsCard title="Έλεγχος Ταυτότητας 2 Παραγόντων" description="Προσθέτει ένα επιπλέον επίπεδο ασφάλειας στον λογαριασμό σου.">
        <ToggleLast checked={twoFa} onChange={setTwoFa} label="Ενεργοποίηση 2FA" description="Θα σου ζητείται κωδικός από authenticator app κατά τη σύνδεση" />
      </SettingsCard>

      <SettingsCard title="Ενεργές Συνεδρίες" description="Διαχειρίσου τις συνδεδεμένες συσκευές.">
        {sessions.map((s, i) => (
          <div key={i} className={styles.sessionItem}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className={styles.sessionDeviceIcon}>
                <i className={`fas ${s.device.includes("iPhone") ? "fa-mobile-screen" : "fa-desktop"}`} />
              </div>
              <div className={styles.sessionInfo}>
                <div className={styles.sessionDeviceName}>
                  {s.device}
                  {s.current && <span className={styles.sessionBadge}>ΤΩΡΑ</span>}
                </div>
                <div className={styles.sessionMeta}>{s.location} · {s.time}</div>
              </div>
            </div>
            {!s.current && (
              <button
                onClick={() => showToast("Η συνεδρία τερματίστηκε", "error")}
                className={styles.sessionLogoutBtn}
              >
                Αποσύνδεση
              </button>
            )}
          </div>
        ))}
      </SettingsCard>
    </>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function SettingsPage() {
  const { showToast } = useContext(ToastContext);
  const [activeTab, setActiveTab] = useState("general");

  const panels = {
    general:       <GeneralPanel       showToast={showToast} />,
    account:       <AccountPanel       showToast={showToast} />,
    notifications: <NotificationsPanel showToast={showToast} />,
    appearance:    <AppearancePanel    showToast={showToast} />,
    security:      <SecurityPanel      showToast={showToast} />,
  };

  return (
    <div className={styles.settingsPage}>
      <div className={styles.header}>
        <div className={styles.title}>Ρυθμίσεις</div>
        <div className={styles.subtitle}>Διαχειρίσου τον λογαριασμό και τις προτιμήσεις σου</div>
      </div>

      <div className={styles.layout}>
        <nav className={styles.tabNav}>
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tabButton} ${active ? styles.tabButtonActive : ''}`}
              >
                {active && <div className={styles.tabIndicator} />}
                <i className={`fas ${tab.icon} ${styles.tabIcon}`} />
                <span className={styles.tabLabel}>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className={styles.panelContainer}>
          {panels[activeTab]}
        </div>
      </div>
    </div>
  );
}