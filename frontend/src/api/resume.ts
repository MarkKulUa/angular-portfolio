import type { Resume } from "@/types/resume";

export const resumeApi = {
  getResume: async (): Promise<Resume> => {
    const res = await fetch("/assets/data/resume.json");
    if (!res.ok) throw new Error("Ошибка загрузки резюме");
    return res.json();
  },
};
