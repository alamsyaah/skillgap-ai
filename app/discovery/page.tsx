import { FlowBar } from "@/components/FlowBar";
import { DiscoveryWizard } from "./DiscoveryWizard";

export default function DiscoveryPage() {
  return (
    <>
      <FlowBar statuses={["active", "pending", "pending", "pending"]} />
      <main className="page-shell">
        <div className="page-title">
          <div>
            <h1>HR Discovery</h1>
            <p>Answer 4 quick questions about your team. No technical knowledge needed — just describe what's actually happening.</p>
          </div>
        </div>
        <DiscoveryWizard />
      </main>
    </>
  );
}
