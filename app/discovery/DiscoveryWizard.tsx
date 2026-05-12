"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Stage = "questions" | "thinking" | "result";

const departments = [
  ["⚙️", "Engineering", "Software, data, infrastructure"],
  ["🎯", "Product", "Product management, design"],
  ["📞", "Customer Ops", "Support, success, service"],
  ["📈", "Sales", "Sales, account management"],
  ["📣", "Marketing", "Content, growth, brand"],
  ["🏢", "Operations", "HR, finance, legal, general ops"],
];

const sizes = [
  ["👤", "Small (1–15 people)", ""],
  ["👥", "Medium (16–50 people)", ""],
  ["🏢", "Large (50+ people)", ""],
];

const challenges = [
  "🐌 Work takes too long — output is slow compared to what's expected",
  "🔧 Team struggles to use new tools or technology effectively",
  "📊 Decisions are made on gut feel — not enough data or analysis",
  "💬 Communication and collaboration across teams is difficult",
  "😤 Output quality is inconsistent — errors and rework are common",
  "😰 Team members seem overwhelmed or burned out",
  "🤷 Team doesn't know how to prioritize — lots of activity but low impact",
  "🚫 Team is resistant to change — new processes don't stick",
];

const changes = [
  "🤖 Adopting AI tools or automation — team needs to learn how to use them",
  "📈 Rapid team scaling — new hires onboarding faster than knowledge transfer",
  "🌏 Expanding to new markets — different customer needs and communication styles",
  "🏠 Moving to remote or hybrid work — coordination and async skills needed",
  "🎯 New company strategy or OKRs — team needs different focus areas",
  "📋 New compliance or regulatory requirements affecting how work is done",
  "🔄 Process overhaul — old ways of working are being replaced",
  "👨‍💼 Leadership change — new management expectations and culture",
];

const thinkingSteps = [
  "🔎 Membaca pola tantangan tim",
  "🗺️ Memetakan ke domain skill yang relevan",
  "⚖️ Memprioritaskan berdasarkan dampak",
  "📋 Menyusun rekomendasi assessment",
];

const recommendations = [
  ["🤖", "AI Tool Usage & Adoption", "Kamu menyebut 'adopting AI tools' dan 'team struggles with new tools' — ini skill fundamental yang harus diassess dulu sebelum yang lain.", "Prioritas Tinggi", "tag-primary"],
  ["✍️", "Prompt Engineering (AI Input Skills)", "Tim yang baru mengadopsi AI tools hampir selalu struggle di sini — mereka pakai AI tapi hasilnya tidak berguna karena tidak tahu cara 'berbicara' dengan AI secara efektif.", "Prioritas Tinggi", "tag-primary"],
  ["🔐", "Data Privacy & AI Safety", "Tim belum punya kebijakan AI formal — ada risiko karyawan memasukkan data sensitif ke tools tanpa sadar. Ini perlu diassess sebelum adopsi meluas.", "Risiko Compliance", "tag-warning"],
];

