import { useStructureSimulator } from "../hooks/useStructureSimulator";
import { SimulatorWorkspace } from "./SimulatorWorkspace";
import { TheoryPanel } from "./TheoryPanel";

export function StructureModule({ structure, Visualizer }) {
  const simulator = useStructureSimulator(structure);

  return (
    <div className="workspace-layout">
      <SimulatorWorkspace
        structure={structure}
        simulator={simulator}
        Visualizer={Visualizer}
      />
      <TheoryPanel structure={structure} />
    </div>
  );
}
