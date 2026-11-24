import { Link } from "react-router-dom";
import { FOOTER_SITE_LINKS, SITE, SOCIALS } from "../data/site";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>{SITE.fullName}</h3>
            <p>{SITE.tagline}</p>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h4>Site</h4>
              <ul>
                {FOOTER_SITE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Elsewhere</h4>
              <ul>
                {SOCIALS.map((social) => (
                  <li key={social.id}>
                    <a href={social.href}>{social.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {SITE.year} {SITE.fullName}. All Rights Reserved.
          </p>
          <SocialLinks className="footer-socials" only={["github", "linkedin"]} external />
        </div>
      </div>
    </footer>
  );
}
