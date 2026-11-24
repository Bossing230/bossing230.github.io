import { SOCIALS } from "../data/site";
import { SOCIAL_ICONS } from "./Icons";

// Row of icon buttons. `only` limits which networks show; `external` opens in a new tab.
export default function SocialLinks({ className, only, external = false, label = "Social media links" }) {
  const items = only ? SOCIALS.filter((s) => only.includes(s.id)) : SOCIALS;

  return (
    <div className={className} aria-label={label}>
      {items.map(({ id, label: name, href }) => {
        const Icon = SOCIAL_ICONS[id];
        return (
          <a
            key={id}
            className="social-btn"
            href={href}
            aria-label={name}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
