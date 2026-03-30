const profileSections = [
  {
    title: "Current role",
    copy: "The frontend stores the detected role after login so navigation can adapt.",
  },
  {
    title: "Protected profile",
    copy: "This page is a natural place to connect `/api/auth/users/me/` details later.",
  },
  {
    title: "Account actions",
    copy: "Logout is already available in the top-left option menu for quick access.",
  },
];

export default function Profile() {
  return (
    <section className="stack">
      <div className="surface-card">
        <div className="eyebrow-text">Profile area</div>
        <h1 className="page-title">A cleaner place for personal details and role state.</h1>
        <p className="page-copy">
          Your backend already exposes the current authenticated user. This page now has a
          matching visual shell and is ready for real profile data.
        </p>
      </div>

      <div className="surface-card">
        <div className="feature-grid">
          {profileSections.map((section) => (
            <article key={section.title} className="feature-card">
              <h2 className="feature-title">{section.title}</h2>
              <p className="feature-copy">{section.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
