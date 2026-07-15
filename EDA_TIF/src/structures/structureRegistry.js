import ArbolBinario, { arbolBinarioInfo } from "./ArbolBinario/ArbolBinario";
import Cola, { colaInfo } from "./Cola/Cola";
import Grafo, { grafoInfo } from "./Grafo/Grafo";
import Lista, { listaInfo } from "./Lista/Lista";
import Matriz, { matrizInfo } from "./Matriz/Matriz";
import Pila, { pilaInfo } from "./Pila/Pila";
import Tensor, { tensorInfo } from "./Tensor/Tensor";

export const structureRegistry = [
  { ...pilaInfo, enabled: true, component: Pila },
  { ...colaInfo, enabled: true, component: Cola },
  { ...listaInfo, enabled: true, component: Lista },
  { ...arbolBinarioInfo, enabled: true, component: ArbolBinario },
  { ...grafoInfo, enabled: true, component: Grafo },
  { ...matrizInfo, enabled: true, component: Matriz },
  { ...tensorInfo, enabled: true, component: Tensor },
];

export const futureStructures = [
  { name: "Tabla hash", icon: "grid" },
  { name: "Montículos", icon: "gitBranch" },
];
