type FlowStatus = "done" | "active" | "pending";

type FlowStep = {
  label: string;
  status: FlowStatus;
};

const defaultSteps = [
  "HR Discovery",
  "AI Recommends Skills",
  "Employee Assessment",
  "HR Dashboard",
];

export function FlowBar({ statuses }: { statuses: FlowStatus[] }) {
  const steps: FlowStep[] = defaultSteps.map((label, index) => ({
    label,
    status: statuses[index] ?? "pending",
  }));

  return (
    <div className="border-b border-white/10 bg-slate-950 px-8 max-lg:hidden">
      <div className="mx-auto flex max-w-page items-stretch">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className={`flex items-center gap-2 py-2.5 pr-4 text-xs font-black ${
              step.status === "done"
                ? "text-green-400"
                : step.status === "active"
                  ? "text-indigo-300"
                  : "text-slate-600"
            }`}
          >
            {index > 0 && <span className="mr-4 text-slate-700">→</span>}
            <span
              className={`grid size-5 place-items-center rounded-pill text-[10px] ${
                step.status === "done"
                  ? "bg-green-900 text-green-400"
                  : step.status === "active"
                    ? "bg-primary text-white"
                    : "bg-slate-800 text-slate-600"
              }`}
            >
              {step.status === "done" ? "✓" : index + 1}
            </span>
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
}
