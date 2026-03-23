import { useResume } from "@/hooks/use-resume";
import { ResumeHeader } from "./resume/ResumeHeader";
import { ResumeSummary } from "./resume/ResumeSummary";
import { ResumeSkills } from "./resume/ResumeSkills";
import { ResumeExperience } from "./resume/ResumeExperience";
import { ResumeEducation } from "./resume/ResumeEducation";
import { ResumeCertifications } from "./resume/ResumeCertifications";

export default function ResumePage() {
  const { data, isLoading, error } = useResume();

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-gray-50">
        <p className="text-lg text-red-500">Failed to load resume. Please try again later.</p>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-500">Loading resume...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gray-50 px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-md">
        <ResumeHeader personalInfo={data.personalInfo} />
        <ResumeSummary summary={data.summary} />
        <ResumeSkills
          technicalExpertise={data.technicalExpertise}
          certifiedSkills={data.certifiedSkills}
        />
        <ResumeExperience workHistory={data.workHistory} />
        <ResumeEducation education={data.education} />
        <ResumeCertifications certifications={data.certifications} />
      </div>
    </div>
  );
}
