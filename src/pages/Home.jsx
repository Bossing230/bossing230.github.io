import { Link } from "react-router-dom";
import CtaBanner from "../components/CtaBanner";
import { FEATURE_ICONS } from "../components/Icons";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import SocialLinks from "../components/SocialLinks";
import Terminal from "../components/Terminal";
import { HERO_GLYPHS, PROJECTS, WHAT_I_DO } from "../data/site";
import usePageMeta from "../hooks/usePageMeta";

const FEATURED = PROJECTS.slice(0, 2);

export default function Home() {
  usePageMeta(
    "Portfolio of Joseph, a Computer Science student and aspiring full-stack developer building clean, modern digital experiences."
  );

  return (
    <>
      <section className="hero">
        <div className="glyphs" aria-hidden="true">
          {HERO_GLYPHS.map((glyph) => (
            <span key={glyph.char} style={glyph.style}>
              {glyph.char}
            </span>
          ))}
        </div>

        <div className="container">
          <div className="hero-copy">
            <p className="hero-kicker">
              <span className="pulse" /> AVAILABLE FOR INTERNSHIP &amp; FREELANCE WORK
            </p>
            <h1>
              <span className="line">Hello, I'm</span>
              <span className="line grad-text">
                Joseph Francis <br /> Rebamonte
              </span>
            </h1>
            <p className="hero-lede">
              I'm a passionate web &amp; mobile developer who loves creating modern, user-friendly digital
              experiences from database driven systems to clean, responsive interfaces. Currently studying
              Computer Science and building real things along the way.
            </p>

            <div className="hero-cta">
              <Link to="/work" className="btn btn-primary">
                View My Work
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Contact Me
              </Link>
            </div>

            <SocialLinks className="hero-socials" label="Social media links" />
          </div>

          <Terminal />
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHead
            label="WHAT I DO"
            title="I build software that people actually enjoy using."
            text="A snapshot of where my skills currently sit see the full breakdown, timeline, and story on the About page."
          />
          <div className="philosophy-strip">
            {WHAT_I_DO.map(({ icon, title, text }, i) => {
              const Icon = FEATURE_ICONS[icon];
              return (
                <Reveal key={title} className="item" delay={i + 1}>
                  <div className="icon">
                    <Icon />
                  </div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHead
            label="SELECTED WORK"
            title="A few things I've built recently."
            text="From restaurant systems to food delivery apps see the full case list on the Work page."
          />
          <div className="projects-grid">
            {FEATURED.map((project, i) => (
              <ProjectCard key={project.id} project={project} variant="home" delay={i + 1} />
            ))}
          </div>

          <CtaBanner
            title="Have a project in mind?"
            text="I'm currently open to internships, freelance builds, and collaborations."
          />
        </div>
      </section>
    </>
  );
}
