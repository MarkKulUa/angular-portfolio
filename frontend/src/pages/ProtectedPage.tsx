import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useAuth } from "@/hooks/use-auth";

export default function ProtectedPage() {
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-lg space-y-6 rounded-lg border p-8 text-center shadow-sm">
        <div className="text-4xl">🎉</div>

        <h1 className="text-2xl font-bold">Welcome to the Secret Club!</h1>

        {user && (
          <div className="space-y-1">
            <p className="text-lg">
              Hello, <strong>{user.name}</strong>!
            </p>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400">
              Member since{" "}
              {user.createdAt instanceof Date
                ? user.createdAt.toLocaleDateString()
                : new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}

        <div className="space-y-4 text-left">
          <h2 className="text-center text-xl font-semibold">🤫 Top Secret Information</h2>
          <p className="text-center text-gray-600">Why do programmers prefer dark mode?</p>
          <p className="text-center font-medium">Because light attracts bugs! 🐛</p>

          <div className="rounded-md bg-gray-50 p-4">
            <h3 className="mb-2 font-semibold">Fun Facts About You:</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
              <li>✨ You successfully implemented JWT authentication</li>
              <li>🚀 You're now part of the elite authenticated users</li>
              <li>🎯 You can access this page because you have a valid token</li>
              <li>🔐 Your session is secure and protected</li>
            </ul>
          </div>

          <blockquote className="border-l-4 border-indigo-300 pl-4 italic text-gray-500">
            <p>"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."</p>
            <p className="mt-1 text-sm not-italic">— Martin Fowler</p>
          </blockquote>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="rounded-md bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
          >
            Go to Home
          </button>
          <button
            onClick={() => logout()}
            className="rounded-md bg-red-600 px-6 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
