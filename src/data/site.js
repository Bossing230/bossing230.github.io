// All the site's content lives here so components stay generic and reusable.

export const SITE = {
  fullName: "Joseph Francis Rebamonte",
  brand: "Bossing",
  brandMark: "ER",
  tagline: "Building ideas into digital experiences.",
  email: "mj300635@gmail.com",
  phone: "+63 963 935 7306",
  location: "Tangub City, Misamis Occidental, Philippines",
  year: 2026,
};

// Copy the "action" URL from the <form> in your old contact.html and paste it
// here (it looks like https://formspree.io/f/xxxxxxxx).
export const FORM_ENDPOINT = "https://formspree.io/f/xnpdorge";

export const SOCIALS = [
  { id: "github", label: "GitHub", href: "https://github.com/Bossing230" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/joseph.single.31" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/kyutiseph/" },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/joseph-francis-rebamonte-126780428/",
  },
];

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    id: "services",
    label: "Services",
    items: [
      { label: "Web Development", to: "/work" },
      { label: "Mobile Development", to: "/work" },
      { label: "UI/UX Design", to: "/work" },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    items: [
      { label: "Restaurant Management System", to: "/work" },
      { label: "Food Delivery Application", to: "/work" },
      { label: "Personal Portfolio Website", to: "/work" },
    ],
  },
  { label: "Work", to: "/work" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_SITE_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Work", to: "/work" },
  { label: "Contact", to: "/contact" },
];

export const PROJECTS = [
  {
    id: "restaurant",
    title: "Restaurant Management System",
    tag: "Flutter · SQL",
    image: "restaurant-management.jpg",
    summary: "Reservations, menu management, orders, payments, and reports in one system.",
    description:
      "A complete system for managing restaurant operations reservations, menu management, live orders, payments, and reporting dashboards for staff.",
    tech: ["Flutter", "Dart", "SQL"],
    filters: ["flutter", "sql"],
    demo: "https://bossing230.github.io/Soft-Eng-RMS/",
    github: "https://github.com/Bossing230/Soft-Eng-RMS",
  },
  {
    id: "food-delivery",
    title: "Food Delivery Application",
    tag: "Flutter · Firebase",
    image: "food-delivery.jpg",
    summary: "User authentication, browsing, cart management, and live order tracking.",
    description:
      "A modern food ordering app with user authentication, restaurant/food browsing, cart management, and real-time order tracking.",
    tech: ["Flutter", "Dart", "Firebase"],
    filters: ["flutter", "firebase"],
    demo: null, // no live demo yet — set a URL here to show the "View Project" button on the Work page
    github: "https://github.com/Bossing230",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    tag: "HTML · CSS · JS",
    image: "profile_ss.png",
    summary: "A responsive personal portfolio showcasing skills, projects, and experience.",
    description:
      "A responsive personal portfolio showcasing my skills, projects, and experience the very site you're looking at now.",
    tech: ["HTML", "CSS", "JavaScript"],
    filters: ["web"],
    demo: "https://bossing230.github.io/",
    github: "https://github.com/Bossing230/bossing230.github.io",
  },
];

export const FILTERS = [
  { id: "all", label: "All" },
  { id: "flutter", label: "Flutter" },
  { id: "sql", label: "SQL" },
  { id: "firebase", label: "Firebase" },
  { id: "web", label: "Web" },
];

export const SKILLS = [
  { icon: "H", name: "HTML", level: 92 },
  { icon: "C", name: "CSS", level: 88 },
  { icon: "JS", name: "JavaScript", level: 80 },
  { icon: "Fl", name: "Flutter", level: 78 },
  { icon: "Dt", name: "Dart", level: 76 },
  { icon: "Jv", name: "Java", level: 70 },
  { icon: "Sq", name: "SQL", level: 82 },
  { icon: "Ux", name: "UI/UX Design", level: 74 },
  { icon: "Gt", name: "Git/GitHub", level: 85 },
];

