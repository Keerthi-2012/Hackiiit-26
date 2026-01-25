"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
`;

const navItems = [
  { label: "Home", href: "/dashboard", icon: DashboardIcon },
  { label: "FAQ", href: "/faq", icon: HelpOutlineIcon },
  { label: "Blogs", href: "/blogs", icon: ArticleIcon },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // ❌ Do not show Navbar on landing page
  if (pathname === "/") return null;

  /* ===========================
     BACK BUTTON (BFCache FIX)
  =========================== */
  useEffect(() => {
    const onPageShow = (e) => {
      if (e.persisted) {
        window.location.replace("/");
      }
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  /* ===========================
     CROSS-TAB LOGOUT SYNC
  =========================== */
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "logout") {
        window.location.replace("/");
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    // 🔔 notify ALL tabs
    localStorage.setItem("logout", Date.now().toString());

    // 🔐 server logout
    window.location.replace("/api/auth/logout");
  };

  return (
    <>
      <style>{navbarStyles}</style>

      <nav className="navbar">
        <div className="navbar-container">
          <Link href="/dashboard" className="navbar-logo">
            Research Discuss
          </Link>

          <div className="nav-desktop">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="nav-link">
                  <button className="nav-button">
                    <Icon fontSize="small" />
                    {item.label}
                  </button>
                </Link>
              );
            })}

            <button className="nav-button" onClick={handleLogout}>
              <LogoutIcon fontSize="small" />
              Logout
            </button>

            <Link href="/profile" className="nav-link">
              <button className="nav-button">
                <PersonIcon fontSize="medium" />
              </button>
            </Link>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>
      </nav>
    </>
  );
}
