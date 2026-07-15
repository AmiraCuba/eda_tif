import "animejs/adapters/three";
import { Html } from "@react-three/drei";
import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { ThreeSceneShell } from "../../components/visualizers/ThreeSceneShell";

function tensorPosition(index) {
  const column = index % 3;
  const row = Math.floor(index / 3) % 3;
  const layer = Math.floor(index / 9);
  return [
    (column - 1) * 1.45,
    (1 - row) * 1.45,
    (layer - 1) * 1.45,
  ];
}

function TensorScene({ values, operation, onAnimationStart, onAnimationComplete }) {
  const [visibleValues, setVisibleValues] = useState(values);
  const [pendingAnimation, setPendingAnimation] = useState(null);
  const meshRefs = useRef(new Map());

  useEffect(() => {
    if (!operation) return;
    if (operation.type === "insert") {
      setVisibleValues(values);
      setPendingAnimation(operation);
    } else if (operation.type === "remove") {
      setPendingAnimation(operation);
    } else {
      setVisibleValues(values);
      setPendingAnimation(null);
      onAnimationComplete();
    }
  }, [operation, values, onAnimationComplete]);

  useEffect(() => {
    if (!pendingAnimation) return;
    const mesh = meshRefs.current.get(pendingAnimation.value);
    if (!mesh) return;
    const index = visibleValues.indexOf(pendingAnimation.value);
    const [, targetY] = tensorPosition(index);
    onAnimationStart();

    if (pendingAnimation.type === "insert") {
      animate(mesh, {
        y: [targetY + 4, targetY],
        rotateX: [-120, 0],
        rotateY: [90, 0],
        scale: [0.08, 1],
        duration: 980,
        ease: "outElastic(1, .7)",
        onComplete: () => {
          setPendingAnimation(null);
          onAnimationComplete();
        },
      });
    } else {
      animate(mesh, {
        y: [targetY, targetY + 3.5],
        rotateX: [0, 120],
        rotateY: [0, -90],
        scale: [1, 0.05],
        duration: 650,
        ease: "in(4)",
        onComplete: () => {
          setVisibleValues(values);
          setPendingAnimation(null);
          onAnimationComplete();
        },
      });
    }
  }, [pendingAnimation, visibleValues, values, onAnimationStart, onAnimationComplete]);

  return (
    <group rotation={[-0.18, 0.38, 0]}>
      {visibleValues.map((value, index) => {
        const layer = Math.floor(index / 9);
        const color = ["#23bfa4", "#7657ff", "#c9f456"][layer] ?? "#7657ff";
        return (
          <mesh
            castShadow
            key={value}
            position={tensorPosition(index)}
            receiveShadow
            ref={(mesh) => {
              if (mesh) meshRefs.current.set(value, mesh);
              else meshRefs.current.delete(value);
            }}
          >
            <boxGeometry args={[1.08, 1.08, 1.08]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.22}
              metalness={0.24}
              opacity={0.82}
              roughness={0.3}
              transparent
            />
            <Html center distanceFactor={10} transform>
              <span className="three-value-label tensor">{value}</span>
            </Html>
          </mesh>
        );
      })}
    </group>
  );
}

export function TensorVisualizer3D(props) {
  return (
    <ThreeSceneShell camera={[7.8, 6.4, 9.5]}>
      <TensorScene {...props} />
    </ThreeSceneShell>
  );
}
