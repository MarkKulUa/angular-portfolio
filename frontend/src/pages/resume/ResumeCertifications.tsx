import type { Certification } from "@/types/resume";

interface ResumeCertificationsProps {
  certifications: Certification[];
}

export function ResumeCertifications({ certifications }: ResumeCertificationsProps) {
  return (
    <section className="px-8 py-6">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Licenses & Certifications</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <div key={cert.name} className="rounded-lg border p-4">
            <h3 className="font-semibold text-gray-800">
              {cert.url ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {cert.name}
                </a>
              ) : (
                cert.name
              )}
            </h3>
            <div className="text-sm text-gray-500">{cert.provider}</div>
            <div className="text-xs text-gray-400">Issued: {cert.issued}</div>
            <div className="mt-2 flex flex-wrap gap-1">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600"
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
