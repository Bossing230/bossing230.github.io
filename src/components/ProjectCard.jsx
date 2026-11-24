import { Link } from "react-router-dom";
import { img } from "../utils/asset";
import Reveal from "./Reveal";

// variant "home": short summary, "View Project" goes to the Work page.
// variant "work": full description, "View Project" opens the live demo (hidden if none).
export default function ProjectCard({ project, variant = "work", delay }) {
  const { title, tag, image, summary, description, tech, demo, github } = project;
  const isHome = variant === "home";

  return (
    <Reveal as="article" delay={delay} className="project-card card">
      <div className="project-thumb">
        <span className="tag">{tag}</span>
        <img src={img(image)} alt={title} loading="lazy" />
      </div>
      <div className="project-body">
        <h3>{title}</h3>
        <p>{isHome ? summary : description}</p>
        <div className="tech-chips">
          {tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="project-actions">
          {isHome ? (
            <Link to="/work" className="btn btn-primary btn-sm">
              View Project
            </Link>
          ) : (
            demo && (
              <a href={demo} className="btn btn-primary btn-sm">
                View Project
              </a>
            )
          )}
          <a href={github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
            GitHub
          </a>
        </div>
      </div>
    </Reveal>
  );
}
