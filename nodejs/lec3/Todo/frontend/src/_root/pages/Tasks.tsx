
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCheck,
  ClipboardList,
  LoaderCircle,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import axios from "axios";

import TodoForm from "../../components/todos/TodoForm";
import TodoItem from "../../components/todos/TodoItem";
import { todoService } from "../../services/todo.services";
import type {
  Todo,
  CreateTodoInput,
} from "../../types/todo.types";

type Filter = "all" | "pending" | "completed";

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? fallback;
  }

  return error instanceof Error ? error.message : fallback;
}

function Tasks() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

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
          setError(getErrorMessage(err, "Failed to load your tasks."));
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

  const filteredTodos = useMemo(() => {
    const query = search.trim().toLowerCase();

    return todos.filter((todo) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "pending" && !todo.completed) ||
        (filter === "completed" && todo.completed);

      const matchesSearch =
        (todo.title ?? "").toLowerCase().includes(query) ||
        (todo.task ?? "").toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [todos, filter, search]);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  const addTodo = async (data: CreateTodoInput) => {
    setIsAdding(true);
    setError("");
    setSuccessMessage("");

    try {
      const newTodo = await todoService.create(data);

      setTodos((current) => [newTodo, ...current]);
      setFilter("all");
      setSearch("");
      setSuccessMessage("Task created successfully!");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to create the task."));
      throw err;
    } finally {
      setIsAdding(false);
    }
  };

  const toggleTodo = async (todo: Todo) => {
    setUpdatingId(todo._id);
    setError("");
    setSuccessMessage("");

    try {
      const updatedTodo = await todoService.toggle(todo);

      setTodos((current) =>
        current.map((item) =>
          item._id === todo._id ? updatedTodo : item
        )
      );

      setSuccessMessage(
        updatedTodo.completed
          ? "Task marked as completed!"
          : "Task marked as pending."
      );
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to update the task."));
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteTodo = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setDeletingId(id);
    setError("");
    setSuccessMessage("");

    try {
      await todoService.delete(id);

      setTodos((current) =>
        current.filter((todo) => todo._id !== id)
      );

      setSuccessMessage("Task deleted successfully!");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to delete the task."));
    } finally {
      setDeletingId(null);
    }
  };

  const filters: { label: string; value: Filter; count: number }[] = [
    { label: "All tasks", value: "all", count: todos.length },
    { label: "Pending", value: "pending", count: pendingCount },
    {
      label: "Completed",
      value: "completed",
      count: completedCount,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <Link
              to="/dashboard"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
            >
              <ArrowLeft size={16} />
              Back to dashboard
            </Link>

            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-600">
              <Sparkles size={17} />
              Stay organized
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              My Tasks
            </h1>

            <p className="mt-2 text-slate-500">
              Create, organize, complete, and manage all your tasks in one place.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <CheckCheck size={21} className="text-emerald-600" />
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {completedCount} of {todos.length} completed
              </p>
              <p className="text-xs text-slate-500">
                {pendingCount} tasks remaining
              </p>
            </div>
          </div>
        </header>

        {error && (
          <div
            role="alert"
            className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            {successMessage}
            <button
              type="button"
              onClick={() => setSuccessMessage("")}
              aria-label="Dismiss success message"
            >
              <X size={17} />
            </button>
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Total tasks
              </p>
              <ClipboardList size={20} className="text-blue-600" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {todos.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Pending
              </p>
              <LoaderCircle size={20} className="text-amber-600" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Completed
              </p>
              <CheckCheck size={20} className="text-emerald-600" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {completedCount}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Plus size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Create a task
              </h2>
              <p className="text-sm text-slate-500">
                Add something you want to get done.
              </p>
            </div>
          </div>

          <TodoForm onAdd={addTodo} isLoading={isAdding} />
        </section>

        <section className="space-y-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                All tasks
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Showing {filteredTodos.length}{" "}
                {filteredTodos.length === 1 ? "task" : "tasks"}
              </p>
            </div>

            <div className="relative w-full sm:max-w-sm">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tasks..."
                aria-label="Search tasks"
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                aria-pressed={filter === item.value}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  filter === item.value
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {item.label}
                <span className="ml-2 opacity-75">{item.count}</span>
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-16">
              <LoaderCircle
                size={32}
                className="animate-spin text-blue-600"
              />
              <p className="mt-4 text-sm text-slate-500">
                Loading your tasks...
              </p>
            </div>
          ) : filteredTodos.length > 0 ? (
            <div className="space-y-3">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  isUpdating={updatingId === todo._id}
                  isDeleting={deletingId === todo._id}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <ClipboardList size={28} />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {search
                  ? "No matching tasks"
                  : filter === "completed"
                    ? "No completed tasks yet"
                    : filter === "pending"
                      ? "No pending tasks"
                      : "Your task list is empty"}
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                {search
                  ? "Try another search term."
                  : filter === "completed"
                    ? "Complete a task and it will appear here."
                    : filter === "pending"
                      ? "You're all caught up!"
                      : "Create your first task using the form above."}
              </p>

              {filter !== "all" && !search && (
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className="mt-4 font-semibold text-blue-600 hover:underline"
                >
                  View all tasks
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Tasks;
