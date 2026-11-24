import ContactForm from "../components/ContactForm";
import { MailIcon, PhoneIcon, PinIcon } from "../components/Icons";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SocialLinks from "../components/SocialLinks";
import { SITE } from "../data/site";
import usePageMeta from "../hooks/usePageMeta";

const INFO = [
  { Icon: MailIcon, label: "Email", value: SITE.email },
  { Icon: PhoneIcon, label: "Phone", value: SITE.phone },
  { Icon: PinIcon, label: "Location", value: SITE.location },
];

export default function Contact() {
  usePageMeta("Get in touch with Joseph for internships, freelance projects, or collaboration.");

  return (
    <>
      <PageHero
        eyebrow="GET IN TOUCH"
        title="Let's Work Together"
        text="Have an internship opening, a project idea, or just want to say hi? My inbox is open — I try to reply within a day or two."
      />

      <section style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="contact-grid">
            <Reveal>
              <h2>Contact information</h2>
              <p className="muted" style={{ marginTop: 10 }}>
                Prefer email or a quick message on social whatever's easiest for you.
              </p>

              <div className="contact-info-list">
                {INFO.map(({ Icon, label, value }) => (
                  <div className="info-card card" key={label}>
                    <div className="info-icon">
                      <Icon />
                    </div>
                    <div>
                      <div className="label">{label}</div>
                      <div className="value">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <SocialLinks className="contact-socials" external />
            </Reveal>

            <Reveal className="form-card card" delay={1}>
              <h2 style={{ fontSize: "1.5rem" }}>Send a message</h2>
              <p className="muted" style={{ margin: "8px 0 28px" }}>
                Fill in the form below I'll get back to you by email.
              </p>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
