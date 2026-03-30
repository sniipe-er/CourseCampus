const courseCards = [
  {
    title: "Discover courses",
    copy: "Browse the available learning spaces and choose what fits you best.",
  },
  {
    title: "Keep learning",
    copy: "Return to your courses easily and continue from where you stopped.",
  },
  {
    title: "Simple experience",
    copy: "Everything stays centered on courses, access, and user comfort.",
  },
];

export default function Courses() {
  return (
    <section className="stack">
      <div className="surface-card">
        <div className="eyebrow-text">Courses</div>
        <h1 className="page-title">Explore courses in a simple, focused space.</h1>
        <p className="page-copy">
          This area is designed to help users browse, choose, and return to courses without
          unnecessary distractions.
        </p>
      </div>

      <div className="surface-card">
        <div className="feature-grid">
          {courseCards.map((card) => (
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
