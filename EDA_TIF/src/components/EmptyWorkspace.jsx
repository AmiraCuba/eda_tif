import { Boxes, Puzzle } from "lucide-react";

export function EmptyWorkspace() {
  return (
    <section className="empty-workspace">
      <div className="empty-workspace-icon">
        <Boxes size={28} />
      </div>
      <p className="eyebrow">Contenedor preparado</p>
      <h2>Aún no hay estructuras activadas</h2>
      <p>
        Cada integrante puede agregar su componente dentro de
        <code> src/structures </code> y registrarlo cuando esté listo.
      </p>
      <div className="empty-workspace-hint">
        <Puzzle size={17} />
        Cambia <code>enabled</code> a <code>true</code> en
        <code> structureRegistry.js</code>.
      </div>
    </section>
  );
}
