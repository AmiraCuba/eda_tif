import { StructureModule } from "../../components/StructureModule";
import { PilaView } from "./PilaView";

export const pilaInfo = {
  id: "stack",
  name: "Pila",
  navLabel: "Pilas",
  category: "Estructuras lineales",
  icon: "layers",
};

const pilaDefinition = {
  ...pilaInfo,
  shortDescription: "El último elemento en entrar es el primero en salir.",
  description:
    "Una pila organiza elementos bajo el principio LIFO. Solo se inserta y elimina desde el extremo llamado cima.",
  principle: "LIFO",
  principleLabel: "Last In, First Out",
  insertAction: "Push",
  deleteAction: "Pop",
  placeholder: "Ingresa un número",
  initialValues: [7, 13, 24, 31],
  complexity: [
    ["Insertar", "O(1)"],
    ["Eliminar", "O(1)"],
    ["Consultar cima", "O(1)"],
  ],
  steps: [
    "El nuevo dato se coloca sobre la cima.",
    "La referencia de la cima se actualiza.",
    "Pop retira únicamente el elemento superior.",
  ],
};

export default function Pila() {
  return <StructureModule structure={pilaDefinition} Visualizer={PilaView} />;
}
