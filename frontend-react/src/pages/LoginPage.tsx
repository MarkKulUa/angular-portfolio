import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { loginSchema, type LoginFormData } from "@/schemas/login.schema";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const { login, loginError, isLoggingIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => login(data);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 p-8"
      >
        <h2 className="text-center text-2xl font-bold">Вход</h2>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full rounded-md border px-4 py-2"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Пароль"
            {...register("password")}
            className="w-full rounded-md border px-4 py-2"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {loginError && (
          <p className="text-sm text-red-500">
            {loginError instanceof Error
              ? loginError.message
              : "Ошибка входа"}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Вход..." : "Войти"}
        </button>

        <p className="text-center text-sm">
          Нет аккаунта?{" "}
          <Link
            to="/auth/register"
            className="text-indigo-600 hover:underline"
          >
            Регистрация
          </Link>
        </p>
      </form>
    </div>
  );
}
