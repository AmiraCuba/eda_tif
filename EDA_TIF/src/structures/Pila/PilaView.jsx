import { useState } from "react";
import { Box, Layers3 } from "lucide-react";
import { PilaVisualizer } from "./PilaVisualizer";
import { Pila3DVisualizer } from "./Pila3DVisualizer";

export function PilaView(props) {
  const [mode, setMode] = useState("2d");

  return (
    <div className="view-mode-wrapper">
      <div className="view-mode-toggle" aria-label="Tipo de visualización">
        <button
          className={mode === "2d" ? "active" : ""}
          onClick={() => setMode("2d")}
          type="button"
        >
          <Layers3 size={14} /> 2D
        </button>
        <button
          className={mode === "3d" ? "active" : ""}
          onClick={() => setMode("3d")}
          type="button"
        >
          <Box size={14} /> 3D
        </button>
      </div>

      {mode === "2d" ? (
        <PilaVisualizer {...props} />
      ) : (
        <Pila3DVisualizer {...props} />
      )}
    </div>
  );
}
