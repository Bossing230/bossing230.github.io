import { NavLink } from "react-router-dom";
import { NAV } from "../data/site";
import Dropdown from "./Dropdown";
import { CloseIcon } from "./Icons";

// Off-canvas sidebar shown on small screens. Dropdowns become an accordion.
export default function MobileMenu({ open, onClose, openDropdown, onToggleDropdown, onSelectDropdownItem }) {
  return (
    <div className={`mobile-menu${open ? " open" : ""}`} id="mobile-menu" aria-hidden={!open}>
      <button type="button" className="mobile-menu-close" id="mobile-menu-close" aria-label="Close menu" onClick={onClose}>
        <CloseIcon />
      </button>
      <ul>
        {NAV.map((entry) =>
          entry.items ? (
            <Dropdown
              key={entry.id}
              as="li"
              id={`${entry.id}Mobile`}
              label={entry.label}
              items={entry.items}
              openId={openDropdown}
              onToggle={onToggleDropdown}
              onSelect={onSelectDropdownItem}
            />
          ) : (
            <li key={entry.label}>
              <NavLink to={entry.to} end={entry.to === "/"} onClick={onClose}>
                {entry.label}
              </NavLink>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
