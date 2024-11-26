// components/Globe.tsx
import React, { useRef , useState} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += hovered ? 0.01 : 0.005;
    }
  });

  return (
    <mesh ref={globeRef} onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="blue" wireframe />
    </mesh>
  );
};

const GlobeScene = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Globe />
        <Stars />
        <OrbitControls minDistance={2} maxDistance={2} />
      </Canvas>
    </div>
  );
};

export default GlobeScene;