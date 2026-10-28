
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import type { CreateTodoInput } from "../../types/todo.types";

type TodoFormProps = {
  onAdd: (data: CreateTodoInput) => Promise<void>;
  isLoading: boolean;
};

function TodoForm({ onAdd, isLoading }: TodoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTodoInput>({
    defaultValues: {
      title: "",
      task: "",
    },
  });

  const submit = async (data: CreateTodoInput) => {
    await onAdd(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Add a new task
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          What would you like to accomplish?
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="todo-title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Task title
          </label>

          <input
            id="todo-title"
            placeholder="e.g. Complete DSA practice"
            disabled={isLoading}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
            {...register("title", {
              required: "Please enter a task title.",
              maxLength: {
                value: 100,
                message: "Title must be under 100 characters.",
              },
            })}
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-600">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="todo-task"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id="todo-task"
            rows={3}
            placeholder="Add some details about this task..."
            disabled={isLoading}
            className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
            {...register("task", {
              required: "Please enter a task description.",
              maxLength: {
                value: 1000,
                message: "Description must be under 1000 characters.",
              },
            })}
          />

          {errors.task && (
            <p className="mt-1 text-sm text-red-600">
              {errors.task.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <Plus size={18} />
          {isLoading ? "Adding task..." : "Add task"}
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
