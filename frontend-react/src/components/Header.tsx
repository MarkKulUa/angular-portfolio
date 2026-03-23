import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Header() {
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Home", exact: true },
    { to: "/resume", label: "Resume" },
    { to: "/auth/protected", label: "Secret Club" },
  ];

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="text-xl font-bold">
            MK
          </Link>
          <ul className="flex gap-6">
            {links.map(({ to, label, exact }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={cn(
                    "transition-colors hover:text-indigo-600",
                    isActive(pathname, to, exact) &&
                      "text-indigo-600 font-semibold",
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function isActive(
  pathname: string,
  to: string,
  exact?: boolean,
): boolean {
  return exact ? pathname === to : pathname.startsWith(to);
}
