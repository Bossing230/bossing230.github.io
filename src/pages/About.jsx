import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import SkillCard from "../components/SkillCard";
import Timeline from "../components/Timeline";
import { ABOUT_META, SKILLS, TIMELINE, VALUES } from "../data/site";
import usePageMeta from "../hooks/usePageMeta";
import { img } from "../utils/asset";

export default function About() {
  usePageMeta(
    "Learn about Joseph — Computer Science student, aspiring developer, skills, education timeline, and work ethics."
  );

  return (
    <>
      <PageHero
        eyebrow="ABOUT ME"
        title="The person behind the code."
        text="A bit of my story, what I've studied, what I'm building toward, and the skills I bring to a team."
      />

      <section style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="about-grid">
            <Reveal className="about-photo-wrap">
              <div className="avatar-card">
                <img src={img("profiel_picture.jpg")} alt="Profile Picture" />
              </div>
              <div className="about-meta">
                {ABOUT_META.map(({ label, value }) => (
                  <div className="meta-row" key={label}>
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="about-copy" delay={1}>
              <h1>Hi, I'm Joseph.</h1>
              <p className="about-role">Computer Science Student · Aspiring Full-Stack Developer · UI/UX Enthusiast</p>

              <p>
                I'm a Computer Science student who genuinely enjoys the process of turning a blank screen into
                something people can actually use a form that validates itself, a dashboard that finally
                makes sense of messy data, an app that feels quick and calm to use. That satisfaction is what
                pulled me from "interested in computers" to <strong>building software on purpose</strong>.
              </p>
              <p>
                My education has been hands-on from the start: coursework in databases, programming
                fundamentals, and software engineering, paired with self-driven projects where I actually ship
                something at the end. I like learning by building, not just reading about it.
              </p>
              <p>
                Looking ahead, my goal is to grow into a <strong>full-stack developer</strong> who's equally
                comfortable designing a clean interface and structuring the database behind it and
                eventually contribute to products used by real people, not just graded by a rubric.
              </p>
              <p>
                Outside of coding, I'm into UI/UX rabbit holes, sketching layout ideas before I ever open an
                editor, and the occasional late-night refactor that "will only take five minutes."
              </p>

              <div className="philosophy-strip">
                {VALUES.map(({ title, text }) => (
                  <div className="item" key={title}>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="skills-block">
            <SectionHead label="SKILLS" title="What I work with" />
            <div className="skills-grid">
              {SKILLS.map((skill) => (
                <SkillCard key={skill.name} {...skill} />
              ))}
            </div>
          </div>

          <div className="timeline-block">
            <SectionHead label="JOURNEY" title="Education & experience" />
            <Timeline items={TIMELINE} />
          </div>
        </div>
      </section>
    </>
  );
}
