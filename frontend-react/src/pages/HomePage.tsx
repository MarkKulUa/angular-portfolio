import { Link } from "react-router-dom";

interface InfoCard {
  icon: string;
  title: string;
  description: string;
  link?: { href: string; label: string };
}

const infoCards: InfoCard[] = [
  { icon: "💼", title: "15+ Years", description: "Professional Experience" },
  {
    icon: "🎓",
    title: "6+ Certifications",
    description: "IBM, Coursera, Edchart, LaraDaily",
    link: {
      href: "https://www.credly.com/users/mark-kulishov/badges#credly",
      label: "Credly",
    },
  },
  { icon: "🚀", title: "Team Lead", description: "Agile & Scrum Expert" },
  { icon: "🌍", title: "Remote Work", description: "Warsaw, Poland" },
];

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-70px)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-500 to-purple-700 px-8 py-24 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-5xl font-bold animate-fade-in-up md:text-3xl sm:text-2xl">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">
              Mark Kulishov
            </span>
          </h1>
          <p className="mb-6 text-2xl font-medium opacity-95 md:text-xl">
            Certified Laravel &amp; React/Angular | Senior Full Stack Engineer |
            Team Lead
          </p>
          <p className="mb-10 text-lg leading-relaxed opacity-90 md:text-base">
            15+ years of experience building scalable, enterprise-level web
            applications across FinTech, SaaS, E-commerce, and Real Estate. Team
            Lead &amp; Delivery Manager specializing in clean architecture and
            production-grade systems.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/resume"
              className="inline-block rounded-lg bg-white px-8 py-3.5 font-semibold text-indigo-500 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              View Resume
            </Link>
            <Link
              to="/pokemon"
              className="inline-block rounded-lg bg-white px-8 py-3.5 font-semibold text-indigo-500 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Pokemon Demo
            </Link>
            <a
              href="https://www.linkedin.com/in/mark-kulishov-85140b1b5/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border-2 border-white bg-transparent px-8 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-indigo-500"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="bg-gray-50 px-8 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {infoCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl bg-white p-8 text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 text-5xl">{card.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                {card.title}
              </h3>
              <p className="text-gray-500">
                {card.description}
                {card.link && (
                  <>
                    ,{" "}
                    <a
                      href={card.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-purple-600 transition-colors hover:text-purple-400 hover:underline"
                    >
                      {card.link.label}
                    </a>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
