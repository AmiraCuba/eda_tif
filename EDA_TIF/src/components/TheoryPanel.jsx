import { BookOpen, Check, Gauge } from "lucide-react";

export function TheoryPanel({ structure }) {
  return (
    <aside className="theory-panel">
      <div className="theory-section intro-section">
        <div className="panel-icon"><BookOpen size={18} /></div>
        <p className="eyebrow">Cómo funciona</p>
        <h3>{structure.principleLabel}</h3>
        <p>{structure.description}</p>
      </div>

      <div className="theory-section">
        <div className="section-title">
          <Gauge size={17} />
          <h4>Complejidad temporal</h4>
        </div>
        <div className="complexity-table">
          {structure.complexity.map(([operation, cost]) => (
            <div className="complexity-row" key={operation}>
              <span>{operation}</span>
              <code>{cost}</code>
            </div>
          ))}
        </div>
        {structure.note && <p className="complexity-note">{structure.note}</p>}
      </div>

      <div className="theory-section">
        <h4>Secuencia de la operación</h4>
        <ol className="steps-list">
          {structure.steps.map((step) => (
            <li key={step}>
              <span><Check size={13} /></span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
