import { FlowBar } from "@/components/FlowBar";
import { DashboardTabs } from "./DashboardTabs";

const metrics = [
  ["Avg Skill Score", "2.4", "dari 5 · seluruh tim", "text-danger"],
  ["Karyawan Dinilai", "48", "Engineering Team", "text-text"],
  ["Root Causes Unik", "9", "dari analisis AI", "text-primary"],
  ["Intervensi Berbeda", "4", "bukan satu program untuk semua", "text-orange"],
];

export default function DashboardPage() {
  return (
    <>
      <FlowBar statuses={["done", "done", "done", "active"]} />
      <main className="page-shell">
        <div className="page-title">
          <div>
            <h1>HR Skill Gap Dashboard</h1>
            <p>Engineering Team · 48 karyawan · Skill diidentifikasi dari HR Discovery · Root causes dari adaptive assessment.</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button className="btn btn-light">Export PDF</button>
            <button className="btn btn-primary">Buat Training Plan →</button>
          </div>
        </div>

        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4.5 py-3.5 text-[13px] leading-6 text-amber-900">
          <div className="shrink-0 text-lg">🔎</div>
          <div><strong>Berdasarkan HR Discovery:</strong> Skill ini diassess karena tim Engineering sedang adopsi AI tools tanpa training formal, mengalami perlambatan output, dan belum punya kebijakan AI. Assessment dikonfirmasi oleh data karyawan di bawah.</div>
        </div>

        <div className="mb-6 grid grid-cols-4 gap-3.5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {metrics.map(([label, value, sub, color]) => (
            <div key={label} className="card p-4.5">
              <div className="text-xs font-bold uppercase tracking-wider text-muted">{label}</div>
              <div className={`my-1 text-[32px] font-black tracking-[-0.05em] ${color}`}>{value}</div>
              <div className="text-xs text-muted">{sub}</div>
            </div>
          ))}
        </div>

        <DashboardTabs />
      </main>
    </>
  );
}
