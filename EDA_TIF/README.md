# ED Lab — arquitectura por componentes

El proyecto está preparado para que cada integrante desarrolle una estructura
de datos como un componente independiente.

## Ejecutar

```bash
pnpm install
pnpm approve-builds esbuild
pnpm run dev
```

Para compilar:

```bash
pnpm run build
```

## Organización principal

```text
src/
├── components/                   Componentes compartidos de la interfaz
├── hooks/                        Lógica compartida opcional
├── structures/
│   ├── Pila/
│   │   ├── Pila.jsx
│   │   ├── PilaVisualizer.jsx
│   │   └── Pila3DVisualizer.jsx
│   ├── Cola/
│   │   ├── Cola.jsx
│   │   └── ColaVisualizer.jsx
│   ├── Lista/
│   │   ├── Lista.jsx
│   │   └── ListaVisualizer.jsx
│   ├── ArbolBinario/
│   │   ├── ArbolBinario.jsx
│   │   └── ArbolBinarioVisualizer.jsx
│   ├── Grafo/                    Escena 3D interactiva
│   ├── Matriz/                   Cuadrícula 2.5D
│   ├── Tensor/                   Cubo multicapa 3D
│   └── structureRegistry.js      Registro central
├── App.jsx
├── index.css
└── main.jsx
```

Cada estructura mantiene juntos:

- Sus datos iniciales.
- Su explicación.
- Los nombres de sus operaciones.
- Su componente visual.
- Su integración con el diseño general.

## Animaciones 2D, 2.5D y 3D

La Pila permite alternar entre una vista 2D y una escena 3D. Ambas usan
Anime.js para representar `Push` y `Pop`. Las escenas 3D están construidas con
Three.js mediante React Three Fiber y pueden rotarse, acercarse y alejarse.

- `Push`: el nuevo nodo cae desde la parte superior hasta la cima.
- `Pop`: el nodo de la cima sube y desaparece antes de retirarse.
- Los controles quedan temporalmente bloqueados durante la animación.
- Grafos representa nodos y aristas en una escena 3D.
- Matrices usa una cuadrícula 2.5D para priorizar la lectura de filas y columnas.
- Tensores distribuye valores en capas dentro de un cubo 3D.

La implementación está en:

```text
src/structures/Pila/PilaVisualizer.jsx
src/structures/Pila/Pila3DVisualizer.jsx
src/structures/Grafo/GrafoVisualizer3D.jsx
src/structures/Matriz/MatrizVisualizer.jsx
src/structures/Tensor/TensorVisualizer3D.jsx
```

Anime.js se instala junto con las demás dependencias mediante `pnpm install`.

## Ocultar una estructura

Abre `src/structures/structureRegistry.js` y cambia su propiedad `enabled`:

```js
export const structureRegistry = [
  { ...pilaInfo, enabled: true, component: Pila },
  { ...colaInfo, enabled: false, component: Cola },
  { ...listaInfo, enabled: false, component: Lista },
  { ...arbolBinarioInfo, enabled: false, component: ArbolBinario },
  { ...grafoInfo, enabled: false, component: Grafo },
  { ...matrizInfo, enabled: false, component: Matriz },
  { ...tensorInfo, enabled: false, component: Tensor },
];
```

Con esta configuración solamente aparecerá Pila. El código de las demás
estructuras seguirá guardado, pero no se mostrará en la navegación.

Si todos tienen `enabled: false`, aparecerá una pantalla indicando que el
contenedor está preparado para recibir los componentes del equipo.

## Trabajo recomendado para el equipo

Cada integrante debe trabajar únicamente en su carpeta:

- Integrante 1: `src/structures/Pila/`
- Integrante 2: `src/structures/Cola/`
- Integrante 3: `src/structures/Lista/`
- Integrante 4: `src/structures/ArbolBinario/`
- Integrante 5: interfaz general, integración, pruebas y documentación.

El componente `StructureModule` mantiene el mismo diseño para todos. Un
integrante puede utilizarlo como está o reemplazarlo si necesita una
visualización completamente diferente.

## Agregar una nueva estructura

1. Crear una carpeta dentro de `src/structures`.
2. Crear el componente principal y su visualizador.
3. Exportar sus datos de navegación, como `id`, `navLabel`, `category` e `icon`.
4. Importar el componente en `structureRegistry.js`.
5. Agregarlo al arreglo con `enabled: true`.
