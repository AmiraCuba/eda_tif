import "animejs/adapters/three";
import { Html } from "@react-three/drei";
import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { ThreeSceneShell } from "../../components/visualizers/ThreeSceneShell";

function StackScene({
  values,
  operation,
  onAnimationStart,
  onAnimationComplete,
}) {
  const [visibleValues, setVisibleValues] = useState(values);
  const [pendingAnimation, setPendingAnimation] = useState(null);
  const meshRefs = useRef([]);
  const handledOperationId = useRef(operation?.id ?? null);

  useEffect(() => {
    if (!operation || handledOperationId.current === operation.id) return;
    handledOperationId.current = operation.id;
    if (operation.type === "insert") {
      setVisibleValues(values);
      setPendingAnimation(operation);
      return;
    }
    if (operation.type === "remove") {
      setPendingAnimation(operation);
      return;
    }
    setVisibleValues(values);
    setPendingAnimation(null);
    onAnimationComplete();
  }, [operation, values, onAnimationComplete]);

  useEffect(() => {
    if (!pendingAnimation) return;
    const topIndex = visibleValues.length - 1;
    const topMesh = meshRefs.current[topIndex];
    if (!topMesh) return;

    const targetY = -2.35 + topIndex * 0.88;
    onAnimationStart();

    if (pendingAnimation.type === "insert") {
      animate(topMesh, {
        y: [targetY + 4.6, targetY],
        rotateY: [-35, 0],
        rotateZ: [8, 0],
        scale: [0.68, 1],
        duration: 1050,
        ease: "outElastic(1, .65)",
        onComplete: () => {
          setPendingAnimation(null);
          onAnimationComplete();
        },
      });
      return;
    }

    animate(topMesh, {
      y: [targetY, targetY + 4.2],
      rotateY: [0, 50],
      rotateZ: [0, -10],
      scale: [1, 0.58],
      duration: 720,
      ease: "in(4)",
      onComplete: () => {
        setVisibleValues(values);
        setPendingAnimation(null);
        onAnimationComplete();
      },
    });
  }, [pendingAnimation, visibleValues, values, onAnimationStart, onAnimationComplete]);

  return (
    <group rotation={[0, -0.22, 0]}>
      {visibleValues.map((value, index) => {
        const isTop = index === visibleValues.length - 1;
        return (
          <mesh
            castShadow
            key={`${value}-${index}`}
            position={[0, -2.35 + index * 0.88, 0]}
            receiveShadow
            ref={(mesh) => { meshRefs.current[index] = mesh; }}
          >
            <boxGeometry args={[3.1, 0.72, 1.75]} />
            <meshStandardMaterial
              color={isTop ? "#7657ff" : "#29364b"}
              emissive={isTop ? "#281d6c" : "#0b1020"}
              emissiveIntensity={isTop ? 1.2 : 0.25}
              metalness={0.38}
              roughness={0.28}
            />
            <Html center distanceFactor={9} transform>
              <span className={`three-value-label ${isTop ? "top" : ""}`}>{value}</span>
            </Html>
          </mesh>
        );
      })}
      <mesh position={[0, -2.78, 0]} receiveShadow>
        <boxGeometry args={[3.7, 0.15, 2.25]} />
        <meshStandardMaterial color="#59667d" metalness={0.7} roughness={0.32} />
      </mesh>
    </group>
  );
}

export function Pila3DVisualizer(props) {
  return (
    <ThreeSceneShell camera={[6.5, 4.2, 8.5]}>
      <StackScene {...props} />
    </ThreeSceneShell>
  );
}
