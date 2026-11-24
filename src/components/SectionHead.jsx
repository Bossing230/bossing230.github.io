import Reveal from "./Reveal";

export default function SectionHead({ label, title, text }) {
  return (
    <Reveal className="section-head">
      <p>{label}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}
