import { CanvasShell, EmptyStructure } from "../../components/visualizers/CanvasShell";

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

export function ArbolBinarioVisualizer({ values }) {
  if (values.length === 0) {
    return (
      <CanvasShell type="tree" view="JERÁRQUICA">
        <EmptyStructure />
      </CanvasShell>
    );
  }

  const { nodes, edges } = layoutTree(buildTree(values));
  return (
    <CanvasShell type="tree" view="JERÁRQUICA">
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
    </CanvasShell>
  );
}
