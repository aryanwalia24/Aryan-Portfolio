import React, { useState, useEffect, useRef } from "react";
import {
  personalInfo,
  experiences,
  projects,
  education,
  education12,
  skills,
  achievements,
  contacts,
  leetcode,
  hobbies,
} from "./constants";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  LeetcodeIcon,
} from "./components/Icons";

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("about");
  const sections = useRef<Map<string, HTMLElement | null>>(new Map());

  useEffect(() => {
    const canvas = document.getElementById(
      "neural-network-canvas",
    ) as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let particlesArray: any[] = [];
    const setDim = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setDim();
    const mouse = { x: null as number | null, y: null as number | null };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    window.addEventListener("mouseout", () => {
      mouse.x = null;
      mouse.y = null;
    });
    class Particle {
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;
      base: number;
      constructor(x: number, y: number, dx: number, dy: number, s: number) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = s;
        this.base = s;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(103,232,249,0.6)";
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
        if (mouse.x && mouse.y) {
          let d = Math.hypot(mouse.x - this.x, mouse.y - this.y);
          if (d < 80) {
            this.x -= ((mouse.x - this.x) / d) * 1.5;
            this.y -= ((mouse.y - this.y) / d) * 1.5;
            if (this.size < this.base * 2.5) this.size += 0.5;
          } else if (this.size > this.base) this.size -= 0.1;
        } else if (this.size > this.base) this.size -= 0.1;
        if (this.size < this.base) this.size = this.base;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }
    const init = () => {
      particlesArray = [];
      const n = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < n; i++)
        particlesArray.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 0.4 - 0.2,
            Math.random() * 0.4 - 0.2,
            Math.random() * 1.5 + 1,
          ),
        );
    };
    const connect = () => {
      for (let a = 0; a < particlesArray.length; a++)
        for (let b = a; b < particlesArray.length; b++) {
          let d =
            (particlesArray[a].x - particlesArray[b].x) ** 2 +
            (particlesArray[a].y - particlesArray[b].y) ** 2;
          if (d < (canvas.width / 7) * (canvas.height / 7)) {
            ctx.strokeStyle = `rgba(103,232,249,${(1 - d / 20000) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
    };
    let raf: number;
    const animate = () => {
      ctx.fillStyle = "#172554";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((p) => p.update());
      connect();
      raf = requestAnimationFrame(animate);
    };
    window.addEventListener("resize", () => {
      setDim();
      init();
    });
    init();
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -70% 0px" },
    );
    [
      "about",
      "experience",
      "projects",
      "skills",
      "education",
      "achievements",
      "hobbies",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        sections.current.set(id, el);
        observer.observe(el);
      }
    });
    return () => {
      sections.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animate-fade-in-up");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05 },
    );
    document.querySelectorAll(".scroll-target").forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "achievements", label: "Achievements" },
    { id: "hobbies", label: "Hobbies" },
  ];

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const margin = parseInt(window.getComputedStyle(el).scrollMarginTop, 10);
    const target = el.getBoundingClientRect().top + window.pageYOffset - margin;
    const start = window.pageYOffset;
    const dist = target - start;
    let t0: number | null = null;
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / 800, 1);
      window.scrollTo(0, start + dist * ease(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="min-h-screen text-slate-300 font-sans leading-relaxed animate-fade-in">
      <div className="max-w-screen-xl mx-auto px-6 py-6 md:px-12 lg:px-16 lg:flex lg:justify-between lg:gap-16">
        {/* Left Panel */}
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-2/5 lg:flex-col lg:justify-between lg:py-16">
          <div>
            <img
              src="/profile.jpeg"
              alt="Aryan Walia"
              className="w-32 h-32 rounded-full object-cover border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(103,232,249,0.25)] mb-4 hover:scale-110 hover:shadow-[0_0_30px_rgba(103,232,249,0.4)] transition-all duration-300 cursor-pointer"
            />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-200">
              Aryan <span className="text-cyan-300">Walia</span>
            </h1>
            <h2 className="mt-3 text-lg sm:text-xl font-medium text-cyan-400">
              {personalInfo.title}
            </h2>
            <a
              href={leetcode.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-md bg-sky-950/50 border border-cyan-400/10 hover:bg-sky-900/60 hover:scale-105 transition-all"
            >
              <LeetcodeIcon />
              <span className="text-xs text-slate-200 font-medium">
                LeetCode
              </span>
              <span className="text-xs text-cyan-400">
                {leetcode.rating} · {leetcode.problems} solved
              </span>
            </a>
            <p className="mt-4 max-w-xs text-base text-slate-400">
              Building production microservices & cloud-native systems.
            </p>
            <nav className="hidden lg:block mt-10">
              <ul className="w-max">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="group flex items-center py-2"
                    >
                      <span
                        className={`mr-4 h-px w-8 bg-slate-500 transition-all group-hover:w-16 group-hover:bg-cyan-300 ${activeSection === item.id ? "w-16 bg-cyan-300" : ""}`}
                      ></span>
                      <span
                        className={`text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-cyan-300 ${activeSection === item.id ? "text-cyan-300" : ""}`}
                      >
                        {item.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        {/* Right Content */}
        <main className="pt-12 lg:pt-0 lg:w-3/5 lg:py-16">
          {/* About */}
          <section
            id="about"
            className="mb-10 scroll-mt-16 lg:mb-16 lg:scroll-mt-24 scroll-target p-5 rounded-lg hover:bg-sky-950/30 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-5">
              About
            </h3>
            <div className="text-slate-300 leading-relaxed text-sm space-y-3">
              <p>
                I'm a Software Engineer at{" "}
                <span className="text-cyan-300 font-medium">
                  Gracenote (Nielsen)
                </span>{" "}
                where I build and ship{" "}
                <span className="text-cyan-300 font-medium">
                  production microservices
                </span>{" "}
                that power content platforms at scale.
              </p>
              <p>
                My day-to-day involves designing{" "}
                <span className="text-cyan-300 font-medium">
                  AWS infrastructure
                </span>
                , writing{" "}
                <span className="text-cyan-300 font-medium">FastAPI</span> and{" "}
                <span className="text-cyan-300 font-medium">Spring Boot</span>{" "}
                services, and building{" "}
                <span className="text-cyan-300 font-medium">
                  AI agent workflows
                </span>{" "}
                with LLM integrations and MCP servers. I handle the full
                lifecycle — from architecture decisions to deployment,
                observability, and on-call support.
              </p>
              <p>
                I'm equally comfortable containerizing services with{" "}
                <span className="text-cyan-300 font-medium">
                  Docker & Kubernetes
                </span>
                , setting up{" "}
                <span className="text-cyan-300 font-medium">
                  CI/CD pipelines
                </span>
                , migrating legacy systems with zero data loss, or debugging
                production incidents using{" "}
                <span className="text-cyan-300 font-medium">
                  Grafana, Prometheus & OpenTelemetry
                </span>
                .
              </p>
              <p>
                Outside work, I sharpen my problem-solving through competitive
                programming and stay curious about{" "}
                <span className="text-cyan-300 font-medium">system design</span>{" "}
                and{" "}
                <span className="text-cyan-300 font-medium">
                  cloud-native architecture
                </span>
                .
              </p>
            </div>

            {/* Contact */}
            <h4 className="text-lg font-bold text-cyan-300 mt-8 mb-3">
              Contact
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {contacts.map((c, i) => (
                <a
                  key={i}
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 p-3 rounded-md bg-sky-950/50 hover:bg-sky-900/60 hover:scale-[1.02] transition-all border border-cyan-400/10"
                >
                  {c.name === "GitHub" ? (
                    <GithubIcon className="h-4 w-4" />
                  ) : c.name === "LinkedIn" ? (
                    <LinkedinIcon className="h-4 w-4" />
                  ) : (
                    <MailIcon className="h-4 w-4" />
                  )}
                  <div>
                    <p className="font-semibold text-slate-200 text-xs">
                      {c.name}
                    </p>
                    <p className="text-xs text-cyan-400 truncate">{c.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section
            id="experience"
            className="mb-10 scroll-mt-16 lg:mb-16 lg:scroll-mt-24"
          >
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-6 scroll-target">
              Experience
            </h3>
            <div className="relative border-l-2 border-cyan-400/20">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="mb-8 scroll-target group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute w-4 h-4 bg-slate-700 rounded-full mt-1.5 -left-2 border border-cyan-400/80 group-hover:bg-cyan-300 transition-colors duration-300 group-hover:shadow-[0_0_15px_3px_rgba(103,232,249,0.5)]"></div>
                  <div className="pl-8 relative">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition lg:-inset-x-6 lg:block lg:group-hover:bg-sky-950/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]"></div>
                    <div className="relative">
                      <header className="mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {exp.period}
                      </header>
                      <h3 className="text-slate-200">
                        <span className="font-bold text-lg">{exp.role}</span>
                        <span className="text-slate-400"> · </span>
                        <span className="font-bold text-lg text-cyan-300">
                          {exp.company}
                        </span>
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        {exp.location}
                      </p>
                      <ul className="mt-3 list-disc list-outside pl-4 space-y-1.5">
                        {exp.points.map((p, i) => (
                          <li key={i} className="text-sm text-slate-300">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section
            id="projects"
            className="mb-10 scroll-mt-16 lg:mb-16 lg:scroll-mt-24"
          >
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-6 scroll-target">
              Projects
            </h3>
            <div className="relative border-l-2 border-cyan-400/20">
              {projects.map((proj, index) => (
                <div
                  key={index}
                  className="mb-8 scroll-target group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute w-4 h-4 bg-slate-700 rounded-full mt-1.5 -left-2 border border-cyan-400/80 group-hover:bg-cyan-300 transition-colors duration-300 group-hover:shadow-[0_0_15px_3px_rgba(103,232,249,0.5)]"></div>
                  <div className="pl-8 relative">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition lg:-inset-x-6 lg:block lg:group-hover:bg-sky-950/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]"></div>
                    <div className="relative">
                      <header className="mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {proj.period}
                      </header>
                      <h3 className="font-bold text-lg text-cyan-300">
                        {proj.name}
                      </h3>
                      <p className="mt-2 text-sm text-slate-300">
                        {proj.description}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {proj.tech.map((t, i) => (
                          <li key={i}>
                            <div className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                              {t}
                            </div>
                          </li>
                        ))}
                      </ul>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center mt-3 text-sm text-slate-300 hover:text-cyan-300 transition-colors"
                        >
                          <GithubIcon className="h-4 w-4 mr-1.5" />
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section
            id="skills"
            className="mb-10 scroll-mt-16 lg:mb-16 lg:scroll-mt-24 scroll-target p-5 rounded-lg hover:bg-sky-950/30 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-6">
              Skills
            </h3>
            <div className="space-y-5">
              {skills.map((cat, i) => (
                <div key={i}>
                  <h4 className="font-bold text-cyan-300 text-sm mb-2">
                    {cat.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, j) => (
                      <div
                        key={j}
                        className="bg-cyan-400/10 text-cyan-300 text-xs font-medium px-3 py-1.5 rounded-md hover:bg-cyan-400/20 hover:scale-105 transition-all cursor-default"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section
            id="education"
            className="mb-10 scroll-mt-16 lg:mb-16 lg:scroll-mt-24 scroll-target p-5 rounded-lg hover:bg-sky-950/30 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-5">
              Education
            </h3>
            <div className="space-y-3">
              <div className="rounded-md p-5 bg-sky-950/50 border border-cyan-400/10 hover:border-cyan-400/30 transition-colors">
                <p className="text-base font-semibold text-cyan-300">
                  {education.degree}
                </p>
                <p className="text-slate-300 text-sm">{education.university}</p>
                <p className="text-slate-400 text-xs mt-1">
                  {education.period} · {education.location}
                </p>
              </div>
              <div className="rounded-md p-5 bg-sky-950/50 border border-cyan-400/10 hover:border-cyan-400/30 transition-colors">
                <p className="text-base font-semibold text-cyan-300">
                  {education12.board}
                </p>
                <p className="text-slate-300 text-sm">{education12.school}</p>
                <p className="text-slate-400 text-xs mt-1">
                  {education12.period}
                </p>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section
            id="achievements"
            className="mb-10 scroll-mt-16 lg:mb-16 lg:scroll-mt-24 scroll-target p-5 rounded-lg hover:bg-sky-950/30 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-5">
              Achievements
            </h3>
            <ul className="list-disc list-outside pl-4 space-y-2">
              {achievements.map((a, i) => (
                <li key={i} className="text-sm text-slate-300">
                  {a}
                </li>
              ))}
            </ul>
          </section>

          {/* Hobbies */}
          <section
            id="hobbies"
            className="scroll-mt-16 lg:scroll-mt-24 scroll-target p-5 rounded-lg hover:bg-sky-950/30 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-5">
              Hobbies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {hobbies.map((h, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-sky-950/50 border border-cyan-400/10 hover:border-cyan-400/40 hover:bg-sky-900/60 hover:scale-110 hover:shadow-[0_0_20px_rgba(103,232,249,0.15)] transition-all duration-300 cursor-default"
                >
                  <span className="text-2xl mb-1">{h.emoji}</span>
                  <span className="text-xs font-medium text-slate-300">
                    {h.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
