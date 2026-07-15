import { ArrowRight, CircleDot } from "lucide-react";
import { CanvasShell, EmptyStructure } from "../../components/visualizers/CanvasShell";

export function ListaVisualizer({ values }) {
  return (
    <CanvasShell type="list">
      {values.length === 0 ? (
        <EmptyStructure />
      ) : (
        <div className="list-stage">
          <span className="head-label">HEAD</span>
          <div className="list-values">
            {values.map((value, index) => (
              <div className="list-node-group" key={`${value}-${index}`}>
                <div className="linked-node">
                  <span className="linked-value">{value}</span>
                  <span className="linked-pointer"><CircleDot size={12} /></span>
                </div>
                {index < values.length - 1 ? (
                  <ArrowRight className="list-arrow" size={24} />
                ) : (
                  <span className="null-label">NULL</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </CanvasShell>
  );
}
