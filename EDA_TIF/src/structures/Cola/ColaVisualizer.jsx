import { ArrowRight, CornerDownLeft } from "lucide-react";
import { CanvasShell, EmptyStructure } from "../../components/visualizers/CanvasShell";

export function ColaVisualizer({ values }) {
  return (
    <CanvasShell type="queue">
      {values.length === 0 ? (
        <EmptyStructure />
      ) : (
        <div className="queue-stage">
          <div className="queue-label start"><span>SALE</span><strong>Frente</strong></div>
          <CornerDownLeft className="queue-flow exit" size={24} />
          <div className="queue-values">
            {values.map((value, index) => (
              <div
                className={`data-node queue-node ${index === 0 ? "current" : ""}`}
                key={`${value}-${index}`}
              >
                {value}
              </div>
            ))}
          </div>
          <ArrowRight className="queue-flow" size={25} />
          <div className="queue-label"><span>ENTRA</span><strong>Final</strong></div>
        </div>
      )}
    </CanvasShell>
  );
}
