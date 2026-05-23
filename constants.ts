import {
  PersonalInfo,
  Experience,
  Project,
  Education,
  SkillCategory,
  CodingProfile,
} from "./types";

export const personalInfo: PersonalInfo = {
  name: "Aryan Walia",
  title: "MTS-1, Gracenote - A Nielsen Company, Bangalore",
  email: "aryanwalia2303@gmail.com",
  links: {
    portfolio: "https://aryan-portfolio-eight-omega.vercel.app",
    linkedin: "https://www.linkedin.com/in/aryan-walia24",
    github: "https://github.com/aryanwalia24",
  },
};

export const contacts: CodingProfile[] = [
  {
    name: "GitHub",
    handle: "@aryanwalia24",
    link: "https://github.com/aryanwalia24",
  },
  {
    name: "LinkedIn",
    handle: "@aryan-walia24",
    link: "https://www.linkedin.com/in/aryan-walia24",
  },
  {
    name: "Email",
    handle: "aryanwalia2303@gmail.com",
    link: "mailto:aryanwalia2303@gmail.com",
  },
];

export const leetcode = {
  handle: "@aryanwalia",
  link: "https://leetcode.com/u/aryanwalia/?year=2024",
  rating: "1650+",
  problems: "700+",
};

export const experiences: Experience[] = [
  {
    company: "Gracenote – A Nielsen Company",
    role: "Software Engineer Intern",
    period: "Feb 2025 - Aug 2026",
    location: "Bangalore, India",
    points: [
      "Developed and maintained high-performance applications for over 1 year, leveraging expertise in FastAPI, LLM models, and Spring Boot microservices.",
      "Built AI agent workflows leveraging MCP servers for automated content enrichment, integrating LLM models with production services.",
      "Designed and deployed AWS infrastructure (EC2, S3, RDS, CloudWatch), participating in architecture meetings to drive system design decisions for scalable, secure services.",
      "Led migration of legacy tech stacks and Ubuntu upgradation to remediate security vulnerabilities, executing database migrations with zero data loss across production environments.",
      "Containerized and orchestrated services using Docker, Kubernetes, and Rancher on AWS, managing end-to-end CI/CD pipelines and on-call production support.",
      "Implemented observability with OpenTelemetry, Grafana, and Prometheus, proactively identifying and resolving production issues through early anomaly detection and log analysis.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Content-Editorial Metadata Enrichment",
    period: "2025",
    description:
      "Developed a robust backend system with CI/CD pipeline flow and gateway service for efficient deployment and traffic management. Integrated comprehensive observability and metrics (business-driven and application-driven) to facilitate data-informed decision-making, in close collaboration with product teams.",
    tech: ["Spring Boot", "CI/CD", "OpenTelemetry", "Microservices"],
  },
  {
    name: "LLM-Powered Service",
    period: "2025",
    description:
      "Built FastAPI services integrating LLM models for metadata enrichment workflows, processing large-scale data. Designed agentic AI workflows for automated content classification and enrichment pipelines.",
    tech: ["FastAPI", "Python", "LLM APIs", "Agentic AI"],
  },
  {
    name: "Poker Game Engine",
    period: "2024",
    link: "https://github.com/aryanwalia24/C_Poker_Game",
    description:
      "Developed a fully functional Texas Hold'em Poker game in C, utilizing bitwise operations for efficient card data representation. Implemented modular code design including player management, game logic, and hand evaluation, compiled into a reusable static library.",
    tech: ["C", "Linux", "Static Libraries", "Bitwise Operations"],
  },
];

export const education: Education = {
  university: "Chitkara University",
  degree: "B.E. in Computer Science – CGPA: 9.68",
  period: "Oct 2022 - July 2026",
  location: "Rajpura, Punjab",
};

export const education12 = {
  school: "GMSSS-35D, Chandigarh",
  board: "CBSE 12th – 92.8%",
  period: "2021-22",
};

export const hobbies = [
  { name: "Chess", emoji: "♟️" },
  { name: "Football", emoji: "⚽" },
  { name: "Cricket", emoji: "🏏" },
  { name: "Badminton", emoji: "🏸" },
  { name: "Music", emoji: "🎵" },
  { name: "PlayStation", emoji: "🎮" },
  { name: "Adventure", emoji: "🏔️" },
];

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Java", "C", "C++", "Python", "JavaScript", "Ruby"],
  },
  {
    category: "Full-Stack",
    items: [
      "React.js",
      "Node.js",
      "Spring Boot",
      "FastAPI",
      "Tailwind CSS",
      "MongoDB",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3, RDS, CloudWatch)",
      "Terraform",
      "Kubernetes",
      "Docker",
      "CI/CD",
      "Linux",
      "Infrastructure as Code",
    ],
  },
  {
    category: "Databases",
    items: ["MongoDB", "PostgreSQL", "Redis"],
  },
  {
    category: "AI/ML",
    items: [
      "Generative AI",
      "Agentic AI Workflows",
      "MCP Servers",
      "LLM Integration",
    ],
  },
  {
    category: "Tools & Observability",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Grafana",
      "Prometheus",
      "OpenTelemetry",
      "Rancher",
      "JIRA",
      "Postman",
      "Vercel",
    ],
  },
  {
    category: "Concepts",
    items: [
      "Microservices",
      "System Design",
      "HLD",
      "REST APIs",
      "Observability",
      "SDLC",
      "Incident Management",
      "SOLID Principles",
      "OOP",
    ],
  },
];

export const achievements: string[] = [
  "1650+ Rating on LeetCode with 700+ problems solved.",
  "Ranked in Top 1.7% of students at University Coding Academy.",
  "Blockchain and its Applications – IIT Kharagpur NPTEL Certification.",
];
