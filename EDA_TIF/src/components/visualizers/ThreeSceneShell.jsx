import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export function ThreeSceneShell({ children, camera = [6, 5, 8] }) {
  return (
    <div className="structure-canvas three-scene-shell">
      <div className="canvas-grid" />
      <div className="canvas-tag">VISTA · 3D INTERACTIVA</div>
      <div className="orbit-hint">ARRASTRA PARA ROTAR · RUEDA PARA ZOOM</div>
      <Canvas
        camera={{ position: camera, fov: 42, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        frameloop="always"
        shadows
      >
        <color attach="background" args={["#121a27"]} />
        <fog attach="fog" args={["#121a27", 12, 24]} />
        <ambientLight intensity={0.9} />
        <directionalLight
          castShadow
          intensity={2.2}
          position={[5, 8, 5]}
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight color="#7657ff" intensity={18} position={[-5, 2, 4]} />
        <pointLight color="#c9f456" intensity={8} position={[4, -2, 2]} />
        {children}
        <gridHelper args={[18, 18, "#354158", "#202a3a"]} position={[0, -3, 0]} />
        <OrbitControls
          enableDamping
          enablePan={false}
          maxDistance={16}
          minDistance={5}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
