"use client";

import { useState } from "react";

type Tab = "gaps" | "clusters" | "quotes" | "plan";

const tabs: { id: Tab; label: string }[] = [
  { id: "gaps", label: "Root Causes" },
  { id: "clusters", label: "Cluster Karyawan" },
  { id: "quotes", label: "Suara Karyawan" },
  { id: "plan", label: "Rencana Intervensi" },
];

const rootCauses = [
  {
    title: "🤖 AI Tool Usage — avg 2.1",
    tag: "Gap Terbesar",
    tagClass: "tag-danger",
    desc: "Skor rendah mayoritas bukan karena malas — 41% tidak pernah diberi akses tools. Training apapun tidak akan efektif sebelum masalah akses diselesaikan.",
    bars: [["Belum diberi akses/lisensi tools", "41%", "bg-gradient-to-r from-red-500 to-orange-500"], ["Punya tools tapi tidak sempat belajar", "31%", "bg-gradient-to-r from-warning to-amber-300"], ["Belum pernah dapat training formal", "28%", "bg-gradient-to-r from-indigo-500 to-sky-500"]],
  },
  {
    title: "✍️ Prompt Engineering — avg 2.3",
    tag: "Gap Kritis",
    tagClass: "tag-danger",
    desc: "Mayoritas tahu konsepnya tapi tidak punya template yang relevan untuk konteks engineering. General AI courses tidak cukup — mereka butuh contoh untuk pekerjaan mereka spesifik.",
    bars: [["Tidak punya template untuk konteks kerja mereka", "52%", "bg-gradient-to-r from-red-500 to-orange-500"], ["Tahu teori tapi tidak pernah praktik", "34%", "bg-gradient-to-r from-warning to-amber-300"], ["Tidak tahu konsep dasar sama sekali", "14%", "bg-gradient-to-r from-indigo-500 to-sky-500"]],
  },
  {
    title: "🔐 Data Privacy & AI — avg 2.4",
    tag: "Risiko Compliance",
    tagClass: "tag-warning",
    desc: "67% karyawan tidak pernah menerima kebijakan AI dari perusahaan. Ini dikonfirmasi oleh HR Discovery yang menyebut belum ada kebijakan formal. Risiko sedang terjadi sekarang.",
    bars: [["Perusahaan belum punya kebijakan AI", "67%", "bg-gradient-to-r from-red-500 to-orange-500"], ["Tidak bisa bedakan tools yang aman", "22%", "bg-gradient-to-r from-warning to-amber-300"], ["Tidak pernah dapat training keamanan", "11%", "bg-gradient-to-r from-indigo-500 to-sky-500"]],
  },
];

const clusters = [
  ["🔒 \"Gerbang Akses\"", "20 orang", "Tidak pernah diberi akses AI tools. Skor rendah bukan soal kemampuan — mereka tidak punya tools-nya. Training akan sia-sia untuk cluster ini.", "→ Solusi: IT procurement + tool onboarding, bukan course", "bg-red-100 border-red-300", "tag-danger"],
  ["⏰ \"Tidak Sempat\"", "15 orang", "Punya tools, tertarik, tapi sprint selalu penuh. Mereka butuh waktu yang dilindungi, bukan konten baru.", "→ Solusi: 2 jam dedicated AI sandbox time/minggu", "bg-orange-50 border-orange-200", "tag-warning"],
  ["📚 \"Perlu Panduan\"", "8 orang", "Punya akses dan waktu, tapi tidak punya template atau contoh yang relevan untuk konteks engineering mereka. General AI courses tidak membantu.", "→ Solusi: workshop AI for Engineers (spesifik, bukan generik)", "bg-indigo-50 border-indigo-200", "tag-primary"],
  ["🚀 \"Siap Naik Level\"", "5 orang", "Sudah pakai AI setiap hari, skor tinggi, tapi ingin skill lebih advanced — automasi workflow, evaluasi model, prompt chaining.", "→ Solusi: advanced workshop + jadi internal AI champion", "bg-green-50 border-green-200", "tag-success"],
];

