import useInView from "../hooks/useInView";

const TIMELINE_OPTIONS = { threshold: 0.3 };

function TimelineItem({ year, title, text }) {
  const [ref, inView] = useInView(TIMELINE_OPTIONS);

  return (
    <div ref={ref} className={`tl-item reveal${inView ? " in-view" : ""}`}>
      <div className="tl-year">{year}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <TimelineItem key={item.year} {...item} />
      ))}
    </div>
  );
}
