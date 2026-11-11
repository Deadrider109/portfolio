
import { useState, useEffect, lazy, Suspense } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring
} from "framer-motion";

import {
  ArrowDown,
  ArrowUpRight,
  Menu,
  X,
  Mail,
  Palette,
  Layers,
  Megaphone,
  Cpu,
  MoveUpRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import CursorTrail from "./CursorTrail";
import projects from "./data/projects";
import "./App.css";

const HeroScene = lazy(() => import("./HeroScene"));

const EMAIL = "tasinstu0191@gmail.com";

const SOCIALS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/t4sin.exe/",
    mark: "◎"
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/tasin.109/",
    mark: "f"
  }
];

const skills = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe Premiere Pro",
  "Adobe After Effects",
  "Social Media Management",
  "Creative Direction",
  "Visual Communication",
  "Graphic Design"
];

const services = [
  {
    icon: <Palette />,
    title: "Graphic Design",
    text: "Posters, promotional graphics, visual compositions and creative campaigns."
  },
  {
    icon: <Megaphone />,
    title: "Social Media",
    text: "Creative content, social media management and digital storytelling."
  },
  {
    icon: <Layers />,
    title: "Visual Branding",
    text: "Consistent visual communication and identity development."
  },
  {
    icon: <Cpu />,
    title: "Creative Technology",
    text: "Exploring the intersection of technology and visual creativity."
  }
];

