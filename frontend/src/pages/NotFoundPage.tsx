import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-70px-100px)] items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 p-8 text-center text-white">
      <div className="max-w-[600px]">
        <h1 className="m-0 text-[8rem] font-bold leading-none animate-bounce md:text-[5rem]">
          404
        </h1>
        <h2 className="my-4 text-[2.5rem] font-semibold md:text-[2rem]">
          Page Not Found
        </h2>
        <p className="mb-10 mt-6 text-lg opacity-90 md:text-base">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block rounded-lg bg-white px-10 py-4 font-semibold text-indigo-500 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
