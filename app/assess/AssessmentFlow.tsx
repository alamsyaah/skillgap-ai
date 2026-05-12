"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  icon: string;
  skill: string;
  text: string;
  sub: string;
  context: string;
  minLabel: string;
  maxLabel: string;
  labels: string[];
  followupTitle: string;
  followupSpan: string;
  options: string[];
  textarea: string;
};

const questions: Question[] = [
  {
    icon: "🤖",
    skill: "AI Tool Usage",
    text: "Seberapa nyaman kamu menggunakan AI tools dalam pekerjaan sehari-hari?",
    sub: "Rate your current proficiency using AI tools (ChatGPT, Copilot, Gemini, etc.) for real work tasks.",
    context: "Bukan apakah kamu pernah mencoba AI, tapi seberapa aktif dan efektif kamu menggunakannya untuk pekerjaan nyata — membuat draft, debug, merangkum, menganalisis, dll.",
    minLabel: "Tidak pernah pakai",
    maxLabel: "Pakai setiap hari · expert",
    labels: ["Belum", "Jarang", "Kadang", "Sering", "Expert"],
    followupTitle: "Skor rendah terdeteksi. Apa yang paling",
    followupSpan: "menghambat penggunaan AI tools",
    options: ["🔒 Belum pernah diberi akses atau lisensi AI tools", "📚 Belum pernah dapat training — tidak tahu cara pakainya", "⏰ Ada tools-nya tapi tidak sempat belajar karena pekerjaan padat", "😰 Tidak yakin output AI bisa dipercaya untuk pekerjaan nyata", "🤷 Tidak tahu AI bisa membantu pekerjaan saya yang spesifik", "🏢 Tim atau atasan tidak mendorong penggunaan AI"],
    textarea: "Mis: aku sudah coba ChatGPT tapi tidak tahu cara pakainya untuk engineering...",
  },
  {
    icon: "✍️",
    skill: "Prompt Engineering",
    text: "Seberapa baik kamu bisa menulis prompt yang menghasilkan output berkualitas dari AI?",
    sub: "Rate your ability to craft prompts that get accurate, useful AI responses for your specific work context.",
    context: "Contoh: Bisa kamu beri konteks yang tepat, menentukan format output, memecah tugas kompleks, dan memperbaiki prompt saat hasilnya tidak sesuai?",
    minLabel: "Tidak bisa nulis prompt",
    maxLabel: "Buat prompt kompleks dengan mudah",
    labels: ["Belum", "Dasar", "Cukup", "Baik", "Mahir"],
    followupTitle: "Skor rendah terdeteksi. Apa",
    followupSpan: "penyebab utama",
    options: ["📖 Tidak tahu konsep dasar prompt engineering sama sekali", "🔄 Sudah tahu teorinya tapi jarang bisa praktik langsung", "🎯 Sulit mendeskripsikan kebutuhan kerja saya ke AI dengan jelas", "📝 Tidak punya template prompt yang cocok untuk pekerjaan saya", "😤 Sering frustrasi karena hasilnya tidak sesuai — tidak tahu harus diubah apa"],
    textarea: "Mis: membuat dokumentasi teknis, debug kode, membuat email ke stakeholder...",
  },
  {
    icon: "🔐",
    skill: "Data Privacy & AI",
    text: "Seberapa paham kamu tentang risiko privasi data saat menggunakan AI tools di tempat kerja?",
    sub: "Rate your awareness of what's safe (and what's not) to input into AI tools when working with company or customer data.",
    context: "Contoh: Apakah kamu tahu data apa yang boleh atau tidak boleh dimasukkan ke ChatGPT? Apakah kamu bisa bedakan AI tools yang enterprise-safe vs consumer?",
    minLabel: "Tidak paham risikonya sama sekali",
    maxLabel: "Paham & selalu patuh aturan",
    labels: ["Tidak paham", "Kurang paham", "Cukup paham", "Paham", "Sangat paham"],
    followupTitle: "Skor rendah terdeteksi. Apa yang membuat kamu",
    followupSpan: "kurang paham soal privasi data",
    options: ["📋 Perusahaan belum pernah punya kebijakan atau panduan penggunaan AI", "🎓 Tidak pernah dapat training atau sosialisasi tentang keamanan data & AI", "😕 Tahu ada risiko tapi tidak tahu konkretnya apa yang boleh atau tidak", "🔍 Tidak bisa bedakan mana AI tools yang aman untuk data perusahaan", "👥 Tim saya tidak pernah membahas ini, jadi tidak menjadi prioritas saya"],
    textarea: "Mis: sering copy-paste error message ke ChatGPT termasuk nama tabel database...",
  },
];

