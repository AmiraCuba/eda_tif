import { Plus, RotateCcw, Trash2 } from "lucide-react";
export function SimulatorWorkspace({ structure, simulator, Visualizer }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    simulator.insert();
  };

  return (
    <section className="simulator-card">
      <div className="simulator-heading">
        <div>
          <div className="structure-kicker">
            <span>{structure.category}</span>
            <span className="kicker-separator">/</span>
            <strong>{structure.principle}</strong>
          </div>
          <h2>{structure.name}</h2>
          <p>{structure.shortDescription}</p>
        </div>
        <span className="element-counter">
          {simulator.values.length} {simulator.values.length === 1 ? "elemento" : "elementos"}
        </span>
      </div>

      <Visualizer
        values={simulator.values}
        operation={simulator.lastOperation}
        onAnimationStart={simulator.startAnimation}
        onAnimationComplete={simulator.completeAnimation}
      />

      <div className="operation-panel">
        <div className="operation-copy">
          <span className="operation-number">01</span>
          <div>
            <strong>Ejecuta una operación</strong>
            <p>Modifica la estructura y observa el resultado.</p>
          </div>
        </div>

        <form className="operation-controls" onSubmit={handleSubmit}>
          <label className="value-field">
            <span>Valor</span>
            <input
              aria-label="Valor para la operación"
              inputMode="numeric"
              onChange={(event) => simulator.setInputValue(event.target.value)}
              placeholder={structure.placeholder}
              value={simulator.inputValue}
              disabled={simulator.isAnimating}
            />
          </label>
          <button className="action-button primary" disabled={simulator.isAnimating} type="submit">
            <Plus size={18} />
            {structure.insertAction}
          </button>
          <button className="action-button danger" disabled={simulator.isAnimating} onClick={simulator.remove} type="button">
            <Trash2 size={17} />
            {structure.deleteAction}
          </button>
          <button
            aria-label="Reiniciar demostración"
            className="icon-button"
            disabled={simulator.isAnimating}
            onClick={simulator.reset}
            title="Reiniciar"
            type="button"
          >
            <RotateCcw size={18} />
          </button>
        </form>

        <div className={`feedback ${simulator.message.type}`} aria-live="polite">
          <span className="feedback-mark" />
          {simulator.message.text || "Usa los controles para comenzar."}
        </div>
      </div>

      <div className="activity-strip">
        <span className="activity-label">Actividad</span>
        <div className="activity-list">
          {simulator.history.length > 0 ? (
            simulator.history.map((item) => <span key={item.id}>{item.text}</span>)
          ) : (
            <span>Aún no hay operaciones en esta estructura.</span>
          )}
        </div>
      </div>
    </section>
  );
}
