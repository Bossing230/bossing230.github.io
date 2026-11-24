import useInView from "../hooks/useInView";

const SKILL_OPTIONS = { threshold: 0.4 };

// Progress bar fills to `level`% the first time the card scrolls into view.
export default function SkillCard({ icon, name, level }) {
  const [ref, inView] = useInView(SKILL_OPTIONS);

  return (
    <div className="skill-card" ref={ref}>
      <div className="skill-top">
        <span className="name">
          <span className="skill-icon">{icon}</span>
          {name}
        </span>
        <span className="pct">{level}%</span>
      </div>
      <div className="skill-bar" role="progressbar" aria-label={name} aria-valuenow={level} aria-valuemin={0} aria-valuemax={100}>
        <div className="skill-fill" style={{ width: inView ? `${level}%` : "0%" }} />
      </div>
    </div>
  );
}
