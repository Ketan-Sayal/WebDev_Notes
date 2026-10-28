
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { config } from "../../config";
import { useAuthContext } from "../../context/AuthContextProvider";

type FormValues = {
  email: string;
  username: string;
  password: string;
};

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError("");

    try {
      const { username, email, password } = data;

      const res = await axios.post(
        `${config.backend_url}/api/v1/user/signup`,
        { username, email, password }
      );

      const { user, token } = res.data.data;

      if (!user || !token) {
        throw new Error("Invalid response received from server.");
      }

      setUser(user);
      localStorage.setItem("taskflow_token", token);
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ??
            "Signup failed. Please try again."
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
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Create an account
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Get started and organize your tasks with TaskFlow.
        </p>
      </div>

      {/* API Error Alert */}
      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
        >
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="text-sm font-semibold">
              Signup failed
            </p>
            <p className="mt-1 text-sm leading-5">{error}</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Full name
          </label>

          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              id="username"
              type="text"
              placeholder="John Doe"
              disabled={isLoading}
              aria-invalid={!!errors.username}
              className={`w-full rounded-lg border py-3 pl-10 pr-3 outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 ${
                errors.username
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
              {...register("username", {
                required: "Username is required",
              })}
            />
          </div>

          {errors.username && (
            <p
              className="mt-1.5 text-sm text-red-600"
              role="alert"
            >
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
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
              disabled={isLoading}
              aria-invalid={!!errors.email}
              className={`w-full rounded-lg border py-3 pl-10 pr-3 outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
          </div>

          {errors.email && (
            <p
              className="mt-1.5 text-sm text-red-600"
              role="alert"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              disabled={isLoading}
              aria-invalid={!!errors.password}
              className={`w-full rounded-lg border py-3 pl-10 pr-10 outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
              {...register("password", {
                required: "Password is required",
              })}
            />

            {/* Show / Hide Password */}
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              aria-pressed={showPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.password && (
            <p
              className="mt-1.5 text-sm text-red-600"
              role="alert"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {isLoading ? (
            <>
              <LoaderCircle
                size={19}
                className="animate-spin"
              />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default Signup;
