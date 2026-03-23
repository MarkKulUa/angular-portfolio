import type { Summary } from "@/types/resume";

interface ResumeSummaryProps {
  summary: Summary;
}

export function ResumeSummary({ summary }: ResumeSummaryProps) {
  return (
    <section className="border-b px-8 py-6">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Summary</h2>
      <p
        className="mb-2 text-lg font-semibold text-indigo-600"
        dangerouslySetInnerHTML={{ __html: summary.title }}
      />
      <p className="mb-2 leading-relaxed text-gray-600">{summary.description}</p>
      <p className="text-sm text-gray-500">{summary.languages}</p>
    </section>
  );
}
