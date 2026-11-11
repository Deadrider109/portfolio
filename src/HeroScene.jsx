import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sparkles
} from "@react-three/drei";

function FloatingObject() {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.x += delta * 0.12;
    group.current.rotation.y += delta * 0.18;
    group.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.7) * 0.15;
  });

  return (
    <group ref={group}>
      <Float
        speed={1.5}
        rotationIntensity={0.3}
        floatIntensity={0.5}
      >
        <mesh>
          <torusKnotGeometry args={[1.15, 0.32, 180, 24]} />

          <MeshDistortMaterial
            color="#a78bfa"
            roughness={0.16}
            metalness={0.8}
            distort={0.22}
            speed={2}
          />
        </mesh>
      </Float>

      <Sparkles
        count={100}
        scale={5}
        size={2}
        speed={0.4}
        color="#c4b5fd"
      />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.2} />

      <pointLight
        position={[5, 5, 5]}
        intensity={2}
        color="#c4b5fd"
      />

      <pointLight
        position={[-5, -5, 3]}
        intensity={1.5}
        color="#7c3aed"
      />

      <FloatingObject />
    </Canvas>
  );
}