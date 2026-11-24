import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV, SITE } from "../data/site";
import Dropdown from "./Dropdown";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { pathname } = useLocation();

  // Frosted-glass background once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Clicking anywhere outside a dropdown closes it.
  useEffect(() => {
    const onDocClick = (event) => {
      if (!event.target.closest(".dropdown")) setOpenDropdown(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const toggleDropdown = (id) => setOpenDropdown((current) => (current === id ? null : id));
  const closeDropdown = () => setOpenDropdown(null);

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}`} id="site-nav">
        <div className="container">
          <Link to="/" className="brand">
            <span className="brand-mark">{SITE.brandMark}</span>
            {SITE.brand}
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {NAV.map((entry) =>
              entry.items ? (
                <Dropdown
                  key={entry.id}
                  id={entry.id}
                  label={entry.label}
                  items={entry.items}
                  openId={openDropdown}
                  onToggle={toggleDropdown}
                  onSelect={closeDropdown}
                />
              ) : (
                <NavLink key={entry.label} to={entry.to} end={entry.to === "/"}>
                  {entry.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className={`nav-toggle${menuOpen ? " open" : ""}`}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        openDropdown={openDropdown}
        onToggleDropdown={toggleDropdown}
        onSelectDropdownItem={() => {
          closeDropdown();
          setMenuOpen(false);
        }}
      />
    </>
  );
}
