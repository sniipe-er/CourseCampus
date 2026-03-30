import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const THEME_KEY = "coursecampus-theme";

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7H20M4 12H20M4 17H14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 11.5L12 5L20 11.5V19A1 1 0 0 1 19 20H5A1 1 0 0 1 4 19V11.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 20V12.5H15V20" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function CoursesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6.5C4 5.67 4.67 5 5.5 5H11V19H5.5A1.5 1.5 0 0 1 4 17.5V6.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M20 6.5C20 5.67 19.33 5 18.5 5H13V19H18.5A1.5 1.5 0 0 0 20 17.5V6.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4H10V10H4V4Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14 4H20V14H14V4Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 14H10V20H4V14Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14 18H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5 19C6.6 16.8 9 15.5 12 15.5C15 15.5 17.4 16.8 19 19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M15 12H4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M20 20V4A1 1 0 0 0 19 3H12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RegisterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.5 19C4.9 16.9 6.9 15.5 9 15.5C11.1 15.5 13.1 16.9 14.5 19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M18 8V14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M15 11H21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 17L19 12L14 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M19 12H9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M4 20V4A1 1 0 0 1 5 3H12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [dark, setDark] = useState(() => localStorage.getItem(THEME_KEY) === "dark");
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    setOpenMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const items = useMemo(() => {
    const navItems = [
      {
        label: "Home",
        caption: "Start here",
        icon: <HomeIcon />,
        action: () => navigate("/"),
      },
      {
        label: "Courses",
        caption: "Browse courses",
        icon: <CoursesIcon />,
        action: () => navigate("/courses"),
      },
    ];

    if (role === "student") {
      navItems.push({
        label: "My Courses",
        caption: "Track active courses",
        icon: <CoursesIcon />,
        action: () => navigate("/courses"),
      });
    }

    if (token) {
      navItems.push(
        {
          label: "Dashboard",
          caption: "Your main space",
          icon: <DashboardIcon />,
          action: () => navigate("/dashboard"),
        },
        {
          label: "Profile",
          caption: "Your account",
          icon: <ProfileIcon />,
          action: () => navigate("/profile"),
        },
      );
    } else {
      navItems.push(
        {
          label: "Login",
          caption: "Access your account",
          icon: <LoginIcon />,
          action: () => navigate("/login"),
        },
        {
          label: "Register",
          caption: "Create a new account",
          icon: <RegisterIcon />,
          action: () => navigate("/register"),
        },
      );
    }

    return navItems;
  }, [navigate, role, token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          <Link to="/" className="brand-link" aria-label="Go to CourseCampus homepage">
            <img src="/logo.png" alt="CourseCampus logo" className="brand-mark" />
            <span className="brand-text">
              <span className="brand-title">CourseCampus</span>
              <span className="brand-subtitle">Learning Hub</span>
            </span>
          </Link>
        </div>

        <div className="topbar-right">
          <div className="menu-shell" ref={menuRef}>
            <button
              type="button"
              className="icon-button"
              aria-label="Open navigation menu"
              onClick={() => setOpenMenu((value) => !value)}
            >
              <MenuIcon />
            </button>

            {openMenu && (
              <div className="menu-dropdown">
                <div className="menu-header">
                  <div className="menu-title">Explore CourseCampus</div>
                  <div className="menu-description">
                    Move through the app quickly and keep things simple.
                  </div>
                </div>

                <div className="menu-list">
                  {items.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      className="menu-item"
                      onClick={item.action}
                    >
                      <span className="menu-item-main">
                        <span className="menu-item-icon">{item.icon}</span>
                        <span className="menu-item-copy">
                          <span className="menu-item-label">{item.label}</span>
                          <span className="menu-item-caption">{item.caption}</span>
                        </span>
                      </span>
                    </button>
                  ))}

                  {token && (
                    <>
                      <div className="menu-separator" />
                      <button
                        type="button"
                        className="menu-item menu-danger"
                        onClick={logout}
                      >
                        <span className="menu-item-main">
                          <span className="menu-item-icon">
                            <LogoutIcon />
                          </span>
                          <span className="menu-item-copy">
                            <span className="menu-item-label">Logout</span>
                            <span className="menu-item-caption">Clear current session</span>
                          </span>
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className="icon-button theme-button"
            aria-label={dark ? "Activate light mode" : "Activate dark mode"}
            onClick={() => setDark((value) => !value)}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
