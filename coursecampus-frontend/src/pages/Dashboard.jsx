const dashboardCards = [
  {
    title: "Your space",
    copy: "See the most important parts of your account and move quickly through the platform.",
  },
  {
    title: "Course access",
    copy: "Open courses, continue learning, and keep your activity in one simple place.",
  },
  {
    title: "Quick actions",
    copy: "Use the menu to reach profile details, courses, and account options faster.",
  },
];

export default function Dashboard() {
  return (
    <section className="stack">
      <div className="surface-card">
        <div className="eyebrow-text">Dashboard</div>
        <h1 className="page-title">Your personal space on CourseCampus.</h1>
        <p className="page-copy">
          This area gives logged-in users a simple home base for courses, account details,
          and quick navigation.
        </p>
      </div>

      <div className="surface-card">
        <div className="feature-grid">
          {dashboardCards.map((card) => (
            <article key={card.title} className="feature-card">
              <h2 className="feature-title">{card.title}</h2>
              <p className="feature-copy">{card.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