const experience = [
  ["2026 — PRESENT", "Chairperson", "IEEE Robotics & Automation Society, IUB SBC"],
  ["2025 — 2026", "Secretary", "IEEE Robotics & Automation Society, IUB SBC"],
  ["2024 — 2025", "Technical Coordinator", "IEEE IUB Student Branch"],
  ["2024 — PRESENT", "Graphic Designer & Social Media Manager", "IEEE IUB Student Branch"]
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.title = "Tasnimul Hasan Tasin — Creative Portfolio";

    let description = document.querySelector('meta[name="description"]');

    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }

    description.content =
      "Portfolio of Tasnimul Hasan Tasin — Graphic Designer and Social Media Manager.";
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = selectedProject ? "hidden" : "";

    const handleKey = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }

      if (!selectedProject || !projects.length) return;

      const index = projects.findIndex(
        project => project.id === selectedProject.id
      );

      if (event.key === "ArrowRight") {
        setSelectedProject(projects[(index + 1) % projects.length]);
      }

      if (event.key === "ArrowLeft") {
        setSelectedProject(
          projects[(index - 1 + projects.length) % projects.length]
        );
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(project => project.category === activeFilter);

  const changeProject = (direction) => {
    if (!selectedProject || !projects.length) return;

    const index = projects.findIndex(
      project => project.id === selectedProject.id
    );

    const next = (index + direction + projects.length) % projects.length;
    setSelectedProject(projects[next]);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <CursorTrail />

      <nav className="navbar">
        <a href="#home" className="logo" onClick={closeMenu}>
          TASIN<span>.</span>
        </a>

        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {["About", "Work", "Services", "Experience", "Contact"].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={closeMenu}
            >
              {item}
            </a>
          ))}
        </div>

        <a href="#contact" className="nav-cta">
          Let's talk <ArrowUpRight size={16} />
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <main>
        <section className="hero section" id="home">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="eyebrow">
                <span className="status-dot" />
                GRAPHIC DESIGNER & CREATIVE
              </span>

              <h1>
                Creating<br />
                beyond the <span>ordinary.</span>
              </h1>

              <p className="hero-description">
                I'm Tasnimul Hasan Tasin — a graphic designer and
                visual storyteller turning ideas into meaningful
                visual experiences.
              </p>

              <div className="hero-actions">
                <a href="#work" className="primary-button">
                  Explore my work <ArrowUpRight size={18} />
                </a>

                <a href="#about" className="text-button">
                  Discover more <ArrowDown size={16} />
                </a>
              </div>
            </motion.div>
          </div>

          <div className="hero-visual">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />

            <div className="hero-canvas">
              <Suspense fallback={<div className="hero-scene-fallback" />}>
                <HeroScene />
              </Suspense>
            </div>

            <span className="visual-label label-top">CREATIVITY / 001</span>
            <span className="visual-label label-bottom">DESIGNING THE UNSEEN</span>
          </div>

          <div className="hero-bottom">
            <span>SCROLL TO EXPLORE</span>
            <span>23°48' N — DHAKA, BD</span>
          </div>
        </section>

        <section className="about section" id="about">
          <div className="section-kicker">01 / ABOUT ME</div>

          <div className="about-layout">
            <h2>
              Design is not just what I do. It's{" "}
              <span>how I see the world.</span>
            </h2>

            <div className="about-copy">
              <p>
                I'm a graphic designer and social media manager
                passionate about transforming ideas into compelling
                visual stories.
              </p>

              <p>
                Alongside pursuing Electrical and Electronic Engineering
                at Independent University, Bangladesh, I explore
                creativity through design, technology and leadership.
              </p>

              <a href="#contact" className="inline-link">
                Let's create something <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div className="stats-grid">
            <div><strong>02<span>+</span></strong><small>Years of creativity</small></div>
            <div><strong>03</strong><small>Leadership roles</small></div>
            <div><strong>∞</strong><small>Ideas to explore</small></div>
          </div>
        </section>

        <section className="work section" id="work">
          <div className="section-kicker">02 / SELECTED WORK</div>

          <div className="section-heading">
            <h2>My work. <span>My creativity.</span></h2>
            <p>A collection of my visual creations and design explorations.</p>
          </div>

          <div className="filter-list">
            {["All", "Graphic Design"].map(filter => (
              <button
                key={filter}
                className={activeFilter === filter ? "filter active" : "filter"}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  layout
                  key={project.id}
                  className="project-card"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.035 }}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={event => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${project.title}`}
                >
                  <div className="project-art">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                    />

                    <span className="project-number">
                      {String(project.id).padStart(2, "0")}
                    </span>

                    <span className="project-view">
                      VIEW PROJECT <MoveUpRight size={18} />
                    </span>
                  </div>

                  <div className="project-info">
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.category}</p>
                    </div>

                    <span>
                      {String(project.id).padStart(2, "0")} / {projects.length}
                    </span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <p className="project-note">
            A visual archive of my creative work.
          </p>
        </section>

        <section className="services section" id="services">
          <div className="section-kicker">03 / WHAT I DO</div>

          <div className="section-heading">
            <h2>Ideas into <span>visual experiences.</span></h2>
          </div>

          <div className="service-list">
            {services.map((service, index) => (
              <div className="service-item" key={service.title}>
                <span className="service-index">0{index + 1}</span>
                <span className="service-icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <ArrowUpRight className="service-arrow" />
              </div>
            ))}
          </div>
        </section>

        <section className="experience section" id="experience">
          <div className="section-kicker">04 / EXPERIENCE & EDUCATION</div>

          <div className="section-heading">
            <h2>Learning. Leading. <span>Creating.</span></h2>
          </div>

          <div className="timeline">
            {experience.map((item, index) => (
              <div className="timeline-item" key={index}>
                <span>{item[0]}</span>
                <div>
                  <h3>{item[1]}</h3>
                  <p>{item[2]}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="education-block">
            <h3>Education</h3>

            <div className="education-item">
              <span>2023 — PRESENT</span>
              <div>
                <strong>B.Sc. in Electrical & Electronic Engineering</strong>
                <p>Independent University, Bangladesh</p>
              </div>
            </div>

            <div className="education-item">
              <span>2022</span>
              <div>
                <strong>Higher Secondary Certificate — Science</strong>
                <p>Notre Dame College, Mymensingh</p>
              </div>
            </div>

            <div className="education-item">
              <span>2022</span>
              <div>
                <strong>Secondary School Certificate — Science</strong>
                <p>Adarsha School, Narayanganj</p>
              </div>
            </div>
          </div>
        </section>

        <section className="skills section">
          <div className="section-kicker">05 / MY TOOLKIT</div>

          <div className="section-heading">
            <h2>Tools of my <span>trade.</span></h2>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <span key={skill} style={{ "--i": index }}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="section-kicker">06 / GET IN TOUCH</div>

          <p className="contact-overline">
            HAVE AN IDEA? LET'S MAKE IT HAPPEN.
          </p>

          <h2>
            Let's create<br />
            something <span>remarkable.</span>
          </h2>

          <a href={`mailto:${EMAIL}`} className="contact-button">
            Say hello <Mail size={18} />
          </a>

          <p className="contact-note">
            Available for creative collaborations and opportunities.
          </p>

          <div className="contact-socials">
            {SOCIALS.map(({ name, url, mark }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${name} profile`}
              >
                <span className="social-mark">{mark}</span>
                <span>{name}</span>
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>

          <a href={`mailto:${EMAIL}`} className="contact-email">
            {EMAIL}
          </a>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="logo">TASIN<span>.</span></a>
        <p>Designed with curiosity. Built with creativity.</p>
        <span>© 2026 TASNIMUL HASAN TASIN</span>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <button
              className="lightbox-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close preview"
            >
              <X />
            </button>

            <button
              className="lightbox-prev"
              onClick={event => {
                event.stopPropagation();
                changeProject(-1);
              }}
              aria-label="Previous image"
            >
              <ChevronLeft />
            </button>

            <motion.div
              className="lightbox-content"
              key={selectedProject.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={event => event.stopPropagation()}
            >
              <img src={selectedProject.image} alt={selectedProject.title} />

              <div className="lightbox-caption">
                <span>{selectedProject.title}</span>
                <span>
                  {selectedProject.category} · {selectedProject.id} / {projects.length}
                </span>
              </div>
            </motion.div>

            <button
              className="lightbox-next"
              onClick={event => {
                event.stopPropagation();
                changeProject(1);
              }}
              aria-label="Next image"
            >
              <ChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
