import { StructureModule } from "../../components/StructureModule";
import { ArbolBinarioVisualizer } from "./ArbolBinarioVisualizer";

export const arbolBinarioInfo = {
  id: "tree",
  name: "Árbol binario de búsqueda",
  navLabel: "Árbol binario",
  category: "Estructuras jerárquicas",
  icon: "gitBranch",
};

const arbolBinarioDefinition = {
  ...arbolBinarioInfo,
  shortDescription: "Organiza valores menores a la izquierda y mayores a la derecha.",
  description:
    "Un árbol binario de búsqueda distribuye los datos de forma jerárquica. Cada nodo puede tener como máximo dos hijos.",
  principle: "BST",
  principleLabel: "Izquierda < raíz < derecha",
  insertAction: "Insertar",
  deleteAction: "Eliminar valor",
  placeholder: "Valor del nodo",
  initialValues: [42, 24, 64, 12, 30, 56, 78],
  complexity: [
    ["Insertar", "O(log n)*"],
    ["Buscar", "O(log n)*"],
    ["Eliminar", "O(log n)*"],
  ],
  steps: [
    "La búsqueda comienza en la raíz.",
    "Un valor menor avanza a la izquierda; uno mayor, a la derecha.",
    "La posición libre encontrada recibe el nuevo nodo.",
  ],
  note: "* En un árbol equilibrado. En el peor caso puede ser O(n).",
};

/** Componente completo perteneciente al integrante encargado del árbol. */
export default function ArbolBinario() {
  return (
    <StructureModule
      structure={arbolBinarioDefinition}
      Visualizer={ArbolBinarioVisualizer}
    />
  );
}
