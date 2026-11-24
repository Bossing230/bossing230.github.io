import { useEffect, useState } from "react";
import { TERMINAL_LINES, TERMINAL_STATS } from "../data/site";
import Reveal from "./Reveal";

const PLAIN_LINES = TERMINAL_LINES.map((tokens) => tokens.map(([, text]) => text).join(""));

function StyledLine({ tokens }) {
  return (
    <div className="terminal-line">
      {tokens.map(([cls, text], i) => (cls ? <span key={i} className={cls}>{text}</span> : text))}
    </div>
  );
}

// "developer.js" window that types itself out line by line, then shows a blinking caret.
export default function Terminal() {
  const [doneCount, setDoneCount] = useState(0);
  const [partial, setPartial] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDoneCount(TERMINAL_LINES.length);
      return undefined;
    }

    let cancelled = false;
    let timer;
    let line = 0;
    let char = 0;
    setDoneCount(0);
    setPartial("");

    const tick = () => {
      if (cancelled || line >= PLAIN_LINES.length) return;
      if (char <= PLAIN_LINES[line].length) {
        // Type plain text one character at a time...
        setPartial(PLAIN_LINES[line].slice(0, char));
        char += 1;
        timer = setTimeout(tick, 14 + Math.random() * 18);
      } else {
        // ...then swap in the syntax-highlighted version of the finished line.
        line += 1;
        char = 0;
        setDoneCount(line);
        setPartial("");
        timer = setTimeout(tick, 160);
      }
    };
    tick();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const finished = doneCount >= TERMINAL_LINES.length;

  return (
    <Reveal className="terminal">
      <div className="terminal-bar">
        <span />
        <span />
        <span />
        <span className="file">developer.js</span>
      </div>
      <div className="terminal-body" id="terminal-type">
        {TERMINAL_LINES.slice(0, doneCount).map((tokens, i) => (
          <StyledLine key={i} tokens={tokens} />
        ))}
        {!finished && <div className="terminal-line">{partial}</div>}
        {finished && <span className="caret" />}
      </div>
      <div className="terminal-stats">
        {TERMINAL_STATS.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
