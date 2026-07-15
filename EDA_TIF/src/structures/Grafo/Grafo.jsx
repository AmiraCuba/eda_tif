import { StructureModule } from "../../components/StructureModule";
import { GrafoVisualizer3D } from "./GrafoVisualizer3D";

export const grafoInfo = {
  id: "graph",
  name: "Grafo",
  navLabel: "Grafos",
  category: "Estructuras no lineales",
  icon: "network",
};

const grafoDefinition = {
  ...grafoInfo,
  shortDescription: "Nodos relacionados mediante aristas dentro de una red.",
  description:
    "Un grafo representa entidades como vértices y sus relaciones como aristas. En esta demostración, cada nuevo vértice se integra a una red no dirigida.",
  principle: "V + E",
  principleLabel: "Vértices y aristas",
  insertAction: "Agregar vértice",
  deleteAction: "Eliminar vértice",
  placeholder: "Identificador numérico",
  initialValues: [1, 2, 3, 4, 5],
  uniqueValues: true,
  maxItems: 12,
  complexity: [
    ["Agregar vértice", "O(1)"],
    ["Buscar vértice", "O(V)"],
    ["Recorrer", "O(V + E)"],
  ],
  steps: [
    "Se crea un vértice con un identificador único.",
    "El vértice se conecta con nodos existentes.",
    "La escena reajusta la distribución espacial de la red.",
  ],
};

export default function Grafo() {
  return <StructureModule structure={grafoDefinition} Visualizer={GrafoVisualizer3D} />;
}
