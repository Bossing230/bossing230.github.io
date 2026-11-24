import useInView from "../hooks/useInView";

const REVEAL_OPTIONS = { threshold: 0.15, rootMargin: "0px 0px -60px 0px" };

// Wraps any element with the fade/slide-in-on-scroll animation.
// `as` picks the tag, `delay` (1-4) staggers siblings.
export default function Reveal({ as: Tag = "div", delay, className = "", children, ...rest }) {
  const [ref, inView] = useInView(REVEAL_OPTIONS);
  const classes = ["reveal", delay ? `reveal-delay-${delay}` : "", inView ? "in-view" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