export function DiscoveryWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [stage, setStage] = useState<Stage>("questions");
  const [dept, setDept] = useState("");
  const [size, setSize] = useState("");
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [selectedChanges, setSelectedChanges] = useState<string[]>([]);
  const [previousTraining, setPreviousTraining] = useState("");
  const [thinkingIndex, setThinkingIndex] = useState(0);

  useEffect(() => {
    if (stage !== "thinking") return;

    setThinkingIndex(0);
    const interval = window.setInterval(() => {
      setThinkingIndex((current) => {
        if (current >= thinkingSteps.length) {
          window.clearInterval(interval);
          window.setTimeout(() => setStage("result"), 400);
          return current;
        }
        return current + 1;
      });
    }, 900);

    return () => window.clearInterval(interval);
  }, [stage]);

  const toggle = (value: string, values: string[], setter: (values: string[]) => void) => {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  };

  const activeSideStep = stage === "result" || stage === "thinking" ? 5 : step;

  return (
    <div className="grid grid-cols-[260px_1fr] items-start gap-6 max-lg:grid-cols-1">
      <aside className="side-panel">
        <div className="text-sm font-black text-slate-700">HR Discovery Wizard</div>
        <div className="mt-1 text-xs text-muted">~3 minutes · 4 questions</div>
        <div className="mt-4 grid gap-1.5">
          {["Team Context", "Current Challenges", "What's Changing", "Desired Outcome", "AI Recommendation"].map((label, index) => {
            const itemStep = index + 1;
            return (
              <div key={label} className={`wizard-step ${activeSideStep === itemStep ? "wizard-step-active" : ""} ${activeSideStep > itemStep ? "wizard-step-done" : ""}`}>
                <span className="step-dot">{itemStep === 5 ? "✦" : activeSideStep > itemStep ? "✓" : itemStep}</span>
                {label}
              </div>
            );
          })}
        </div>
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <div className="mb-1.5 text-[11px] font-black uppercase tracking-wider text-amber-800">Why these questions?</div>
          <p className="text-xs leading-5 text-amber-900">We need to understand your team's real context before recommending what to assess. A generic skill checklist won't tell you what <em>your</em> team actually needs.</p>
        </div>
      </aside>

      {stage === "questions" && (
        <section className="panel">
          <div className="progress-track"><div className="progress-fill bg-gradient-to-r from-warning to-orange" style={{ width: `${step * 25}%` }} /></div>
          <div className="mb-6 text-xs font-semibold text-muted">Step {step} of 4 · HR Discovery</div>
          {step === 1 && (
            <>
              <QuestionTitle title="Tell us about your team" sub="This helps AI understand the work context when recommending which skills matter most." />
              <FieldLabel>What is your team's primary function?</FieldLabel>
              <div className="mb-5 grid grid-cols-3 gap-2.5 max-xl:grid-cols-2 max-sm:grid-cols-1">
                {departments.map(([icon, label, desc]) => <Choice key={label} icon={icon} label={label} desc={desc} selected={dept === label} onClick={() => setDept(label)} />)}
              </div>
              <FieldLabel>Team size</FieldLabel>
              <div className="mb-6 grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
                {sizes.map(([icon, label, desc]) => <Choice key={label} icon={icon} label={label} desc={desc} selected={size === label} onClick={() => setSize(label)} />)}
              </div>
              <Nav next={() => setStep(2)} />
            </>
          )}
          {step === 2 && (
            <>
              <QuestionTitle title="What challenges is your team facing right now?" sub="Select all that apply. Be honest — these patterns help AI identify which skill gaps are likely causing the problems." />
              <CheckGrid items={challenges} selected={selectedChallenges} onToggle={(item) => toggle(item, selectedChallenges, setSelectedChallenges)} />
              <Nav back={() => setStep(1)} next={() => setStep(3)} />
            </>
          )}
          {step === 3 && (
            <>
              <QuestionTitle title="What's changing in your company that requires new skills?" sub="Skill gaps often emerge from change. Select what's happening so AI can map the upcoming skill needs." />
              <CheckGrid items={changes} selected={selectedChanges} onToggle={(item) => toggle(item, selectedChanges, setSelectedChanges)} />
              <Nav back={() => setStep(2)} next={() => setStep(4)} />
            </>
          )}
          {step === 4 && (
            <>
              <QuestionTitle title="In your own words, what does success look like?" sub="Describe what you want to improve. Don't worry about using the right HR terminology — just describe it naturally." />
              <textarea className="mb-5 min-h-28 w-full resize-y rounded-[14px] border border-border bg-soft px-4 py-3.5 text-sm leading-6 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" placeholder="Contoh: 'Tim engineering saya butuh 3× lebih lama dari biasanya untuk menyelesaikan dokumentasi...'" />
              <FieldLabel>Have you run any skill training or assessments before?</FieldLabel>
              <div className="mb-6 grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
                {["No — this is our first time", "Yes — but results weren't actionable"].map((label, index) => <Choice key={label} icon={index === 0 ? "❌" : "📋"} label={label} desc={index === 0 ? "No prior training or assessment data exists" : "We got scores but didn't know what to do with them"} selected={previousTraining === label} onClick={() => setPreviousTraining(label)} />)}
              </div>
              <Nav back={() => setStep(3)} next={() => setStage("thinking")} nextLabel="Analyze with AI ✦" />
            </>
          )}
        </section>
      )}

      {stage === "thinking" && (
        <section className="panel flex min-h-[360px] flex-col items-center justify-center gap-4 text-center">
          <div className="spinner border-t-warning" />
          <h2 className="text-xl font-black tracking-[-0.04em]">AI sedang menganalisis jawaban HR...</h2>
          <p className="text-sm text-muted">Memetakan tantangan tim ke skill gaps yang relevan</p>
          <div className="mt-3 grid w-full max-w-sm gap-2">
            {thinkingSteps.map((item, index) => (
              <div key={item} className={`rounded-xl border px-3.5 py-2.5 text-left text-[13px] font-semibold ${index < thinkingIndex ? "border-green-200 bg-green-50 text-emerald-700" : index === thinkingIndex ? "border-amber-200 bg-amber-50 text-amber-800" : "border-border bg-soft text-muted"}`}>
                {item}
              </div>
            ))}
          </div>
        </section>
      )}

      {stage === "result" && (
        <section className="panel">
          <div className="mb-6 flex items-start gap-3.5 rounded-[18px] border border-indigo-200 bg-gradient-to-br from-indigo-50 to-green-50 p-5">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-lg text-white">✦</div>
            <div>
              <div className="mb-1 text-[15px] font-black">AI telah menganalisis konteks tim kamu</div>
              <div className="text-[13px] leading-6 text-muted">Berdasarkan jawaban HR, ini adalah skill yang paling relevan untuk diassess — beserta alasannya.</div>
            </div>
          </div>
          <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-[13px] leading-6 text-amber-900">
            <strong>Reasoning AI:</strong> Tim Engineering kamu sedang mengadopsi AI tools tanpa training formal, menghadapi keterlambatan output, dan belum punya kebijakan penggunaan AI. Ini adalah pola yang sangat umum — gap bukan di motivasi, tapi di <em>akses, panduan, dan cara kerja yang belum beradaptasi</em>.
          </div>
          <FieldLabel>Skill yang direkomendasikan untuk diassess (kamu bisa sesuaikan):</FieldLabel>
          <div className="mb-6 grid gap-3">
            {recommendations.map(([icon, title, desc, badge, tagClass]) => (
              <div key={title} className="flex items-start gap-3.5 rounded-2xl border-2 border-primary bg-indigo-50 p-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-200 text-lg">{icon}</div>
                <div className="flex-1">
                  <div className="mb-1 text-[15px] font-black">{title}</div>
                  <div className="text-xs leading-5 text-indigo-800">{desc}</div>
                </div>
                <span className={`tag ${tagClass}`}>{badge}</span>
              </div>
            ))}
          </div>
          <div className="mb-5 rounded-xl border border-border bg-soft px-3.5 py-3 text-[13px] leading-6 text-muted">
            <strong>Skill yang <em>tidak</em> direkomendasikan saat ini:</strong> Data Analysis, Communication Skills, Leadership — berdasarkan jawaban HR, tantangan utama tim bukan di sana.
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button className="btn btn-ghost" onClick={() => { setStage("questions"); setStep(4); }}>← Ubah jawaban</button>
            <button className="btn btn-primary" onClick={() => router.push("/assess")}>Mulai Assessment Karyawan →</button>
          </div>
        </section>
      )}
    </div>
  );
}

