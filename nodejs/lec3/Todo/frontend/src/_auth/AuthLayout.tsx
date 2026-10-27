
import { Link, Outlet } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 border-b border-gray-200 bg-white">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <ShieldCheck size={22} />
          </div>
          <span className="text-xl font-bold text-gray-900">
            TaskFlow
          </span>
        </Link>
      </header>

      {/* Authentication Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to TaskFlow
            </h1>
            <p className="mt-2 text-gray-500">
              Manage your tasks. Stay productive.
            </p>
          </div>

          {/* Login / Signup Page */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
            <Outlet />
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-8">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
