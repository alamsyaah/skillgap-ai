import { FlowBar } from "@/components/FlowBar";
import { AssessmentFlow } from "./AssessmentFlow";

export default function AssessPage() {
  return (
    <>
      <FlowBar statuses={["done", "done", "active", "pending"]} />
      <main className="page-shell">
        <div className="page-title">
          <div>
            <h1>Employee Skill Assessment</h1>
            <p>Skills dipilih berdasarkan hasil HR Discovery. Beri skor rendah — AI akan tanya kenapa.</p>
          </div>
        </div>
        <AssessmentFlow />
      </main>
    </>
  );
}
