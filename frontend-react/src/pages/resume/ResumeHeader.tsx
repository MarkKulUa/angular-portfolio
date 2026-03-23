import type { PersonalInfo } from "@/types/resume";

interface ResumeHeaderProps {
  personalInfo: PersonalInfo;
}

export function ResumeHeader({ personalInfo }: ResumeHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-8 py-10 text-white">
      <div className="flex items-center gap-6">
        <div className="shrink-0">
          {personalInfo.photo ? (
            <img
              src={personalInfo.photo}
              alt={personalInfo.name}
              className="h-24 w-24 rounded-full border-4 border-white/30 object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-3xl font-bold">
              {personalInfo.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h1 className="mb-3 text-3xl font-bold">{personalInfo.name}</h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-indigo-100">
            <span>📍 {personalInfo.location}</span>
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="hover:text-white">
                📧 {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <a href={`tel:${personalInfo.phone}`} className="hover:text-white">
                📱 {personalInfo.phone}
              </a>
            )}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              💼 LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