export const TIMELINE = [
  {
    year: "2024 — Present",
    title: "Computer Science Student",
    text: "Coursework spanning programming fundamentals, databases, networking, and software engineering.",
  },
  {
    year: "2025",
    title: "Started building web & mobile applications",
    text: "Moved from tutorials to independent builds first static sites, then interactive apps.",
  },
  {
    year: "2026",
    title: "Academic & personal software projects",
    text: "Shipped a restaurant management system and a food delivery app as capstone-style projects.",
  },
  {
    year: "2028 — Ahead",
    title: "Seeking internship & collaborative work",
    text: "Looking to apply what I've built in a real team setting and keep growing as a full-stack developer.",
  },
];

export const ABOUT_META = [
  { label: "Based in", value: "Philippines" },
  { label: "Studying", value: "Computer Science" },
  { label: "Focus", value: "Web & Mobile Development" },
  { label: "Status", value: "Open to internships" },
];

export const VALUES = [
  { title: "Consistent", text: "Small, steady progress beats last minute sprints. I build in increments." },
  {
    title: "Detail-driven",
    text: "The last 10% spacing, states, edge cases is where quality actually lives.",
  },
  { title: "Curious", text: "I'd rather learn a new tool by breaking it in a sandbox than avoid it." },
];

export const WHAT_I_DO = [
  {
    icon: "code",
    title: "Frontend & Mobile",
    text: "HTML, CSS, JavaScript and Flutter/Dart for clean, responsive interfaces.",
  },
  {
    icon: "database",
    title: "Databases & Backend",
    text: "SQL schema design, Java, and Firebase-backed application logic.",
  },
  {
    icon: "design",
    title: "UI/UX & Git",
    text: "Wireframes to polished flows, versioned and shipped with Git/GitHub.",
  },
];

// Hero terminal: each line is a list of [token-class, text] pairs.
export const TERMINAL_LINES = [
  [["tok-kw", "const"], [null, " "], ["tok-prop", "developer"], [null, " "], ["tok-punc", "="], [null, " "], ["tok-punc", "{"]],
  [[null, "  "], ["tok-prop", "name"], ["tok-punc", ":"], [null, " "], ["tok-str", '"Joseph Francis Rebamonte"'], ["tok-punc", ","]],
  [[null, "  "], ["tok-prop", "role"], ["tok-punc", ":"], [null, " "], ["tok-str", '"Computer Science Student & Web Developer"'], ["tok-punc", ","]],
  [
    [null, "  "], ["tok-prop", "stack"], ["tok-punc", ":"], [null, " "], ["tok-punc", "["],
    ["tok-str", '"Flutter"'], ["tok-punc", ","], [null, " "], ["tok-str", '"JavaScript"'], ["tok-punc", ","], [null, " "],
    ["tok-str", '"SQL"'], ["tok-punc", "]"], ["tok-punc", ","],
  ],
  [[null, "  "], ["tok-prop", "loves"], ["tok-punc", ":"], [null, " "], ["tok-str", '"turning ideas into interfaces"']],
  [["tok-punc", "}"], ["tok-punc", ";"]],
  [["tok-fn", "deploy"], ["tok-punc", "("], ["tok-prop", "developer"], ["tok-punc", ")"], ["tok-punc", ";"]],
];

export const TERMINAL_STATS = [
  { value: "12+", label: "PROJECTS" },
  { value: "9", label: "SKILLS" },
  { value: "2028", label: "GRAD YEAR" },
];

export const HERO_GLYPHS = [
  { char: "{ }", style: { top: "14%", left: "6%", animationDelay: "0s" } },
  { char: "</>", style: { top: "70%", left: "10%", animationDelay: "2s", fontSize: "1.8rem" } },
  { char: ";", style: { top: "22%", left: "88%", animationDelay: "4s", fontSize: "1.6rem" } },
  { char: "#", style: { top: "80%", left: "82%", animationDelay: "1s" } },
];
