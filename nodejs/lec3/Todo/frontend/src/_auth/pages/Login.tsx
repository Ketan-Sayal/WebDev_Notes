
import { Link } from "react-router-dom";
import { Mail, Lock, Eye } from "lucide-react";

function Login() {

    

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Enter your credentials to access your account.
        </p>
      </div>

      <form className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