function QuestionTitle({ title, sub }: { title: string; sub: string }) {
  return <><h2 className="mb-2 text-[22px] font-black leading-tight tracking-[-0.04em]">{title}</h2><p className="mb-6 text-sm leading-6 text-muted">{sub}</p></>;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 text-[13px] font-bold text-slate-600">{children}</div>;
}

function Choice({ icon, label, desc, selected, onClick }: { icon: string; label: string; desc: string; selected: boolean; onClick: () => void }) {
  return <button className={`choice-btn ${selected ? "choice-btn-selected" : ""}`} onClick={onClick}><span className="text-xl">{icon}</span><span className="flex-1"><span className="block text-xs font-bold">{label}</span>{desc && <span className="block text-[11px] font-medium leading-5 text-muted">{desc}</span>}</span></button>;
}

function CheckGrid({ items, selected, onToggle }: { items: string[]; selected: string[]; onToggle: (item: string) => void }) {
  return <div className="mb-6 grid grid-cols-2 gap-2 max-lg:grid-cols-1">{items.map((item) => <button key={item} className={`checkbox-pill ${selected.includes(item) ? "checkbox-pill-selected" : ""}`} onClick={() => onToggle(item)}><span className={`grid size-[18px] shrink-0 place-items-center rounded-md border-2 text-[11px] font-black ${selected.includes(item) ? "border-primary bg-primary text-white" : "border-slate-300 bg-white"}`}>{selected.includes(item) ? "✓" : ""}</span><span>{item}</span></button>)}</div>;
}

function Nav({ back, next, nextLabel = "Next →" }: { back?: () => void; next: () => void; nextLabel?: string }) {
  return <div className="flex items-center justify-between"><span>{back && <button className="btn btn-ghost" onClick={back}>← Back</button>}</span><button className="btn btn-primary" onClick={next}>{nextLabel}</button></div>;
}
