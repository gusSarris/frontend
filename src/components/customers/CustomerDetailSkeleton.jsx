export default function CustomerDetailSkeleton() {
  return (
    <>
      <div className="detail-header">
        <div className="d-profile">
          <div className="sk sk-avatar" />
          <div style={{ flex: 1 }}>
            <div className="sk sk-line w-60" style={{ marginBottom: 10 }} />
            <div className="sk sk-line w-40" />
          </div>
        </div>
      </div>
      <div className="detail-body">
        <div className="stats-grid">
          {[0, 1, 2, 3].map((i) => <div key={i} className="sk sk-stat" />)}
        </div>
        <div className="sk sk-block" />
        <div className="sk sk-block" style={{ height: 60 }} />
        <div className="sk sk-block" style={{ height: 80 }} />
      </div>
    </>
  );
}
