import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get("/auth/users/me/");
        setProfile(response.data);
      } catch (requestError) {
        console.error(requestError);
        setError("We could not load your profile right now.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <section className="stack">
      <div className="surface-card">
        <div className="eyebrow-text">Profile</div>
        <h1 className="page-title">Your account details</h1>
        <p className="page-copy">
          Review your main account information and keep your profile details close.
        </p>
      </div>

      <div className="surface-card">
        {loading ? (
          <div className="dashboard-empty">Loading profile...</div>
        ) : error ? (
          <div className="dashboard-empty">{error}</div>
        ) : (
          <div className="profile-grid">
            <article className="profile-card">
              <div className="eyebrow-text">Name</div>
              <h2 className="section-title">{profile?.name || "Not available"}</h2>
            </article>
            <article className="profile-card">
              <div className="eyebrow-text">Email</div>
              <h2 className="section-title">{profile?.email || "Not available"}</h2>
            </article>
            <article className="profile-card">
              <div className="eyebrow-text">Role</div>
              <h2 className="section-title">{profile?.role || "Not available"}</h2>
            </article>
            <article className="profile-card">
              <div className="eyebrow-text">Account</div>
              <h2 className="section-title">Active</h2>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
