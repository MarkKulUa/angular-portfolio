import { useQuery } from "@tanstack/react-query";
import type { Resume } from "@/types/resume";

export function useResume() {
  return useQuery({
    queryKey: ["resume"],
    queryFn: async (): Promise<Resume> => {
      const res = await fetch("/assets/data/resume.json");
      if (!res.ok) throw new Error("Ошибка загрузки резюме");
      return res.json();
    },
    staleTime: Infinity,
  });
}