const interventions = [
  ["🔒 Fase 1: Rollout Tool Access (Minggu 1–2)", "20 karyawan · Segera", "tag-danger", "Provisioning lisensi GitHub Copilot + enterprise ChatGPT untuk Engineering. Tanpa ini, semua intervensi selanjutnya tidak akan efektif untuk 41% tim.", "📊 Root cause: 41% karyawan belum pernah diberi akses tools · dikonfirmasi oleh HR Discovery"],
  ["📋 Fase 2: AI Policy & Data Safety Briefing (Minggu 2–3)", "48 karyawan · Segera", "tag-danger", "Distribusikan AI Usage Policy: apa yang boleh/tidak boleh diinput, tools mana yang approved, panduan untuk code review dan dokumentasi.", "📊 Root cause: 67% belum pernah terima panduan · risiko aktif sekarang"],
  ["⏰ Fase 3: AI Sandbox Time (Minggu 3–8)", "15 karyawan · Ongoing", "tag-warning", "Alokasikan 2 jam/minggu protected learning time — AI Sandbox. Tidak perlu konten baru. Pantau dengan weekly 5-menit check-in.", "📊 Root cause: 31% punya tools tapi tidak sempat belajar · ditemukan dari assessment karyawan"],
  ["📚 Fase 4: AI for Engineers Workshop (Minggu 4–6)", "8 karyawan · 45 hari", "tag-primary", "Workshop 3 sesi untuk use case engineering spesifik: prompt untuk code review, debugging dengan AI, dokumentasi teknis, test case generation.", "📊 Root cause: 52% gap Prompt Engineering karena tidak punya template untuk konteks engineering"],
];

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("gaps");

  return (
    <section>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {tabs.map((tab) => (
          <button key={tab.id} className={`rounded-[10px] border px-3.5 py-2 text-[13px] font-bold transition ${activeTab === tab.id ? "border-primary bg-primary text-white" : "border-border bg-white text-muted hover:border-primary hover:text-primary"}`} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "gaps" && <RootCauses />}
      {activeTab === "clusters" && <Clusters />}
      {activeTab === "quotes" && <Quotes />}
      {activeTab === "plan" && <Plan />}
    </section>
  );
}

function RootCauses() {
  return (
    <div className="grid grid-cols-[1fr_0.88fr] gap-5 max-lg:grid-cols-1">
      <div className="card">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div><div className="font-black tracking-[-0.02em]">Root Cause per Skill Gap</div><div className="text-[13px] text-muted">Ini yang HR sebenarnya butuhkan — bukan hanya angka, tapi <em>mengapa</em> gap terjadi</div></div>
          <span className="tag tag-purple">AI Analysis</span>
        </div>
        <div className="grid gap-3">
          {rootCauses.map((cause) => <Insight key={cause.title} {...cause} />)}
        </div>
      </div>
      <div className="grid content-start gap-4">
        <div className="card">
          <div className="mb-1 font-black">Validasi HR Discovery → Assessment</div>
          <div className="mb-4 text-[13px] text-muted">Seberapa sesuai temuan assessment dengan prediksi HR Discovery</div>
          <div className="grid gap-2">
            <Note color="green">✅ <strong>Konfirmasi:</strong> HR menduga "team struggles with new tools" → 41% memang tidak punya akses tools sama sekali</Note>
            <Note color="green">✅ <strong>Konfirmasi:</strong> HR tidak punya kebijakan AI → 67% karyawan confirm belum pernah terima panduan</Note>
            <Note color="amber">🆕 <strong>Temuan baru:</strong> 31% punya tools tapi tidak sempat belajar — ini tidak terdeteksi dari HR Discovery saja</Note>
          </div>
        </div>
        <div className="card">
          <div className="mb-3 font-black">Skor Tim vs Industri Benchmark</div>
          <div className="grid gap-3">
            {[["AI Tool Usage", "2.1", "3.4", "42%"], ["Prompt Engineering", "2.3", "3.1", "46%"], ["Data Privacy & AI", "2.4", "3.6", "48%"]].map(([skill, score, bench, width]) => <Bar key={skill} label={skill} value={`${score} vs ${bench} benchmark`} width={width} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function Insight({ title, tag, tagClass, desc, bars }: { title: string; tag: string; tagClass: string; desc: string; bars: string[][] }) {
  return <div className="rounded-2xl border border-border bg-soft p-4"><div className="mb-2.5 flex items-start justify-between gap-3"><div className="text-sm font-black">{title}</div><span className={`tag ${tagClass}`}>{tag}</span></div><p className="mb-3 text-[13px] leading-6 text-muted">{desc}</p><div className="grid gap-3">{bars.map(([label, value, color]) => <Bar key={label} label={label} value={value} width={value} color={color} />)}</div></div>;
}

function Bar({ label, value, width, color = "bg-gradient-to-r from-red-500 to-orange-500" }: { label: string; value: string; width: string; color?: string }) {
  return <div><div className="mb-1 flex justify-between text-[13px] font-bold"><span>{label}</span><span className="text-danger">{value}</span></div><div className="h-2 overflow-hidden rounded-pill bg-slate-200"><span className={`block h-full rounded-pill ${color}`} style={{ width }} /></div></div>;
}

function Note({ children, color }: { children: React.ReactNode; color: "green" | "amber" }) {
  return <div className={`rounded-xl border p-3 text-[13px] leading-6 ${color === "green" ? "border-green-200 bg-green-50 text-green-800" : "border-amber-200 bg-amber-50 text-amber-800"}`}>{children}</div>;
}

function Clusters() {
  return <div className="card"><div className="mb-1 font-black">4 Cluster Karyawan Berdasarkan Root Cause</div><div className="mb-5 text-[13px] text-muted">AI mengelompokkan karyawan berdasarkan <em>penyebab</em> gap — bukan hanya besarnya. Setiap cluster butuh intervensi berbeda.</div><div className="grid grid-cols-2 gap-3.5 max-lg:grid-cols-1">{clusters.map(([title, count, desc, solution, cardClass, tagClass]) => <div key={title} className={`rounded-[18px] border p-4 ${cardClass}`}><div className="mb-2.5 flex justify-between gap-3"><div className="text-[15px] font-black">{title}</div><span className={`tag ${tagClass}`}>{count}</span></div><p className="mb-2.5 text-[13px] leading-6 text-slate-700">{desc}</p><div className="text-xs font-black text-slate-800">{solution}</div></div>)}</div></div>;
}

function Quotes() {
  return <div className="grid grid-cols-[1fr_0.88fr] gap-5 max-lg:grid-cols-1"><QuoteCard title="Suara Karyawan — AI Tool Usage" sub="Dipilih AI dari open-text responses · dianonimkan" quotes={["Saya tertarik pakai AI tapi IT bilang ChatGPT diblokir dan tidak ada tools resmi yang disediakan. Jadi mau belajar pun tidak bisa.", "Setiap sprint selalu penuh. Tahu seharusnya belajar AI tapi tidak ada waktu yang dialokasikan.", "Saya pakai ChatGPT tapi semua tutorial di internet tentang nulis artikel atau essay, bukan untuk engineering. Tidak tahu cara pakainya untuk kerja saya."]} /><QuoteCard title="Suara Karyawan — Data Privacy" sub="Ini menunjukkan risiko nyata yang terjadi sekarang" orange quotes={["Saya sering paste error message ke ChatGPT termasuk yang ada nama tabel database internal. Tidak tahu itu aman atau tidak — tidak ada yang pernah bilang.", "Tidak ada yang pernah jelasin mana yang boleh dan tidak boleh diinput ke AI. Saya asumsikan kalau tidak ada nama user harusnya aman."]} /></div>;
}

function QuoteCard({ title, sub, quotes, orange = false }: { title: string; sub: string; quotes: string[]; orange?: boolean }) {
  return <div className="card"><div className="mb-1 font-black">{title}</div><div className="mb-4 text-[13px] text-muted">{sub}</div><div className="grid gap-2">{quotes.map((quote, index) => <div key={quote} className={`border-l-4 ${orange ? "border-orange bg-orange-50" : "border-primary bg-soft"} rounded-[14px] px-3.5 py-3 text-[13px] italic leading-6 text-slate-700`}>"{quote}"<div className="mt-1.5 text-[11px] font-bold not-italic text-muted">{index === 0 ? "Backend Engineer" : "Software Engineer"} · skor: {index + 1}</div></div>)}</div></div>;
}

function Plan() {
  return <div className="grid grid-cols-[1fr_0.88fr] gap-5 max-lg:grid-cols-1"><div className="card"><div className="mb-4 flex items-center justify-between"><div><div className="font-black tracking-[-0.02em]">Rencana Intervensi</div><div className="text-[13px] text-muted">Spesifik per root cause — bukan satu program untuk semua 48 orang</div></div><span className="tag tag-purple">AI-Generated</span></div><div className="grid gap-3">{interventions.map(([title, badge, tagClass, desc, evidence]) => <div key={title} className="rounded-2xl border border-border bg-soft p-4"><div className="mb-2 flex items-start justify-between gap-3"><h3 className="text-sm font-black tracking-[-0.02em]">{title}</h3><span className={`tag ${tagClass}`}>{badge}</span></div><p className="text-[13px] leading-6 text-muted">{desc}</p><div className="mt-2 rounded-[10px] bg-indigo-50 px-2.5 py-2 text-xs font-semibold leading-5 text-primary">{evidence}</div></div>)}</div></div><div className="grid content-start gap-4"><div className="card"><div className="mb-3 font-black">Proyeksi Dampak (3 Bulan)</div><div className="grid gap-2"><Impact title="📈 Target kenaikan skill score" value="+1.4" sub="Dari 2.4 → 3.8 rata-rata tim" color="green" /><Impact title="💰 Budget vs kursus generik" value="3× lebih efisien" sub="Karena 4 intervensi tepat sasaran vs 1 kursus untuk semua" color="indigo" /><Impact title="⚡ Produktivitas tim" value="+25%" sub="Estimasi dari adopsi AI tools di Engineering teams serupa" color="orange" /></div></div><div className="card"><div className="mb-3 font-black">Langkah Selanjutnya</div><div className="grid gap-2 text-[13px] text-slate-700">{["Share laporan ke Head of Engineering & IT Manager", "Assign PIC per fase intervensi dengan deadline", "Re-assessment 90 hari untuk ukur efektivitas", "Replikasi discovery flow ke tim Product dan Sales"].map((item) => <div key={item} className="flex gap-2.5"><span className="grid size-5 shrink-0 place-items-center rounded-md bg-green-100 text-[10px]">→</span>{item}</div>)}</div></div></div></div>;
}

function Impact({ title, value, sub, color }: { title: string; value: string; sub: string; color: "green" | "indigo" | "orange" }) {
  const classes = { green: "border-green-200 bg-green-50 text-green-800", indigo: "border-indigo-200 bg-indigo-50 text-primary", orange: "border-orange-200 bg-orange-50 text-orange" };
  return <div className={`rounded-xl border p-3 ${classes[color]}`}><div className="text-xs font-black">{title}</div><div className="text-2xl font-black">{value}</div><div className="text-xs text-muted">{sub}</div></div>;
}
