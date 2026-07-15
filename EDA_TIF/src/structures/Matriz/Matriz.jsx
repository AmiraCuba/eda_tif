import { StructureModule } from "../../components/StructureModule";
import { MatrizVisualizer } from "./MatrizVisualizer";

export const matrizInfo = {
  id: "matrix",
  name: "Matriz dinámica",
  navLabel: "Matrices",
  category: "Estructuras multidimensionales",
  icon: "grid",
};

const matrizDefinition = {
  ...matrizInfo,
  shortDescription: "Datos distribuidos en filas y columnas.",
  description:
    "Una matriz organiza elementos mediante dos índices: fila y columna. La demostración distribuye los valores en una cuadrícula de tres columnas.",
  principle: "2D",
  principleLabel: "Filas × columnas",
  insertAction: "Agregar celda",
  deleteAction: "Eliminar valor",
  placeholder: "Valor de la celda",
  initialValues: [2, 5, 8, 4, 7, 1, 9, 3, 6],
  uniqueValues: true,
  maxItems: 18,
  complexity: [
    ["Acceso [f][c]", "O(1)"],
    ["Buscar", "O(f × c)"],
    ["Recorrer", "O(f × c)"],
  ],
  steps: [
    "Se calcula la siguiente fila y columna disponible.",
    "El valor ocupa una celda identificada por dos índices.",
    "La cuadrícula conserva un acceso ordenado por posiciones.",
  ],
};

export default function Matriz() {
  return <StructureModule structure={matrizDefinition} Visualizer={MatrizVisualizer} />;
}
