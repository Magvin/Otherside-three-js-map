import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {
    Plane,
    Dodecahedron,
    Stats,
    Sky,
    OrbitControls
  } from "@react-three/drei";
import { useRef } from "react";
function Mouse() {
  const colorMap = useLoader(TextureLoader, "cursor.png");
  const { viewport } = useThree();
  const ref = useRef();


  return (
    <>
    <Plane
      args={[50, 50]}
      position={[0, 0, -5]}
      onPointerMove={(e) => {
        ref.current.position.x = e.point.x;
        ref.current.position.y = e.point.y;
        // console.log(e);
      }}
    />
    <Dodecahedron ref={ref}>
      <meshStandardMaterial attach="material" color="red" />
    </Dodecahedron>
  </>
  );
}

export default Mouse;
