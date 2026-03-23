import type { Education } from "@/types/resume";

interface ResumeEducationProps {
  education: Education[];
}

export function ResumeEducation({ education }: ResumeEducationProps) {
  return (
    <section className="border-b px-8 py-6">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Education</h2>
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.institution} className="rounded-lg bg-gray-50 p-4">
            <h3 className="font-semibold text-gray-800">{edu.institution}</h3>
            <div className="text-sm text-gray-600">{edu.degree}</div>
            <div className="text-sm text-gray-500">{edu.specialization}</div>
            <div className="mt-1 text-xs text-gray-400">{edu.period}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
