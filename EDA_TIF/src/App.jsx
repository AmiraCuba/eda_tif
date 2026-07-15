import { useEffect, useMemo, useState } from "react";
import { AppSidebar } from "./components/AppSidebar";
import { EmptyWorkspace } from "./components/EmptyWorkspace";
import { structureRegistry } from "./structures/structureRegistry";

export default function App() {
  const enabledStructures = useMemo(
    () => structureRegistry.filter((structure) => structure.enabled),
    [],
  );
  const [selectedId, setSelectedId] = useState(
    enabledStructures[0]?.id ?? null,
  );

  useEffect(() => {
    if (!enabledStructures.some((structure) => structure.id === selectedId)) {
      setSelectedId(enabledStructures[0]?.id ?? null);
    }
  }, [enabledStructures, selectedId]);

  const selectedStructure = enabledStructures.find(
    (structure) => structure.id === selectedId,
  );
  const SelectedComponent = selectedStructure?.component;

  return (
    <main className="app-shell">
      <AppSidebar
        structures={enabledStructures}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <section className="app-content">
        <header className="page-header">
          <div>
            <p className="eyebrow">Laboratorio interactivo</p>
            <h1>Simulador de estructuras de datos</h1>
            <p className="page-summary">
              Observa cómo cambia cada estructura mientras ejecutas sus
              operaciones fundamentales.
            </p>
          </div>
          <div className="academic-badge">
            <span className="badge-dot" />
            Proyecto académico
          </div>
        </header>

        {SelectedComponent ? <SelectedComponent /> : <EmptyWorkspace />}

        <footer className="app-footer">
          <span>ED Lab · Simulación visual</span>
          <span>React + Vite · JavaScript</span>
        </footer>
      </section>
    </main>
  );
}
