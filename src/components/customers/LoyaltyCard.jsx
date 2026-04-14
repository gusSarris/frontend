import { useEffect, useRef, useState } from "react";

export default function LoyaltyCard({ customer: c, onRedeem }) {
  const [barWidth, setBarWidth] = useState(0);
  const mounted = useRef(false);

  const loyaltyPct = Math.min(100, Math.round((c.loyaltyPoints / c.loyaltyThreshold) * 100));
  const loyaltyLeft = c.loyaltyThreshold - c.loyaltyPoints;

  /* Animate the bar in after mount (matches the original setTimeout flow) */
  useEffect(() => {
    mounted.current = false;
    setBarWidth(0);
    const t = setTimeout(() => {
      mounted.current = true;
      setBarWidth(loyaltyPct);
    }, 100);
    return () => clearTimeout(t);
  }, [c.id, loyaltyPct]);

  if (!c.loyaltyTier) return null;

  return (
    <div>
      <div className="loyalty-card">
        <div className="lc-header">
          <div className="lc-title">Loyalty Club ({c.loyaltyTier})</div>
          <i className="fas fa-crown" style={{ color: "var(--c-accent)", fontSize: 18 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
          <div className="lc-points">
            {c.loyaltyPoints}<span>πόντοι</span>
          </div>
          <button className="btn-redeem" onClick={() => onRedeem?.(c)}>
            Εξαργύρωση
          </button>
        </div>
        <div className="lc-progress-bg">
          <div className="lc-progress-fill" style={{ width: `${barWidth}%` }} />
        </div>
        <div className="lc-desc">
          {loyaltyLeft > 0
            ? `${loyaltyLeft} πόντοι ακόμα για δωρεάν υπηρεσία!`
            : "Έτοιμο για εξαργύρωση!"}
        </div>
      </div>
    </div>
  );
}
