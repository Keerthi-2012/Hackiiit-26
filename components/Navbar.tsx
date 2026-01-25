


"use client";
import { useState } from "react";
import Link from "next/link";

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
    background-clip: text;
    cursor: pointer;
    letter-spacing: -0.5px;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .navbar-logo:hover {
    transform: scale(1.05);
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
    font-weight: 500;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    position: relative;
  }

  .nav-button::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: right;
  }

  .nav-button:hover {
    background: rgba(79, 172, 254, 0.1);
    color: #00f2fe;
  }

  .nav-button:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  .nav-icon {
    font-size: 1.2rem;
  }

  .menu-toggle {
    display: block;
    background: none;
    border: none;
    color: #00f2fe;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .menu-toggle:hover {
    background: rgba(79, 172, 254, 0.1);
    border-radius: 0.5rem;
    padding: 0.25rem;
  }

  @media (min-width: 768px) {
    .menu-toggle {
      display: none;
    }
  }

  /* Mobile Drawer */
  .mobile-drawer-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
    animation: fadeIn 0.3s ease-out;
  }

  .mobile-drawer {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-bottom: 1px solid rgba(79, 172, 254, 0.1);
    z-index: 1000;
    animation: slideDown 0.3s ease-out;
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .mobile-drawer-header {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    border-bottom: 1px solid rgba(79, 172, 254, 0.1);
  }

  .close-icon {
    background: none;
    border: none;
    color: #cbd5e1;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .close-icon:hover {
    color: #ff6b6b;
    background: rgba(239, 68, 68, 0.15);
    border-radius: 0.5rem;
    padding: 0.25rem;
  }

  .mobile-nav-list {
    list-style: none;
    padding: 0;
  }

  .mobile-nav-item {
    padding: 0;
    border-bottom: 1px solid rgba(79, 172, 254, 0.05);
  }

  .mobile-nav-link {
    text-decoration: none;
    display: block;
  }

  .mobile-nav-button {
    width: 100%;
    background: none;
    border: none;
    color: #cbd5e1;
    font-size: 0.95rem;
    font-weight: 500;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
  }

  .mobile-nav-button:hover {
    background: rgba(79, 172, 254, 0.1);
    color: #00f2fe;
  }

  .mobile-nav-icon {
    font-size: 1.2rem;
    color: #00f2fe;
  }
`;

const navItems = [
  { label: "Home", href: "/dashboard", icon: "🏠" },
  { label: "FAQ", href: "/faq", icon: "❓" },
  { label: "Blogs", href: "/blogs", icon: "📰" },
  { label: "Profile", href: "/profile", icon: "👤" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <style>{navbarStyles}</style>
      
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/dashboard" className="navbar-logo">
            Research Discuss
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-desktop">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                <button className="nav-button">
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                </button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="menu-toggle"
            onClick={handleDrawerToggle}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="mobile-drawer-overlay"
            onClick={handleDrawerToggle}
          />
          <div className="mobile-drawer">
            <div className="mobile-drawer-header">
              <button
                className="close-icon"
                onClick={handleDrawerToggle}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <ul className="mobile-nav-list">
              {navItems.map((item) => (
                <li key={item.href} className="mobile-nav-item">
                  <Link href={item.href} className="mobile-nav-link">
                    <button
                      className="mobile-nav-button"
                      onClick={handleDrawerToggle}
                    >
                      <span className="mobile-nav-icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}