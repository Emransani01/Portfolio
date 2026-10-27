export interface Project {
  id: string;
  name: string;
  tag: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  techStack: string[];
  liveLink: string;
  githubLink: string; // Only client repo
  challenges: string[];
  futurePlans: string[];
}

export const projectsData: Project[] = [
  {
    id: "bazar-dor",
    name: "Bazar Dor (বাজার দর)",
    tag: "Next.js + MongoDB",
    shortDescription:
      "A smart daily market price and grocery expense tracking web application.",
    fullDescription:
      "Bazar Dor is a localized web application designed to help users track daily market prices of essential items, compare grocery rates, and manage their personal shopping budgets efficiently.",
    image: "/images/bazar-dor.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
    liveLink: "https://bazar-dor-sage.vercel.app/",
    githubLink: "https://github.com/Emransani01/Bazar-Dor",
    challenges: [
      "Designing a clean and dynamic UI to showcase fluctuating market prices.",
      "Structuring state management to handle search and category filtering in real time.",
    ],
    futurePlans: [
      "Integrate automated daily price update notifications via WhatsApp/Email.",
      "Add interactive data visualization charts for weekly/monthly expense trends.",
    ],
  },
  {
    id: "fit-log",
    name: "FitLog - Fitness Tracker",
    tag: "MERN Stack",
    shortDescription:
      "A comprehensive fitness tracking web app to monitor workouts and daily activity.",
    fullDescription:
      "FitLog allows fitness enthusiasts to log daily workouts, track routine progress, calculate target metrics, and build consistent habits with an intuitive UI.",
    image: "/images/FITLOG.PNG",
    techStack: ["React", "JavaScript", "Tailwind CSS", "Node.js", "MongoDB"],
    liveLink: "https://fit-log-nu-one.vercel.app/",
    githubLink: "https://github.com/Emransani01/fit-log",
    challenges: [
      "Calculating complex exercise metrics and preserving user logged data efficiently.",
      "Creating a mobile-responsive dashboard for seamless use during gym sessions.",
    ],
    futurePlans: [
      "Implement social workout sharing and leaderboards.",
      "Integrate dynamic calorie/macro tracking algorithms.",
    ],
  },
  {
    id: "book-vibe",
    name: "Book Vibe",
    tag: "React + REST API",
    shortDescription:
      "A modern web platform for discovering, reviewing, and organizing personal reading lists.",
    fullDescription:
      "Book Vibe helps avid readers discover new books, manage their reading wishlist, rate completed books, and filter books by genre or rating.",
    image: "/images/Book Vibe.PNG",
    techStack: ["React", "JavaScript", "Tailwind CSS", "REST API"],
    liveLink: "https://book-vibe-ecru-seven.vercel.app/",
    githubLink: "https://github.com/Emransani01/Book-Vibe",
    challenges: [
      "Handling asynchronous API requests and seamless dynamic tab routing.",
      "Maintaining state consistency across saved wishlist items.",
    ],
    futurePlans: [
      "Add user community reviews and comment discussions.",
      "Build a custom PDF/E-book viewer modal inside the app.",
    ],
  },
];
