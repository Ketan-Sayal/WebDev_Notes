
import { Check, Circle, Trash2 } from "lucide-react";
import type { Todo } from "../../types/todo.types";

type TodoItemProps = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
};

function TodoItem({
  todo,
  onToggle,
  onDelete,
  isUpdating,
  isDeleting,
}: TodoItemProps) {
  return (
    <article className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:shadow-sm sm:gap-4 sm:p-5">
      <button
        type="button"
        onClick={() => onToggle(todo)}
        disabled={isUpdating || isDeleting}
        aria-label={
          todo.completed
            ? `Mark ${todo.title} as pending`
            : `Mark ${todo.title} as completed`
        }
        aria-pressed={todo.completed}
        className="mt-0.5 shrink-0 rounded-full text-blue-600 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {todo.completed ? (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Check size={16} />
          </span>
        ) : (
          <Circle size={24} className="text-gray-400" />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <h3
          className={`break-words font-semibold ${
            todo.completed
              ? "text-gray-400 line-through"
              : "text-gray-900"
          }`}
        >
          {todo.title}
        </h3>

        <p
          className={`mt-1 whitespace-pre-wrap break-words text-sm leading-6 ${
            todo.completed ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {todo.task}
        </p>

        <span
          className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
            todo.completed
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {todo.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onDelete(todo._id)}
        disabled={isDeleting || isUpdating}
        aria-label={`Delete ${todo.title}`}
        className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2 size={18} />
      </button>
    </article>
  );
}

export default TodoItem;
