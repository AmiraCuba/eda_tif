import { CircleDot } from "lucide-react";

export function CanvasShell({ type, view = "LINEAL", children }) {
  return (
    <div className={`structure-canvas canvas-${type}`}>
      <div className="canvas-grid" />
      <div className="canvas-tag">VISTA · {view}</div>
      {children}
    </div>
  );
}

export function EmptyStructure() {
  return (
    <div className="empty-state">
      <CircleDot size={28} />
      <strong>La estructura está vacía</strong>
      <span>Inserta un valor para crear el primer elemento.</span>
    </div>
  );
}
