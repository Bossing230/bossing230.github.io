import { useEffect, useRef, useState } from "react";

// Returns [ref, inView]. inView flips to true once the element first scrolls
// into view and stays true (one-shot), like the original IntersectionObserver code.
export default function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // options is a constant per call site; observe once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}
