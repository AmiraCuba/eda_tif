import "animejs/adapters/three";
import { Html, Line } from "@react-three/drei";
import { animate } from "animejs";
import { useEffect, useMemo, useRef, useState } from "react";
import { ThreeSceneShell } from "../../components/visualizers/ThreeSceneShell";

function graphPositions(values) {
  const radius = Math.max(2.2, values.length * 0.34);
  return values.map((value, index) => {
    const angle = (index / values.length) * Math.PI * 2;
    return {
      value,
      position: [
        Math.cos(angle) * radius,
        Math.sin(angle * 2) * 0.75,
        Math.sin(angle) * radius,
      ],
    };
  });
}

function GraphScene({ values, operation, onAnimationStart, onAnimationComplete }) {
  const [visibleValues, setVisibleValues] = useState(values);
  const [pendingAnimation, setPendingAnimation] = useState(null);
  const meshRefs = useRef(new Map());
  const nodes = useMemo(() => graphPositions(visibleValues), [visibleValues]);

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
    onAnimationStart();

    if (pendingAnimation.type === "insert") {
      animate(mesh, {
        scale: [0.05, 1],
        rotateY: [-180, 0],
        y: [mesh.position.y + 3, mesh.position.y],
        duration: 920,
        ease: "outElastic(1, .7)",
        onComplete: () => {
          setPendingAnimation(null);
          onAnimationComplete();
        },
      });
    } else {
      animate(mesh, {
        scale: [1, 0.05],
        y: [mesh.position.y, mesh.position.y + 2],
        duration: 580,
        ease: "in(4)",
        onComplete: () => {
          setVisibleValues(values);
          setPendingAnimation(null);
          onAnimationComplete();
        },
      });
    }
  }, [pendingAnimation, values, onAnimationStart, onAnimationComplete]);

  const edges = nodes.flatMap((node, index) => {
    if (nodes.length < 2) return [];
    const next = nodes[(index + 1) % nodes.length];
    const result = [[node.position, next.position]];
    if (nodes.length > 4 && index < Math.floor(nodes.length / 2)) {
      result.push([node.position, nodes[index + Math.floor(nodes.length / 2)].position]);
    }
    return result;
  });

  return (
    <group>
      {edges.map((points, index) => (
        <Line color="#65718a" key={index} lineWidth={1.2} points={points} transparent opacity={0.72} />
      ))}
      {nodes.map(({ value, position }, index) => (
        <mesh
          castShadow
          key={value}
          position={position}
          ref={(mesh) => {
            if (mesh) meshRefs.current.set(value, mesh);
            else meshRefs.current.delete(value);
          }}
        >
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color={index === nodes.length - 1 ? "#7657ff" : "#243954"}
            emissive={index === nodes.length - 1 ? "#35287f" : "#101b2c"}
            emissiveIntensity={1}
            metalness={0.42}
            roughness={0.25}
          />
          <Html center distanceFactor={9} transform>
            <span className="three-value-label round">{value}</span>
          </Html>
        </mesh>
      ))}
    </group>
  );
}

export function GrafoVisualizer3D(props) {
  return (
    <ThreeSceneShell camera={[7.5, 5.5, 9]}>
      <GraphScene {...props} />
    </ThreeSceneShell>
  );
}
