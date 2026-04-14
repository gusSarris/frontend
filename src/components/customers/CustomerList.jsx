import CustomerListItem from "./CustomerListItem";
import { CUSTOMER_FILTERS } from "../../mocks/customersMocks";

export default function CustomerList({
  customers,
  activeCustomerId,
  activeFilter,
  searchQuery,
  onSearchChange,
  onFilterChange,
  onSelectCustomer,
}) {
  const q = searchQuery.toLowerCase().trim();
  const filtered = customers.filter((c) => {
    const matchFilter = c.filter.includes(activeFilter);
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.phone.includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <div className="customer-list-panel">
      <div className="list-header">
        <div className="search-box">
          <i className="fas fa-search search-icon" />
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Αναζήτηση με όνομα ή τηλέφωνο..."
            aria-label="Αναζήτηση πελάτη"
          />
        </div>
        <div className="filter-tags" role="tablist">
          {CUSTOMER_FILTERS.map((f) => (
            <div
              key={f.id}
              className={`f-tag${activeFilter === f.id ? " active" : ""}`}
              onClick={() => onFilterChange(f.id)}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") onFilterChange(f.id); }}
              style={f.color ? { color: f.color } : undefined}
            >
              {f.icon && (
                <i
                  className={`fas ${f.icon}`}
                  style={{ color: f.iconColor, marginRight: 3, fontSize: 9 }}
                />
              )}
              {f.label}
            </div>
          ))}
        </div>
      </div>

      <div className="list-body" role="list">
        {filtered.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon"><i className="fas fa-user-magnifying-glass" /></div>
            <div className="no-results-title">Δεν βρέθηκαν πελάτες</div>
            <div className="no-results-sub">
              {q ? `Δοκιμάστε διαφορετική αναζήτηση για "${q}"` : "Δεν υπάρχουν πελάτες σε αυτή την κατηγορία"}
            </div>
          </div>
        ) : (
          filtered.map((c) => (
            <CustomerListItem
              key={c.id}
              customer={c}
              isActive={c.id === activeCustomerId}
              onSelect={onSelectCustomer}
            />
          ))
        )}
      </div>
    </div>
  );
}
