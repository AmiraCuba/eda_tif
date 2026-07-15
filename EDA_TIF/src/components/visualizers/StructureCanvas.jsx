import { ArrowRight, CircleDot, CornerDownLeft } from "lucide-react";

function EmptyState() {
  return (
    <div className="empty-state">
      <CircleDot size={28} />
      <strong>La estructura está vacía</strong>
      <span>Inserta un valor para crear el primer elemento.</span>
    </div>
  );
}

function StackVisualizer({ values }) {
  if (values.length === 0) return <EmptyState />;
  return (
    <div className="stack-stage">
      <span className="stage-caption">CIMA</span>
      <div className="stack-values">
        {[...values].reverse().map((value, index) => (
          <div className={`data-node stack-node ${index === 0 ? "current" : ""}`} key={`${value}-${values.length - index}`}>
            <span>{value}</span>
            {index === 0 && <small>top</small>}
          </div>
        ))}
      </div>
      <div className="stack-base" />
    </div>
  );
}

function QueueVisualizer({ values }) {
  if (values.length === 0) return <EmptyState />;
  return (
    <div className="queue-stage">
      <div className="queue-label start"><span>SALE</span><strong>Frente</strong></div>
      <CornerDownLeft className="queue-flow exit" size={24} />
      <div className="queue-values">
        {values.map((value, index) => (
          <div className={`data-node queue-node ${index === 0 ? "current" : ""}`} key={`${value}-${index}`}>
            {value}
          </div>
        ))}
      </div>
      <ArrowRight className="queue-flow" size={25} />
      <div className="queue-label"><span>ENTRA</span><strong>Final</strong></div>
    </div>
  );
}

function ListVisualizer({ values }) {
  if (values.length === 0) return <EmptyState />;
  return (
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
  );
}

function buildTree(values) {
  let root = null;
  values.forEach((value) => {
    const node = { value, left: null, right: null };
    if (!root) {
      root = node;
      return;
    }
    let current = root;
    while (current) {
      if (value < current.value) {
        if (!current.left) {
          current.left = node;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          break;
        }
        current = current.right;
      }
    }
  });
  return root;
}

function layoutTree(root) {
  const nodes = [];
  const edges = [];
  const walk = (node, depth, x, spread, parent) => {
    if (!node) return;
    const position = { value: node.value, x, y: 13 + depth * 25 };
    nodes.push(position);
    if (parent) edges.push({ from: parent, to: position });
    walk(node.left, depth + 1, x - spread, spread / 2, position);
    walk(node.right, depth + 1, x + spread, spread / 2, position);
  };
  walk(root, 0, 50, 24, null);
  return { nodes, edges };
}

function TreeVisualizer({ values }) {
  if (values.length === 0) return <EmptyState />;
  const { nodes, edges } = layoutTree(buildTree(values));
  return (
    <div className="tree-stage">
      <svg className="tree-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {edges.map((edge, index) => (
          <line
            key={index}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
          />
        ))}
      </svg>
      {nodes.map((node, index) => (
        <div
          className={`tree-node ${index === 0 ? "root-node" : ""}`}
          key={`${node.value}-${index}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <span>{node.value}</span>
          {index === 0 && <small>raíz</small>}
        </div>
      ))}
    </div>
  );
}

export function StructureCanvas({ type, values }) {
  const visualizers = {
    stack: StackVisualizer,
    queue: QueueVisualizer,
    list: ListVisualizer,
    tree: TreeVisualizer,
  };
  const Visualizer = visualizers[type];

  return (
    <div className={`structure-canvas canvas-${type}`}>
      <div className="canvas-grid" />
      <div className="canvas-tag">VISTA · {type === "tree" ? "JERÁRQUICA" : "LINEAL"}</div>
      <Visualizer values={values} />
    </div>
  );
}
