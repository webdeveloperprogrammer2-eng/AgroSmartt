export default function ProfileSection({ Icon, tone = "green", title, count, emptyText, isEmpty, children }) {
  return (
    <section className="psection">
      <header className="psection-head">
        <span className={`psection-icon tone-${tone}`}>
          <Icon size={16} strokeWidth={2.3} />
        </span>
        <h2>{title}</h2>
        <span className="psection-count">{count}</span>
      </header>

      {isEmpty ? (
        <div className="psection-empty">
          <Icon size={22} strokeWidth={1.8} />
          <p>{emptyText}</p>
        </div>
      ) : (
        <div className="pcards-grid">{children}</div>
      )}
    </section>
  );
}
