import React, {useMemo} from 'react'
import * as THREE from "three";
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { a, useSpring } from "@react-spring/three";

const tempColor = new THREE.Color()

function Dots({parcel}) {
  const colorMap = useLoader(TextureLoader, 'land-mask-gradient.png')
  const data = Array.from({ length: parcel.length }, () => ({ color: "#5B75D3", scale: 1 }))
  const colorArray = useMemo(() => Float32Array.from(new Array(parcel.length).fill().flatMap((_, i) => tempColor.set(data[i].color).toArray())), [])
  const position =  useMemo(() => {
    const pos =  Array.from(parcel, (item) => {
      return [item.properties.coordinates[0] -200,
        item.properties.coordinates[1] - 200,0]
    }).flat()
    return new THREE.BufferAttribute(new Float32Array(pos),3);
  });
  return (
    <a.points>
      <a.bufferGeometry>
        <bufferAttribute attach={"attributes-position"} {...position}/>
        <bufferAttribute attach={"attributes-color"} args={[colorArray,3]}/>

      </a.bufferGeometry>
      <pointsMaterial
        size={1}
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

