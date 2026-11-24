import { Link } from "react-router-dom";
import { CaretIcon } from "./Icons";

// One nav dropdown. Open/closed state lives in the parent (`openId`) so that
// opening one dropdown closes the others, and an outside click closes all.
// `as` lets the same component render as <div> (desktop nav) or <li> (mobile menu).
export default function Dropdown({ as: Tag = "div", id, label, items, openId, onToggle, onSelect }) {
  const isOpen = openId === id;

  return (
    <Tag className="dropdown">
      <button
        type="button"
        className="dropdown-toggle"
        id={`${id}Btn`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => onToggle(id)}
      >
        {label} <CaretIcon className={`dropdown-caret${isOpen ? " rotated" : ""}`} />
      </button>
      <ul className={`dropdown-menu${isOpen ? " show" : ""}`} id={`${id}Menu`}>
        {items.map((item) => (
          <li key={item.label}>
            <Link to={item.to} onClick={onSelect}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </Tag>
  );
}
