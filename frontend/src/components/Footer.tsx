import { useResume } from "@/hooks/use-resume";

const techStack = [
  { name: "React", url: "https://react.dev", icon: "react.svg" },
  { name: "TypeScript", url: "https://www.typescriptlang.org", icon: "typescript.svg" },
  { name: "Vite", url: "https://vite.dev", icon: "vite.svg" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com", icon: "tailwindcss.svg" },
  { name: "shadcn/ui", url: "https://ui.shadcn.com", icon: "shadcn.svg" },
  { name: "Zustand", url: "https://zustand.docs.pmnd.rs", icon: "zustand.svg" },
  { name: "Node.js", url: "https://nodejs.org", icon: "nodejs.svg" },
  { name: "NestJS", url: "https://nestjs.com", icon: "nestjs.svg" },
  { name: "Vitest", url: "https://vitest.dev", icon: "vitest.svg" },
  { name: "ESLint", url: "https://eslint.org", icon: "eslint.svg" },
  { name: "Git", url: "https://git-scm.com", icon: "git.svg" },
];

export function Footer() {
  const { data: resume } = useResume();

  const name = resume?.personalInfo.name ?? "Portfolio";
  const email = resume?.personalInfo.email;
  const linkedin = resume?.personalInfo.linkedin;

  return (
    <footer className="mt-auto bg-[#2d3748] py-8 text-white/80">
      <div className="container mx-auto px-8">
        <div className="flex flex-wrap items-center justify-between gap-8 max-md:flex-col max-md:text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 max-md:justify-center">
            <span className="text-[0.85rem] font-medium text-white/60">
              Built with:
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {techStack.map((tech) => (
                <a
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={tech.name}
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-white/5 p-1 transition-all hover:-translate-y-0.5 hover:bg-white/15"
                >
                  <img
                    src={`/assets/images/${tech.icon}`}
                    alt={tech.name}
                    width={24}
                    height={24}
                    className="opacity-90 transition-all hover:scale-110 hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-6">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                LinkedIn
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                Email
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}