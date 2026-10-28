
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  CheckSquare,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContextProvider";
import axios from "axios";
import { config } from "../config";

function RootLayout() {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  useEffect(()=>{
    const fnc = async()=>{
      try {
        const token = localStorage.getItem("taskflow_token");
        if(!token){
          navigate("/login");
          return;
        }
        await axios.get(`${config.backend_url}/api/v1/user/token`, {headers:{Authorization:token}});
      } catch (error) {
        navigate("/login");
        console.log(error);
      }
    }
    fnc();
  }, []);

  const navigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Tasks",
      path: "/tasks",
      icon: ListTodo,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("taskflow_token");
    setUser(null);
    navigate("/login", { replace: true });
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-blue-50 text-blue-700"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <CheckSquare size={21} />
          </span>
          <span className="text-lg font-bold text-gray-900">
            TaskFlow
          </span>
        </NavLink>

        <button
          type="button"
          onClick={() => setIsSidebarOpen((open) => !open)}
          aria-label={isSidebarOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isSidebarOpen}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <NavLink
            to="/"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <CheckSquare size={23} />
            </span>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-gray-900">
                TaskFlow
              </h1>
              <p className="text-xs text-gray-500">
                Organize your day
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Workspace
          </p>

          {navigation.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={() => setIsSidebarOpen(false)}
              className={navLinkClass}
            >
              <Icon size={19} />
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-100 p-4">
          <div className="mb-3 rounded-xl bg-blue-50 p-4">
            <p className="text-sm font-semibold text-gray-900">
              Stay productive
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-600">
              Small steps every day lead to big results.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={19} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-w-0 lg:pl-64">
        {/* Desktop Header */}
        <header className="hidden h-20 items-center justify-between border-b border-gray-200 bg-white px-8 lg:flex">
          <div>
            <p className="text-sm text-gray-500">
              Your personal workspace
            </p>
            <p className="mt-1 font-semibold text-gray-900">
              Manage your tasks efficiently
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </header>

        {/* Nested Route */}
        <div className="min-h-[calc(100vh-5rem)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
