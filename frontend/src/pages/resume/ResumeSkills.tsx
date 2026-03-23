import type { TechnicalExpertise, CertifiedSkill } from "@/types/resume";

interface ResumeSkillsProps {
  technicalExpertise: TechnicalExpertise;
  certifiedSkills: CertifiedSkill[];
}

const categoryLabels: Record<keyof TechnicalExpertise, string> = {
  backend: "Backend",
  frontend: "Frontend",
  management: "Management",
  data: "Data",
  devops: "DevOps & Delivery",
  monitoring: "Monitoring",
  tools: "Tools & Workflow",
  automation: "Automation & AI",
  other: "Other",
};

export function ResumeSkills({ technicalExpertise, certifiedSkills }: ResumeSkillsProps) {
  return (
    <section className="border-b px-8 py-6">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Technical Expertise</h2>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(categoryLabels) as (keyof TechnicalExpertise)[]).map((key) => {
          const skills = technicalExpertise[key];
          if (!skills || skills.length === 0) return null;
          return (
            <div key={key}>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                {categoryLabels[key]}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {certifiedSkills.length > 0 && (
        <>
          <h3 className="mb-3 text-lg font-semibold text-gray-700">Certified Skills</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {certifiedSkills.map((skill) => (
              <div key={skill.name} className="rounded-lg bg-gray-50 p-3">
                <div className="font-medium text-gray-800">{skill.name}</div>
                <div className="text-sm text-gray-500">{skill.provider}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
