
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock3,
  ListTodo,
  Sparkles,
} from "lucide-react";
import axios from "axios";

import TodoStats from "../../components/todos/TodoStats";
import { todoService } from "../../services/todo.services";
import type { Todo } from "../../types/todo.types";

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? fallback;
  }

  return error instanceof Error ? error.message : fallback;
}

function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchTodos() {
      try {
        const response = await todoService.getAll();

        if (isMounted) {
          setTodos(Array.isArray(response) ? response : []);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(getErrorMessage(err, "Unable to load your dashboard."));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void fetchTodos();

    return () => {
      isMounted = false;
    };
  }, []);

  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.length - completed;
  const progress = todos.length
    ? Math.round((completed / todos.length) * 100)
    : 0;

  const recentTodos = useMemo(
    () => [...todos].slice(0, 5),
    [todos]
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-600">
              <Sparkles size={17} />
              Your productivity overview
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              See how you're doing and decide what to work on next.
            </p>
          </div>

          <Link
            to="/tasks"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Manage tasks
            <ArrowRight size={18} />
          </Link>
        </header>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            Loading your dashboard...
          </div>
        ) : (
          <>
            <TodoStats todos={todos} />

            <section className="grid gap-5 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Overall progress
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Every completed task moves you forward.
                    </p>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <ListTodo size={22} />
                  </div>
                </div>

                <div className="mt-8 flex items-end justify-between gap-3">
                  <span className="text-4xl font-bold text-slate-900">
                    {progress}%
                  </span>
                  <span className="text-sm text-slate-500">
                    {completed} of {todos.length} completed
                  </span>
                </div>

                <div
                  className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-label="Overall task completion"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                    <Clock3 size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Pending tasks</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {pending}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Completed tasks</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {completed}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Recent tasks
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    A quick look at your task list.
                  </p>
                </div>

                <Link
                  to="/tasks"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View all tasks
                  <ArrowRight size={16} />
                </Link>
              </div>

              {recentTodos.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <ListTodo size={23} />
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900">
                    No tasks yet
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Create your first task to get started.
                  </p>
                  <Link
                    to="/tasks"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Go to tasks
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {recentTodos.map((todo) => (
                    <li
                      key={todo._id}
                      className="flex items-start gap-3 px-5 py-4 sm:px-6"
                    >
                      {todo.completed ? (
                        <CheckCircle2
                          size={20}
                          className="mt-0.5 shrink-0 text-emerald-600"
                        />
                      ) : (
                        <Circle
                          size={20}
                          className="mt-0.5 shrink-0 text-slate-400"
                        />
                      )}

                      <div className="min-w-0 flex-1">
                        <p
                          className={`break-words font-medium ${
                            todo.completed
                              ? "text-slate-400 line-through"
                              : "text-slate-800"
                          }`}
                        >
                          {todo.title}
                        </p>
                        <p className="mt-1 break-words text-sm text-slate-500">
                          {todo.task}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          todo.completed
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {todo.completed ? "Completed" : "Pending"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default Dashboard;
