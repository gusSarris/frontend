export default function CustomerDetailEmpty() {
  return (
    <div className="empty-state">
      <svg className="empty-illustration" width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="44" r="28" stroke="#C4874F" strokeWidth="2.5" />
        <path d="M32 100c0-15.464 12.536-28 28-28h0c15.464 0 28 12.536 28 28" stroke="#C4874F" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="60" cy="44" r="14" fill="#C4874F" opacity="0.15" />
        <path d="M52 44l5 5 11-11" stroke="#C4874F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="empty-title">Επιλέξτε έναν πελάτη</div>
      <div className="empty-sub">
        Κάντε κλικ σε οποιονδήποτε πελάτη στη λίστα<br />
        για να δείτε το πλήρες προφίλ του.
      </div>
    </div>
  );
}
