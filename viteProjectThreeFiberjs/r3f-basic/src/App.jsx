// import { useState } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "./App.css";
import { useRef, useState } from "react";
import { OrbitControls, useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { useControls } from "leva";

const Cube = ({ position, size, color }) => {
  const ref = useRef();
  // const rate = 0.1;
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 3;
    ref.current.rotation.y += delta * 2;
    // ref.current.rotation.z += delta * 2;
    // ref.current.position.x = Math.sin(state.clock.elapsedTime) * 2;
    // ref.current.position.y = Math.sin(state.clock.elapsedTime) * 2;
    // ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    ref.current.position.x = Math.cos(state.clock.elapsedTime) * 2;
    ref.current.position.y = Math.cos(state.clock.elapsedTime) * 2;
    ref.current.position.z = Math.cos(state.clock.elapsedTime) * 3;
  });
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = ({ position, size }) => {
  const sphereRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isCicked, setIsClicked] = useState(false);
  useFrame((state, delta) => {
    const speed = isHovered ? 3 : 0.2;
    const scaleSpeed =
      Math.sin(state.clock.elapsedTime) * (isHovered ? 1.5 : 0.9);
    if (isHovered) {
      sphereRef.current.rotation.x += delta * speed;
      sphereRef.current.rotation.z += delta * speed;
    }
    sphereRef.current.rotation.y += delta * speed;
    const s = 1 + scaleSpeed;

    if (isCicked) {
      sphereRef.current.scale.set(s, s, s);
    }
  });
  return (
    <mesh
      position={position}
      ref={sphereRef}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={(event) => (event.stopPropagation(), setIsClicked(!isCicked))}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial
        color={isHovered ? "yellow" : "lightblue"}
        wireframe
      />
    </mesh>
  );
};

const Torus = ({ position, size, color }) => {
  const torusRef = useRef();

  return (
    <mesh position={position} ref={torusRef}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
const TorusKnot = ({ position, size }) => {
  const torusKnotRef = useRef();
  const { color, radius } = useControls({
    color: "red",
    radius: {
      value: 5,
      min: 1,
      max: 10,
      step: 0.1,
    },
  });

  useFrame((state, delta) => {
    torusKnotRef.current.rotation.x += delta * 3;
    torusKnotRef.current.rotation.y += delta * 2;
    torusKnotRef.current.rotation.z += delta * 2;
  });

  return (
    <mesh position={position} ref={torusKnotRef}>
      {/* radius (0.7), tube (0.1), tubularSegments (1000), radialSegments (50), p (2), q (radius from Leva) */}
      <torusKnotGeometry
        args={[size[0], size[1], size[2], size[3], 2, radius]}
      />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
function Scene() {
  const directionalLight = useRef();
  const { lightColor, lightIntensity } = useControls({
    lightColor: "white",
    lightIntensity: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.01,
    },
  });
  useHelper(directionalLight, DirectionalLightHelper, 0.5, "white");
  return (
    <>
      <directionalLight
        position={[0, 0, 3]}
        ref={directionalLight}
        color={lightColor}
        intensity={lightIntensity}
      />
      <ambientLight intensity={0.5} />
      {/* <group position={[0, -1, 0]}>
              <Cube position={[1, 0, 0]} color={"green"} size={[1, 1, 1]} />
              <Cube position={[-1, 0, 0]} color={"hotpink"} size={[1, 1, 1]} />
              <Cube position={[-1, 2, 0]} color={"orange"} size={[1, 1, 1]} />
              <Cube position={[1, 2, 0]} color={"yellow"} size={[1, 1, 1]} />
            </group> */}
      <Cube position={[0, 0, 0]} size={[1, 1, 1]} color={"red"} />
      <Sphere position={[0, 0, 0]} size={[0.9, 15, 15]} />
      <Torus position={[0, 0, 0]} size={[2, 0.2, 15, 30]} color={"blue"} />
      <TorusKnot
        position={[-4, 0, 0]}
        size={[0.7, 0.1, 1000, 50]}
        color={"red"}
      />
      <OrbitControls />
    </>
  );
}

function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}

export default App;
