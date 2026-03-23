import { Navigate, useParams } from "react-router-dom";
import { usePokemonDetails } from "@/hooks/use-pokemon";

export function PokemonGuard({ children }: { children: React.ReactNode }) {
  const { name } = useParams<{ name: string }>();
  const { isError, isLoading } = usePokemonDetails(name ?? "");

  if (!name || isError) {
    return <Navigate to="/pokemon" replace />;
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Загрузка...</div>;
  }

  return <>{children}</>;
}
