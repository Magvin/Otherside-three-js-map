import lands from "../lands.json";
import Dots from "./Dots";
import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {
    Plane,
    Circle
  } from "@react-three/drei";
import { useRef } from "react";
const Container = () => {
  const jsonData = lands.data.parcels;
  const n = jsonData.slice(0, ((jsonData.length - 1 )/ 2));
  const n1 = jsonData.slice(n + 1, jsonData.length - 1);
  const ref = useRef();
  const colorMap = useLoader(TextureLoader, "cursor.png");

  return (
    <>
    
    <Circle ref={ref} castShadow rotateX={Math.PI / 0.5}>
      <meshBasicMaterial 
        depthWrite={false}
        depthTest={false}
        map={colorMap}
        color='white'
        transparent/>
    </Circle>
    <Dots parcel={n} />
    <Dots parcel={n1} />
    <mesh position={[0, 100,0 ]}  rotateX={Math.PI / 0.5}
      onPointerMove={(e) => {
        ref.current.position.x = e.point.x;
        ref.current.position.y = e.point.y;
        // console.log(e);
      }}>
      <planeGeometry args={[1000,1000,75,75]}/>
      <meshBasicMaterial  color='black' />
    </mesh>
  </>

  );
};
export default Container;
