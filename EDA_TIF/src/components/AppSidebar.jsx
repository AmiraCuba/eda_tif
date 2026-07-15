import {
  Binary,
  Boxes,
  Braces,
  GitBranch,
  Grid3X3,
  Layers3,
  ListOrdered,
  Network,
} from "lucide-react";
import { futureStructures } from "../structures/structureRegistry";

const icons = {
  layers: Layers3,
  listOrdered: ListOrdered,
  boxes: Boxes,
  gitBranch: GitBranch,
  network: Network,
  grid: Grid3X3,
};

export function AppSidebar({ structures, selectedId, onSelect }) {
  const categories = [...new Set(structures.map((item) => item.category))];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"><Binary size={21} /></div>
        <div>
          <strong>ED Lab</strong>
          <span>Visualiza · Aprende</span>
        </div>
      </div>

      <nav className="structure-nav" aria-label="Estructuras disponibles">
        {categories.map((category) => (
          <div className="nav-group" key={category}>
            <p className="nav-label">{category}</p>
            {structures
              .filter((item) => item.category === category)
              .map((item) => {
                const Icon = icons[item.icon];
                return (
                  <button
                    className={`nav-item ${selectedId === item.id ? "active" : ""}`}
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    type="button"
                  >
                    <Icon size={18} strokeWidth={1.8} />
                    <span>{item.navLabel}</span>
                    {selectedId === item.id && <span className="active-indicator" />}
                  </button>
                );
              })}
          </div>
        ))}

        <div className="nav-group future-group">
          <p className="nav-label">Próximamente</p>
          {futureStructures.map((item) => {
            const Icon = icons[item.icon];
            return (
              <div className="nav-item disabled" key={item.name}>
                <Icon size={18} strokeWidth={1.8} />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </nav>

      <div className="sidebar-note">
        <Braces size={19} />
        <div>
          <strong>Arquitectura modular</strong>
          <span>Lista para nuevas visualizaciones.</span>
        </div>
      </div>
    </aside>
  );
}
