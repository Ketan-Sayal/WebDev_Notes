import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  Zap,
  ChartNoAxesColumnIncreasing,
  Smartphone,
  ListTodo,
  Target,
  Sparkles,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContextProvider";

const features = [
  {
    icon: ClipboardCheck,
    title: "Effortless task management",
    description:
      "Create, organize, and manage your tasks in one beautiful workspace. Keep everything important within reach.",
    color: "blue",
  },
  {
    icon: Zap,
    title: "Stay in your flow",
    description:
      "Spend less time figuring out what to do next and more time making meaningful progress every day.",
    color: "violet",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "See your progress",
    description:
      "Track completed and pending tasks at a glance. Turn small daily wins into lasting habits.",
    color: "emerald",
  },
  {
    icon: Smartphone,
    title: "Works wherever you do",
    description:
      "Enjoy a responsive workspace across desktop, tablet, and mobile. Your next task is always close.",
    color: "orange",
  },
];

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Create your space",
    description:
      "Sign up in seconds and get your own personal workspace ready for action.",
  },
  {
    number: "02",
    icon: ListTodo,
    title: "Capture your tasks",
    description:
      "Write down what matters, add details, and keep your priorities in one place.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Make progress daily",
    description:
      "Complete your tasks, celebrate your wins, and build momentum one step at a time.",
  },
];

const testimonials = [
  {
    quote:
      "Having all my tasks in one place makes it so much easier to stay focused. I spend less time planning and more time actually doing.",
    name: "Sarah K.",
    role: "University student",
    initials: "SK",
    color: "bg-violet-100 text-violet-700",
  },
  {
    quote:
      "I love how simple it is. No unnecessary complexity, just a clean workspace that helps me keep track of what needs to get done.",
    name: "Michael T.",
    role: "Software developer",
    initials: "MT",
    color: "bg-blue-100 text-blue-700",
  },
  {
    quote:
      "The best productivity tool is the one you actually use. TaskFlow makes managing my daily to-dos feel effortless.",
    name: "Emily R.",
    role: "Freelancer",
    initials: "ER",
    color: "bg-emerald-100 text-emerald-700",
  },
];

function Brand() {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
        <Check size={24} strokeWidth={3} />
      </span>

      <span className="text-xl font-bold tracking-tight text-slate-950">
        Task<span className="text-blue-600">Flow</span>
      </span>
    </Link>
  );
}

