
import { CheckCircle2, ListTodo, CircleDashed } from "lucide-react";
import type { Todo } from "../../types/todo.types";

type TodoStatsProps = {
  todos: Todo[];
};

function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = total - completed;

  const stats = [
    {
      label: "Total Tasks",
      value: total,
      icon: ListTodo,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Pending",
      value: pending,
      icon: CircleDashed,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              {label}
            </p>

            <div className={`rounded-xl p-2.5 ${color}`}>
              <Icon size={20} />
            </div>
          </div>

          <p className="mt-4 text-3xl font-bold text-gray-900">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default TodoStats;
