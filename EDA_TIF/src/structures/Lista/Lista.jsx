import { StructureModule } from "../../components/StructureModule";
import { ListaVisualizer } from "./ListaVisualizer";

export const listaInfo = {
  id: "list",
  name: "Lista enlazada",
  navLabel: "Listas",
  category: "Estructuras lineales",
  icon: "boxes",
};

const listaDefinition = {
  ...listaInfo,
  shortDescription: "Nodos conectados mediante referencias al siguiente.",
  description:
    "Una lista enlazada está formada por nodos. Cada nodo guarda un dato y una referencia que permite llegar al siguiente.",
  principle: "ENLACES",
  principleLabel: "Dato + siguiente",
  insertAction: "Insertar",
  deleteAction: "Eliminar valor",
  placeholder: "Valor del nodo",
  initialValues: [8, 17, 23, 35],
  complexity: [
    ["Insertar al final", "O(1)*"],
    ["Buscar", "O(n)"],
    ["Eliminar por valor", "O(n)"],
  ],
  steps: [
    "Se crea un nodo con el dato ingresado.",
    "El último nodo apunta al nuevo nodo.",
    "Al eliminar, se reconectan los nodos vecinos.",
  ],
  note: "* Manteniendo una referencia directa al último nodo.",
};

export default function Lista() {
  return <StructureModule structure={listaDefinition} Visualizer={ListaVisualizer} />;
}
