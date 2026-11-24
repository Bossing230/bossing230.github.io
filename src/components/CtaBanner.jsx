import { Link } from "react-router-dom";
import Reveal from "./Reveal";

export default function CtaBanner({ title, text, to = "/contact", button = "Contact Me" }) {
  return (
    <Reveal className="cta-banner">
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <Link to={to} className="btn btn-primary">
        {button}
      </Link>
    </Reveal>
  );
}
