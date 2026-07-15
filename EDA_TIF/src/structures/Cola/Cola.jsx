import { StructureModule } from "../../components/StructureModule";
import { ColaVisualizer } from "./ColaVisualizer";

export const colaInfo = {
  id: "queue",
  name: "Cola",
  navLabel: "Colas",
  category: "Estructuras lineales",
  icon: "listOrdered",
};

const colaDefinition = {
  ...colaInfo,
  shortDescription: "El primer elemento en entrar es el primero en salir.",
  description:
    "Una cola mantiene el orden de llegada. Los elementos ingresan por el final y salen por el frente.",
  principle: "FIFO",
  principleLabel: "First In, First Out",
  insertAction: "Enqueue",
  deleteAction: "Dequeue",
  placeholder: "Ingresa un número",
  initialValues: [12, 18, 26, 39],
  complexity: [
    ["Insertar", "O(1)"],
    ["Eliminar", "O(1)"],
    ["Consultar frente", "O(1)"],
  ],
  steps: [
    "El nuevo dato ingresa por el final.",
    "El frente conserva el elemento más antiguo.",
    "Dequeue retira el elemento del frente.",
  ],
};

export default function Cola() {
  return <StructureModule structure={colaDefinition} Visualizer={ColaVisualizer} />;
}
