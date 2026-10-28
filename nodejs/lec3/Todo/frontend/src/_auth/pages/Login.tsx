
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { config } from "../../config";
import { useAuthContext } from "../../context/AuthContextProvider";

type FormValues = {
  email: string;
  password: string;
};

function Login() {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = async (data: FormValues) => {
    setIsLoading(true);
    setError("");

    try {
      const { email, password } = data;

      const res = await axios.post(
        `${config.backend_url}/api/v1/user/signin`,
        { email, password }
      );

      const token = res.data.data.token;
      const user = res.data.data.user;

      setUser(user);
      localStorage.setItem("taskflow_token", token);

      navigate("/");
    } catch (error) {
      console.log(error);
      
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ??
            "Login failed. Please try again."
        );
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

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

      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-5"
      >
        {/* API Error */}
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              className={`w-full rounded-lg border py-3 pl-10 pr-3 outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
              })}
            />
          </div>

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              aria-invalid={!!errors.password}
              className={`w-full rounded-lg border py-3 pl-10 pr-10 outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
              {...register("password", {
                required: "Password is required.",
              })}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              aria-pressed={showPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
              />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-blue-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
