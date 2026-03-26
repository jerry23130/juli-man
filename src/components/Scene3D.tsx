import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const CameraLens = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusGeometry args={[1.6, 0.5, 32, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.3}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#FF5A2C"
          transmission={0.95}
          roughness={0.05}
          ior={1.5}
        />
      </mesh>
    </Float>
  );
};

const FloatingRing = ({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed;
    ref.current.rotation.z = state.clock.elapsedTime * speed * 0.5;
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.02, 16, 64]} />
        <meshStandardMaterial color="#FF5A2C" emissive="#FF5A2C" emissiveIntensity={0.3} transparent opacity={0.4} />
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#FF5A2C" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

export const Scene3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#FF5A2C" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#0A1A3F" />
        <spotLight position={[0, 5, 5]} angle={0.5} penumbra={1} intensity={0.4} color="#FF5A2C" />
        
        <CameraLens />
        <FloatingRing position={[-3, 1.5, -2]} scale={0.8} speed={0.3} />
        <FloatingRing position={[3, -1, -3]} scale={1.2} speed={0.2} />
        <FloatingRing position={[0, -2.5, -1]} scale={0.5} speed={0.5} />
        <ParticleField />
        <Stars radius={50} depth={50} count={1000} factor={3} saturation={0} fade speed={0.5} />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};
