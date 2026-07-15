import { StructureModule } from "../../components/StructureModule";
import { TensorVisualizer3D } from "./TensorVisualizer3D";

export const tensorInfo = {
  id: "tensor",
  name: "Tensor tridimensional",
  navLabel: "Tensores",
  category: "Estructuras multidimensionales",
  icon: "boxes",
};

const tensorDefinition = {
  ...tensorInfo,
  shortDescription: "Valores organizados mediante tres índices espaciales.",
  description:
    "Un tensor de orden tres extiende una matriz agregando profundidad. Cada celda se identifica mediante los índices de fila, columna y capa.",
  principle: "3D",
  principleLabel: "Filas × columnas × capas",
  insertAction: "Agregar celda",
  deleteAction: "Eliminar valor",
  placeholder: "Valor de la celda",
  initialValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  uniqueValues: true,
  maxItems: 27,
  complexity: [
    ["Acceso [x][y][z]", "O(1)"],
    ["Buscar", "O(x × y × z)"],
    ["Recorrer", "O(n³)"],
  ],
  steps: [
    "Se determina la siguiente posición tridimensional.",
    "La celda se ubica dentro de una capa del tensor.",
    "La cámara puede rotarse para observar su profundidad.",
  ],
};

export default function Tensor() {
  return <StructureModule structure={tensorDefinition} Visualizer={TensorVisualizer3D} />;
}
