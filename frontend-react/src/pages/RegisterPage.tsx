import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import {
  registerSchema,
  type RegisterFormData,
} from "@/schemas/register.schema";
import { useAuth } from "@/hooks/use-auth";

export default function RegisterPage() {
  const { register: registerUser, registerError, isRegistering } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword: _, ...registerData } = data;
    registerUser(registerData);
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 p-8"
      >
        <h2 className="text-center text-2xl font-bold">Регистрация</h2>

        <div>
          <input
            type="text"
            placeholder="Имя"
            {...register("name")}
            className="w-full rounded-md border px-4 py-2"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

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

        <div>
          <input
            type="password"
            placeholder="Подтвердите пароль"
            {...register("confirmPassword")}
            className="w-full rounded-md border px-4 py-2"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {registerError && (
          <p className="text-sm text-red-500">
            {registerError instanceof Error
              ? registerError.message
              : "Ошибка регистрации"}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
          disabled={isRegistering}
        >
          {isRegistering ? "Регистрация..." : "Зарегистрироваться"}
        </button>

        <p className="text-center text-sm">
          Уже есть аккаунт?{" "}
          <Link to="/auth/login" className="text-indigo-600 hover:underline">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}
