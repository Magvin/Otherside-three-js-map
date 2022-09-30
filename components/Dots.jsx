import React, {useMemo, useState,useRef, useLayoutEffect} from 'react'
import * as THREE from "three";
import { useLoader,useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { a, useSpring } from "@react-spring/three";

const tempColor = new THREE.Color()

function Dots({parcel}) {
  const meshRef = useRef()
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const colorMap = useLoader(TextureLoader, 'land-mask-gradient.png')
  const data = Array.from({ length: parcel.length }, () => ({ color: "#5B75D3", scale: 1 }))
  const colorArray = useMemo(() => Float32Array.from(new Array(parcel.length).fill().flatMap((_, i) => tempColor.set(data[i].color).toArray())), [])
  const position =  useMemo(() => {
    const pos =  Array.from(parcel, (item) => {
      return [item.properties.coordinates[0] -200,
        item.properties.coordinates[1] - 200,0]
    }).flat()
    const token =  Array.from(parcel, (item) => {
      return item.properties.token_id
    })
    return {
      positions: new THREE.BufferAttribute(new Float32Array(pos),3),
      token: new THREE.BufferAttribute(new Float32Array(token),3 )
    }
  });
  useLayoutEffect(() => {
    if (hoveredIndex !== null) {
      const i = hoveredIndex * 3;
      const cols = [...colorArray];
      cols[i] = 1.0;
      cols[i + 1] = 1.0;
      cols[i + 2] = 1.0;
      meshRef.current.setAttribute(
        "color",
        new THREE.BufferAttribute(new Float32Array(cols), 3)
      );
    } else {
      meshRef.current.setAttribute(
        "color",
        new THREE.BufferAttribute(new Float32Array(colorArray), 3)
      );

    }
  },
  [hoveredIndex,colorArray])
  return (
    <a.points onPointerOver={(e)=>{
      setHoveredIndex(e.index)
    }} 
    onPointerLeave={()=>{
      setHoveredIndex(null)
    }} >
      <a.bufferGeometry ref={meshRef}>
        <bufferAttribute attach={"attributes-position"} {...position.positions}/>
        <bufferAttribute attach={"tokenid"} {...position.token}/>

        <bufferAttribute attach={"attributes-color"} args={[colorArray,3]}/>

      </a.bufferGeometry>
      <pointsMaterial
        size={0.7}
        depthWrite={false}
        depthTest={false}
        map={colorMap}
        vertexColors={true}
        transparent
      />
    </a.points>
  )
}

export default Dots