function DashboardPreview() {
  const [tasks, setTasks] = useState([
    { title: "Finish project proposal", completed: true },
    { title: "Review today's priorities", completed: true },
    { title: "Practice DSA problems", completed: false },
    { title: "Read for 20 minutes", completed: false },
  ]);

  const completed = tasks.filter((task) => task.completed).length;
  const progress = Math.round((completed / tasks.length) * 100);

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-200/60 via-indigo-100/40 to-violet-200/60 blur-2xl" />

      <div className="absolute -right-5 top-12 h-24 w-24 rounded-full border border-blue-200/70 bg-blue-100/40" />

      <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-full bg-violet-200/40 blur-xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white shadow-2xl shadow-slate-900/10">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Check size={18} strokeWidth={3} />
            </span>
            <span className="font-bold text-slate-900">TaskFlow</span>
          </div>

          <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            You're on track
          </span>
        </div>

        <div className="p-5 sm:p-7">
          <div className="mb-6">
            <p className="text-sm text-slate-500">Your workspace</p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
              Make today count.
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Every completed task moves you forward.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {[
              {
                label: "Total tasks",
                value: tasks.length,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                label: "Completed",
                value: completed,
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              {
                label: "Pending",
                value: tasks.length - completed,
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-100 p-3 sm:p-4"
              >
                <div
                  className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}
                >
                  <CheckCircle2 size={17} />
                </div>

                <p className="text-xl font-bold text-slate-950">
                  {stat.value}
                </p>

                <p className="mt-1 text-[11px] leading-4 text-slate-500 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-semibold text-slate-900">Your tasks</h4>

              <span className="text-xs font-medium text-slate-500">
                Click to try
              </span>
            </div>

            <div className="space-y-1">
              {tasks.map((task, index) => (
                <button
                  type="button"
                  key={task.title}
                  onClick={() =>
                    setTasks((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, completed: !item.completed }
                          : item
                      )
                    )
                  }
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
                >
                  {task.completed ? (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check size={13} strokeWidth={3} />
                    </span>
                  ) : (
                    <Circle
                      className="shrink-0 text-slate-300 transition group-hover:text-blue-500"
                      size={20}
                    />
                  )}

                  <span
                    className={`min-w-0 flex-1 truncate text-sm ${
                      task.completed
                        ? "text-slate-400 line-through"
                        : "font-medium text-slate-700"
                    }`}
                  >
                    {task.title}
                  </span>

                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
                      task.completed
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {task.completed ? "Done" : "Pending"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-slate-700">
                Overall progress
              </span>

              <span className="text-sm font-bold text-blue-600">
                {progress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-xl shadow-slate-900/10 sm:flex sm:-left-7">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Sparkles size={21} />
        </span>

        <div>
          <p className="text-sm font-bold text-slate-900">
            Small wins matter.
          </p>

          <p className="mt-0.5 text-xs text-slate-500">
            Keep your momentum going
          </p>
        </div>
      </div>
    </div>
  );
}

function LandingPage() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Brand />

          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Go to Dashboard
                <ArrowRight size={16} />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Sign up
                  <ArrowRight size={16} />
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/70">
          <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

          <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-28">
            <div className="max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                <Sparkles size={16} />
                Your goals deserve a plan
              </div>

              <h1 className="text-5xl font-bold leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
                Less chaos.
                <br />
                More{" "}
                <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  getting done.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                Meet your new favorite place to organize your tasks, focus on
                what matters, and turn everyday plans into meaningful progress.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-xl shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
                  >
                    Open your dashboard
                    <ArrowRight
                      size={19}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-xl shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
                    >
                      Start organizing for free
                      <ArrowRight
                        size={19}
                        className="transition group-hover:translate-x-1"
                      />
                    </Link>

                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      I have an account
                    </Link>
                  </>
                )}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-500">
                {["Simple to use", "Your own workspace", "Built for focus"].map(
                  (item) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600" />
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="px-1 py-3 sm:px-4 lg:px-0">
              <DashboardPreview />
            </div>
          </div>
        </section>

        {/* Value Strip */}
        <section className="border-y border-slate-100 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-5 py-7 text-center sm:flex-row sm:gap-8 sm:px-8 lg:px-10">
            <p className="text-sm font-semibold text-slate-500">
              Everything you need to get moving
            </p>

            <div className="hidden h-5 w-px bg-slate-200 sm:block" />

            {[
              "Capture your ideas",
              "Keep tasks organized",
              "Celebrate progress",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-slate-600"
              >
                <Check size={16} className="text-blue-600" />
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-24 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                Made for your everyday
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Productivity, without the noise.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Everything you need to manage your to-dos in one thoughtful,
                easy-to-use workspace.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;

                const colors: Record<string, string> = {
                  blue: "bg-blue-50 text-blue-600 ring-blue-100",
                  violet: "bg-violet-50 text-violet-600 ring-violet-100",
                  emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
                  orange: "bg-orange-50 text-orange-600 ring-orange-100",
                };

                return (
                  <article
                    key={feature.title}
                    className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/5 sm:p-7"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${colors[feature.color]}`}
                    >
                      <Icon size={23} />
                    </div>

                    <h3 className="mt-6 text-lg font-bold text-slate-950">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="scroll-mt-24 border-y border-slate-100 bg-slate-50/80 py-24 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 ring-1 ring-slate-200">
                Three simple steps
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                From overwhelmed to on track.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                A better routine starts with a few small steps.
              </p>
            </div>

            <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
              <div className="absolute left-[20%] right-[20%] top-10 hidden border-t-2 border-dashed border-blue-200 md:block" />

              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <article key={step.number} className="relative text-center">
                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-100 bg-white text-blue-600 shadow-lg shadow-blue-900/5">
                      <Icon size={30} />
                      <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white ring-4 ring-slate-50">
                        {step.number.slice(1)}
                      </span>
                    </div>

                    <h3 className="mt-7 text-xl font-bold text-slate-950">
                      {step.title}
                    </h3>

                    <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="scroll-mt-24 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                <Star size={15} fill="currentColor" />
                A little love for simple things
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Make room for your best work.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                A productivity tool should make your day feel lighter, not add
                another thing to manage.
              </p>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
                >
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} size={16} fill="currentColor" />
                    ))}
                  </div>

                  <blockquote className="mt-5 flex-1 text-[15px] leading-7 text-slate-600">
                    “{testimonial.quote}”
                  </blockquote>

                  <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${testimonial.color}`}
                    >
                      {testimonial.initials}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {testimonial.name}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-5 text-center text-xs text-slate-400">
              Sample testimonials for layout demonstration. Replace these with
              genuine user feedback before publishing.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border border-white/10" />
            <div className="absolute -right-8 -top-12 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50">
                  <Sparkles size={16} />
                  Your next chapter starts here
                </span>

                <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                  Your goals are waiting.
                  <br />
                  Let's get them done.
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">
                  Bring your to-dos together, find your focus, and make
                  meaningful progress, one task at a time.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {user ? (
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50"
                    >
                      Go to Dashboard
                      <ArrowRight size={18} />
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/signup"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50"
                      >
                        Get started for free
                        <ArrowRight size={18} />
                      </Link>

                      <Link
                        to="/login"
                        className="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <div className="hidden h-48 w-48 items-center justify-center rounded-[2.5rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm lg:flex">
                <div className="flex h-32 w-32 rotate-3 items-center justify-center rounded-[2rem] bg-white shadow-xl">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-white">
                    <Check size={52} strokeWidth={3} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <Brand />

              <p className="mt-4 max-w-xs text-sm leading-7 text-slate-500">
                A calmer way to manage your tasks, stay focused, and move
                toward the things that matter to you.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500 transition hover:border-blue-200 hover:text-blue-600"
                >
                  GitHub
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500 transition hover:border-blue-200 hover:text-blue-600"
                >
                  LinkedIn
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500 transition hover:border-blue-200 hover:text-blue-600"
                >
                  Twitter
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">Product</h3>

              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li>
                  <a href="#features" className="transition hover:text-blue-600">
                    Features
                  </a>
                </li>

                <li>
                  <a
                    href="#how-it-works"
                    className="transition hover:text-blue-600"
                  >
                    How it works
                  </a>
                </li>

                <li>
                  <Link
                    to={user ? "/dashboard" : "/signup"}
                    className="transition hover:text-blue-600"
                  >
                    {user ? "Dashboard" : "Get started"}
                  </Link>
                </li>

                {!user && (
                  <li>
                    <Link
                      to="/login"
                      className="transition hover:text-blue-600"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">Explore</h3>

              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li>
                  <a
                    href="#testimonials"
                    className="transition hover:text-blue-600"
                  >
                    Testimonials
                  </a>
                </li>

                <li>
                  <a
                    href="mailto:hello@taskflow.example"
                    className="transition hover:text-blue-600"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Your workspace
              </h3>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Ready to turn your plans into progress?
              </p>

              <Link
                to={user ? "/dashboard" : "/signup"}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                {user ? "Open your dashboard" : "Create your account"}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} TaskFlow. Built for better days.</p>
            <p>One task at a time. One step closer.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;