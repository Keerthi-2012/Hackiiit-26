"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Dashboard as DashboardIcon,
  HelpOutline as HelpOutlineIcon,
  Article as ArticleIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";


const navbarStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .navbar {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(79, 172, 254, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .navbar-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
  }

  .navbar-logo {
    font-size: 1.4rem;
    font-weight: 800;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
    text-decoration: none;
  }

  .nav-desktop {
    display: none;
    gap: 0.5rem;
    align-items: center;
  }

  @media (min-width: 768px) {
    .nav-desktop {
      display: flex;
    }
  }

  .nav-link {
    text-decoration: none;
  }

  .nav-button {
    background: none;
    border: none;
    color: #cbd5e1;
    font-size: 0.95rem;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
  }

  .nav-button:hover {
    background: rgba(79, 172, 254, 0.1);
    color: #00f2fe;
  }

  .menu-toggle {
    display: block;
    background: none;
    border: none;
    color: #00f2fe;
    font-size: 1.5rem;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    .menu-toggle {
      display: none;
    }
  }

  .mobile-drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
  }

  .mobile-drawer {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    z-index: 1000;
  }

  .mobile-nav-list {
    list-style: none;
  }

  .mobile-nav-button {
    width: 100%;
    background: none;
    border: none;
    color: #cbd5e1;
    padding: 1rem 1.5rem;
    display: flex;
    gap: 1rem;
    cursor: pointer;
  }

  .mobile-nav-button:hover {
    background: rgba(79, 172, 254, 0.1);
    color: #00f2fe;
  }
`;

const navItems = [
  { label: "Home", href: "/dashboard", icon: DashboardIcon },
  { label: "FAQ", href: "/faq", icon: HelpOutlineIcon },
  { label: "Blogs", href: "/blogs", icon: ArticleIcon },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    // frontend only
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <>
      <style>{navbarStyles}</style>

      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/dashboard" className="navbar-logo">
            Research Discuss
          </Link>

          {/* Desktop Nav */}
          <div className="nav-desktop">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="nav-link">
                  <button className="nav-button">
                    <Icon sx={{ fontSize: "1.2rem" }} />
                    {item.label}
                  </button>
                </Link>
              );
            })}

            <button className="nav-button" onClick={handleLogout}>
  <span className="nav-icon">
    <LogoutIcon sx={{ fontSize: "1.2rem" }} />
  </span>
  Logout
</button>


           

            {/* Profile icon only */}
            <Link href="/profile" className="nav-link">
              <button className="nav-button">
                <PersonIcon sx={{ fontSize: "1.4rem" }} />
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="mobile-drawer-overlay"
            onClick={() => setMobileOpen(false)}
          />
          <div className="mobile-drawer">
            <ul className="mobile-nav-list">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <button
                        className="mobile-nav-button"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Icon />
                        {item.label}
                      </button>
                    </Link>
                  </li>
                );
              })}

              <li>
                <button
                  className="mobile-nav-button"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </li>

              <li>
                <Link href="/profile">
                  <button
                    className="mobile-nav-button"
                    onClick={() => setMobileOpen(false)}
                  >
                    👤 Profile
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}
