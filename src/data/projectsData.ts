import { CaseStudy } from "../types";

export const projectsData: CaseStudy[] = [
  {
    id: "ziion-technology",
    title: "Ziion Technology Education Website",
    client: "Ziion Technology",
    industry: "Education Technology",
    category: "Web Application",
    summary:
      "A custom website for an education-focused technology business, built with a React frontend and a Node.js, Express, and MongoDB backend.",
    image: "/src/assets/images/project_ziion_education.jpg",
    websiteUrl: "https://ziiontechnology.in/",
    challenge:
      "Create a custom web presence for an education-focused technology business and its online audience.",
    solution:
      "Built a full-stack website using React, Node.js, Express, and MongoDB, with the live site hosted on Hostinger.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Hostinger"],
    results: [
      { metric: "Live", label: "Public website" },
      { metric: "MERN", label: "Full-stack application" },
    ],
    processSteps: [
      {
        phase: "Frontend",
        description: "Created the website experience with React.",
      },
      {
        phase: "Backend",
        description: "Connected a Node.js and Express backend with MongoDB.",
      },
      {
        phase: "Hosting",
        description: "Published the website using Hostinger hosting.",
      },
    ],
    keyTakeaways: [
      "Custom website for an education-focused technology business.",
      "React frontend backed by Node.js, Express, and MongoDB.",
      "Live website hosted on Hostinger.",
    ],
  },
  {
    id: "best-branded-residences",
    title: "Best Branded Residences",
    client: "Best Branded Residences",
    industry: "Luxury Real Estate",
    category: "Web Application",
    summary:
      "A modern web experience for a premium branded-residences platform, built with Next.js and a SQL backend.",
    image: "/src/assets/images/project_best_branded_residences.jpg",
    websiteUrl: "https://www.bestbrandedresidences.com/",
    challenge:
      "Build a polished digital presence for a premium branded-residences platform.",
    solution:
      "Developed the website with Next.js and connected it to a SQL backend.",
    technologies: ["Next.js", "SQL"],
    results: [
      { metric: "Live", label: "Public website" },
      { metric: "Next.js", label: "Web framework" },
    ],
    processSteps: [
      {
        phase: "Web experience",
        description: "Built the website using the Next.js framework.",
      },
      {
        phase: "Data layer",
        description: "Connected the application to a SQL backend.",
      },
    ],
    keyTakeaways: [
      "Premium branded-residences web experience.",
      "Next.js frontend connected to a SQL backend.",
      "Live website available at BestBrandedResidences.com.",
    ],
  },
];