const processingSteps = [
  "🔍 Mengidentifikasi gap per skill",
  "🧩 Mengelompokkan root cause tiap gap",
  "👥 Mencocokkan dengan temuan HR Discovery",
  "💡 Menyusun intervensi spesifik per cluster",
];

export function AssessmentFlow() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string[]>>({});
  const [processing, setProcessing] = useState(false);
  const [processingIndex, setProcessingIndex] = useState(0);

  useEffect(() => {
    if (!processing) return;

    setProcessingIndex(0);
    const interval = window.setInterval(() => {
      setProcessingIndex((index) => {
        if (index >= processingSteps.length) {
          window.clearInterval(interval);
          window.setTimeout(() => router.push("/dashboard"), 600);
          return index;
        }
        return index + 1;
      });
    }, 900);

    return () => window.clearInterval(interval);
  }, [processing, router]);

  const question = questions[current];
  const rating = ratings[current];
  const showFollowup = rating !== undefined && rating <= 3;

  const toggleOption = (option: string) => {
    const values = selectedOptions[current] ?? [];
    setSelectedOptions({
      ...selectedOptions,
      [current]: values.includes(option) ? values.filter((item) => item !== option) : [...values, option],
    });
  };

  return (
    <div className="grid grid-cols-[260px_1fr] items-start gap-6 max-lg:grid-cols-1">
      <aside className="side-panel">
        <div className="text-sm font-black text-slate-700">AI Literacy Assessment</div>
        <div className="mt-1 text-xs text-muted">Direkomendasikan oleh AI · Engineering Team</div>
        <div className="mt-4 grid gap-1.5">
          {["AI Tool Usage", "Prompt Engineering", "Data Privacy & AI", "Selesai"].map((label, index) => (
            <div key={label} className={`wizard-step ${!processing && current === index ? "wizard-step-active" : ""} ${processing || current > index ? "wizard-step-done" : ""} ${processing && index === 3 ? "wizard-step-active" : ""}`}>
              <span className="step-dot">{processing || current > index ? "✓" : index + 1}</span>
              {label}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3">
          <div className="mb-1.5 text-[11px] font-black uppercase tracking-wider text-green-800">Mengapa skill ini?</div>
          <p className="text-xs leading-5 text-green-800">Skill ini dipilih AI berdasarkan jawaban HR — tim sedang adopsi AI tools tanpa training formal dan belum ada kebijakan resmi.</p>
        </div>
      </aside>

      {processing ? (
        <section className="panel flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
          <div className="spinner border-t-primary" />
          <h2 className="text-[22px] font-black tracking-[-0.04em]">AI sedang menganalisis gap skill tim</h2>
          <p className="text-sm text-muted">Menggabungkan skor, root cause, dan respons teks seluruh karyawan</p>
          <div className="mt-3 grid w-full max-w-sm gap-2">
            {processingSteps.map((item, index) => (
              <div key={item} className={`rounded-xl border px-3.5 py-2.5 text-left text-[13px] font-semibold ${index < processingIndex ? "border-green-200 bg-green-50 text-emerald-700" : index === processingIndex ? "border-indigo-200 bg-indigo-50 text-primary" : "border-border bg-soft text-muted"}`}>
                {item}
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="panel">
          <div className="progress-track"><div className="progress-fill bg-gradient-to-r from-primary to-secondary" style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
          <div className="mb-6 text-xs font-semibold text-muted">Skill {current + 1} dari 3 · AI Literacy Assessment</div>
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-pill bg-indigo-50 px-2.5 py-1 text-xs font-black text-primary">{question.icon} {question.skill}</div>
          <h2 className="mb-1.5 text-xl font-bold leading-7 tracking-[-0.03em]">{question.text}</h2>
          <p className="mb-4 text-[13px] leading-6 text-muted">{question.sub}</p>
          <div className="mb-5 rounded-[14px] border border-border bg-soft px-4 py-3.5 text-[13px] leading-6 text-slate-700">
            <strong className="mb-1.5 block text-[11px] font-black uppercase tracking-wider text-muted">Konteks penilaian</strong>
            {question.context}
          </div>
          <div className="mb-3 flex justify-between text-[11px] font-bold text-muted">
            <span>{question.minLabel}</span>
            <span>{question.maxLabel}</span>
          </div>
          <div className="mb-3 flex gap-2 max-sm:gap-1.5">
            {[1, 2, 3, 4, 5].map((value) => (
              <button key={value} className={`flex flex-1 flex-col items-center gap-1 rounded-xl border-2 px-0 py-2.5 text-sm font-black transition ${rating === value ? ratingClass(value) : "border-border bg-soft text-slate-400 hover:border-indigo-500 hover:bg-indigo-50 hover:text-primary"}`} onClick={() => setRatings({ ...ratings, [current]: value })}>
                {value}<span className="text-[10px] font-bold">{question.labels[value - 1]}</span>
              </button>
            ))}
          </div>

          {showFollowup && (
            <div className="mt-6 border-t-2 border-dashed border-slate-200 pt-6">
              <div className="mb-4 flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-pill bg-gradient-to-br from-indigo-500 to-sky-500 px-2 py-1 text-[11px] font-black text-white">✦ AI</span>
                <p className="text-sm font-semibold leading-6 text-slate-700">{question.followupTitle} <span className="font-black text-primary">{question.followupSpan}</span> dalam kerjamu?</p>
              </div>
              <div className="mb-2 text-[13px] font-bold text-slate-600">Pilih semua yang relevan:</div>
              <div className="mb-4 grid gap-2">
                {question.options.map((option) => (
                  <button key={option} className={`w-full rounded-xl border px-3.5 py-3 text-left text-[13px] font-semibold transition ${selectedOptions[current]?.includes(option) ? "border-primary bg-indigo-50 text-primary" : "border-border bg-soft text-slate-700 hover:border-indigo-500 hover:bg-indigo-50 hover:text-primary"}`} onClick={() => toggleOption(option)}>
                    {option}
                  </button>
                ))}
              </div>
              <div className="mb-2 text-[13px] font-bold text-slate-600">Ceritakan lebih lanjut (opsional):</div>
              <textarea className="min-h-20 w-full resize-y rounded-[14px] border border-border bg-soft px-3.5 py-3 text-sm leading-6 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" placeholder={question.textarea} />
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <span>{current > 0 && <button className="btn btn-ghost" onClick={() => setCurrent(current - 1)}>← Sebelumnya</button>}</span>
            {current < questions.length - 1 ? <button className="btn btn-primary" onClick={() => setCurrent(current + 1)}>Skill berikutnya →</button> : <button className="btn btn-primary" onClick={() => setProcessing(true)}>Submit Assessment ✓</button>}
          </div>
        </section>
      )}
    </div>
  );
}

function ratingClass(value: number) {
  const classes: Record<number, string> = {
    1: "border-red-500 bg-red-100 text-red-600",
    2: "border-orange-500 bg-orange-50 text-orange-700",
    3: "border-warning bg-amber-100 text-amber-800",
    4: "border-success bg-emerald-100 text-emerald-800",
    5: "border-indigo-500 bg-indigo-50 text-primary",
  };
  return classes[value];
}
