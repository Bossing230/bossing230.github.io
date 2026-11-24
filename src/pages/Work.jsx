import { useState } from "react";
import CtaBanner from "../components/CtaBanner";
import PageHero from "../components/PageHero";
import ProjectCard from "../components/ProjectCard";
import { FILTERS, PROJECTS } from "../data/site";
import usePageMeta from "../hooks/usePageMeta";

export default function Work() {
  usePageMeta("Selected projects by Joseph: a restaurant management system, a food delivery app, and a personal portfolio site.");

  const [filter, setFilter] = useState("all");
  const visible = PROJECTS.filter((p) => filter === "all" || p.filters.includes(filter));

  return (
    <>
      <PageHero
        eyebrow="SELECTED WORK"
        title="Projects I've designed, built, and shipped."
        text="A mix of academic and personal builds spanning mobile apps, systems design, and front-end interfaces."
      />

      <section style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="work-filter" role="group" aria-label="Filter projects">
            {FILTERS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`filter-btn${filter === id ? " active" : ""}`}
                aria-pressed={filter === id}
                onClick={() => setFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} variant="work" delay={(i % 3) + 1} />
            ))}
          </div>

          <CtaBanner
            title="Want to see more, or build something together?"
            text="More project write-ups are on GitHub or reach out directly."
          />
        </div>
      </section>
    </>
  );
}
