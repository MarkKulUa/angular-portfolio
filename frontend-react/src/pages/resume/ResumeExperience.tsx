import type { WorkExperience } from "@/types/resume";

interface ResumeExperienceProps {
  workHistory: WorkExperience[];
}

export function ResumeExperience({ workHistory }: ResumeExperienceProps) {
  return (
    <section className="border-b px-8 py-6">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Work History</h2>
      <div className="space-y-6">
        {workHistory.map((job) => (
          <div key={`${job.company}-${job.period}`} className="border-l-2 border-indigo-200 pl-4">
            <h3 className="text-lg font-semibold text-gray-800">{job.position}</h3>
            <div className="mb-1 text-sm">
              <span className="font-medium text-indigo-600">{job.company}</span>
              <span className="mx-2 text-gray-400">·</span>
              <span className="text-gray-500">{job.type}</span>
            </div>
            <div className="mb-2 text-xs text-gray-400">
              {job.period} · {job.location}
            </div>

            {job.description && (
              <p className="mb-2 text-sm leading-relaxed text-gray-600">{job.description}</p>
            )}

            {job.projects && job.projects.length > 0 && (
              <div className="mb-2">
                <h4 className="text-sm font-semibold text-gray-700">Projects Delivered:</h4>
                <ul className="ml-4 list-disc text-sm text-gray-600">
                  {job.projects.map((project) => (
                    <li key={project}>{project}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="mb-2">
                <h4 className="text-sm font-semibold text-gray-700">Role & Responsibilities:</h4>
                <ul className="ml-4 list-disc text-sm text-gray-600">
                  {job.responsibilities.map((resp) => (
                    <li key={resp}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
