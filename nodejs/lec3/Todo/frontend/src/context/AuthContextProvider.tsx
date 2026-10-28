
import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";
import { config } from "../config";

interface ITodo{
  _id:string;
  title:string;
  task:string;
}

interface IUser {
  username: string;
  email: string;
  _id: string;
  todos:ITodo[]
}

interface IAuthContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  loading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  loading: true,
});

const AuthLoadingScreen = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
      {/* Background effects */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[100px]" />

      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[15%] top-[20%] h-2 w-2 animate-pulse rounded-full bg-blue-400" />
        <div className="absolute right-[20%] top-[30%] h-1.5 w-1.5 animate-ping rounded-full bg-violet-400" />
        <div className="absolute bottom-[25%] left-[25%] h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-300" />
        <div className="absolute bottom-[20%] right-[15%] h-2 w-2 animate-ping rounded-full bg-blue-300" />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
        {/* Animated logo */}
        <div className="relative mb-8">
          <div className="absolute -inset-4 animate-pulse rounded-[2rem] bg-blue-500/20 blur-xl" />

          <div className="relative flex h-20 w-20 animate-[float_3s_ease-in-out_infinite] items-center justify-center rounded-[1.6rem] bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 shadow-2xl shadow-blue-500/30">
            <Check size={42} strokeWidth={3.5} className="text-white" />
          </div>

          <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-slate-900 text-blue-400 shadow-lg">
            <Sparkles size={16} />
          </span>
        </div>

        {/* Brand */}
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Task<span className="text-blue-400">Flow</span>
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          A little patience. A lot of productivity.
        </p>

        {/* Loading animation */}
        <div className="mt-10 w-full max-w-[260px]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium tracking-wide text-slate-300">
              Preparing your workspace
            </span>
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" />
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-2/5 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-500 via-indigo-400 to-violet-500" />
          </div>
        </div>

        <p className="mt-8 text-xs text-slate-500">
          Making space for what matters.
        </p>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-110%); }
          100% { transform: translateX(350%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};

const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("taskflow_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${config.backend_url}/api/v1/user/token`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data.data.user);
        // navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem("taskflow_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [navigate]);

  // Keep the app hidden until authentication is checked.
  if (loading) {
    return <AuthLoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
