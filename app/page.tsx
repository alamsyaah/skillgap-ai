import Link from "next/link";

const steps = [
  {
    num: "1",
    badge: true,
    title: "HR describes their team's problems",
    text: "HR answers plain-language questions: what challenges is your team facing? What's slowing them down? What's changing in your company?",
    gradient: "from-warning to-orange",
    highlight: true,
  },
  {
    num: "2",
    badge: true,
    title: "AI maps problems → relevant skills",
    text: "AI reasons over the answers and recommends which skills to actually assess — e.g. 'Your team is adopting AI tools but you have no training → assess AI literacy.'",
    gradient: "from-indigo-500 to-sky-500",
    highlight: true,
  },
  {
    num: "3",
    title: "Employees self-assess with root cause follow-ups",
    text: "Low scores trigger adaptive questions: Is the gap about training? Tool access? Lack of practice time? Confidence?",
    gradient: "from-success to-secondary",
    highlight: false,
  },
  {
    num: "4",
    title: "HR gets precise, targeted interventions",
    text: "Not 'run a course for everyone.' Instead: specific actions per root cause cluster — so every training dollar lands on the right problem.",
    gradient: "from-primary to-success",
    highlight: false,
  },
];

const flow = [
  ["🔎", "HR Discovery", "Answer questions about team challenges — no technical knowledge needed", true],
  ["✦", "AI Recommends Skills to Assess", "AI maps your challenges to specific skill gaps — with reasoning", true],
  ["📝", "Employee Self-Assessment", "Adaptive — low scores trigger follow-up to find root causes", false],
  ["📊", "HR Gets Actionable Insights", "Root causes + targeted interventions — not just a score", false],
] as const;

const withoutDiscovery = [
  "HR sees low productivity → guesses 'maybe they need AI training'",
  "Launches 'AI Prompting Bootcamp' for all 50 employees",
  "20 employees can't access AI tools — training is useless for them",
  "15 employees already know prompting — feel it's a waste of time",
  "Result: high cost, low impact, team frustrated",
];

const withDiscovery = [
  "HR describes: 'Team is slow, adopting new AI tools, no formal training yet'",
  "AI recommends: assess AI Tool Usage + Prompt Engineering specifically",
  "Assessment reveals: 40% blocked by missing tool access, not knowledge",
  "HR fixes tool access first, runs targeted course only for those who need it",
  "Result: 3× more efficient, gap measurably closed in 90 days",
];

export default function Home() {
  return (
    <>
      <section className="bg-[radial-gradient(circle_at_10%_20%,rgba(99,102,241,0.5)_0%,transparent_35%),radial-gradient(circle_at_88%_15%,rgba(14,165,233,0.4)_0%,transparent_30%),linear-gradient(135deg,#0f172a,#1e1b4b)] px-8 py-20 text-white max-sm:px-5 max-sm:py-14">
        <div className="mx-auto grid max-w-page grid-cols-2 items-center gap-12 max-lg:grid-cols-1">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-blue-200">
              ⚡ Diagnostic Skill Assessment
            </div>
            <h1 className="mb-5 text-[clamp(36px,5.5vw,60px)] font-black leading-none tracking-[-0.07em]">
              Start with "what does your team actually need?"
            </h1>
            <p className="mb-7 text-[17px] leading-7 text-slate-300">
              Most skill assessments assume HR already knows which skills to measure. SkillGap AI starts by asking about your team's real problems — then figures out which skills to assess, and why each gap exists.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="/discovery">
                Start HR Discovery →
              </Link>
              <Link className="btn btn-secondary" href="/dashboard">
                View Sample Report
              </Link>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/15 bg-white/10 p-6">
            <div className="mb-4 text-[11px] font-black uppercase tracking-widest text-slate-400">The 4-Step Flow</div>
            <div className="grid gap-2">
              {flow.map(([icon, title, text, highlight], index) => (
                <div key={title}>
                  <div className={`flex items-center gap-3 rounded-[14px] border p-3 ${highlight ? "border-indigo-400/30 bg-indigo-500/20" : "border-white/10 bg-white/5"}`}>
                    <div className={`grid size-8 shrink-0 place-items-center rounded-[10px] text-sm ${highlight ? "bg-indigo-500/30" : "bg-white/10"}`}>{icon}</div>
                    <div className="flex-1">
                      <div className="text-[13px] font-black text-white">
                        {title} {highlight && <span className="rounded-pill bg-warning px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950">NEW</span>}
                      </div>
                      <div className="mt-0.5 text-xs text-slate-400">{text}</div>
                    </div>
                  </div>
                  {index < flow.length - 1 && <div className="py-0.5 text-center text-xs text-slate-700">↓</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="page-shell">
        <div className="page-title">
          <div>
            <h2>Why it starts with HR discovery</h2>
            <p>HR shouldn't need to know which skills their team is missing before running an assessment — that's the whole point of the tool.</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {steps.map((step) => (
            <div key={step.num} className={`card ${step.highlight ? "border-indigo-200 bg-violet-50" : ""}`}>
              <div className={`mb-4 grid size-9 place-items-center rounded-[10px] bg-gradient-to-br ${step.gradient} text-[15px] font-black text-white`}>
                {step.num}
              </div>
              {step.badge && <div className="mb-2 inline-flex rounded-pill bg-warning px-2 py-1 text-[10px] font-black uppercase text-slate-950">NEW</div>}
              <h3 className="mb-2 text-[15px] font-black tracking-[-0.02em]">{step.title}</h3>
              <p className="text-[13px] leading-6 text-muted">{step.text}</p>
            </div>
          ))}
        </div>

        <section className="mt-14">
          <div className="page-title">
            <div>
              <h2>The difference it makes</h2>
              <p>Same team, same score — completely different interventions depending on whether you asked why.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
            <ComparisonCard title="❌ Without Discovery" items={withoutDiscovery} danger />
            <ComparisonCard title="✅ With SkillGap AI Discovery" items={withDiscovery} />
          </div>
        </section>
      </main>
    </>
  );
}

function ComparisonCard({ title, items, danger = false }: { title: string; items: string[]; danger?: boolean }) {
  return (
    <div className={`card ${danger ? "border-red-300 bg-red-50/40" : "border-emerald-300 bg-emerald-50"}`}>
      <div className={`mb-4 text-xs font-black uppercase tracking-wider ${danger ? "text-red-800" : "text-emerald-800"}`}>{title}</div>
      <div className="grid gap-2.5 text-[13px] leading-6 text-slate-700">
        {items.map((item, index) => (
          <div key={item} className={`rounded-[10px] px-3 py-2.5 ${danger ? "bg-red-100" : "bg-green-100"} ${index === items.length - 1 ? danger ? "font-bold text-red-800" : "font-bold text-emerald-800" : ""}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
