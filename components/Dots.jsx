import React, { useMemo, useRef } from 'react'
import {  useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import lands from '../lands.json'

const tempColor = new THREE.Color()
const tempObject = new THREE.Vector3()

function Dots() {
  const jsonData = lands.data.parcels;
  const meshRef = useRef()
  const prevRef = useRef()
  const [hovered, set] = React.useState()
  const n = jsonData.slice(0, 25000);
  const n1 = jsonData.slice(2000, 3000);
  const n2 = jsonData.slice(50000, 75000);
  const n3 = jsonData.slice(75000, 99999)

  const [points5] = React.useState(() => {
    return Array.from(n, (item) => {
      return {
          cords:[
            item.properties.coordinates[0],
            item.properties.coordinates[1],
          ],
          id: item.properties.token_id

      }
    });
  });

  const pos = React.useMemo(() => {
    prevRef.current = hovered
    return prevRef.current 
  }, [hovered])
  const data = Array.from({ length: points5.length }, () => ({ color: "#5B75D3", scale: 1 }))
  const colorArray = useMemo(() => Float32Array.from(new Array(points5.length).fill().flatMap((_, i) => tempColor.set(data[i].color).toArray())), [])
  useFrame(() => {
    for (let i = 0; i < points5.length - 1; ++i) {
      tempObject.x =points5[i].cords[0];
      tempObject.y = points5[i].cords[1];
      const transform = new THREE.Matrix4()
      
      if(hovered === points5[i].id) {
        if(i === pos) {
            tempColor.setRGB(10, 10, 10).toArray(colorArray, i * 3)
    meshRef.current.geometry.attributes.color.needsUpdate = true

        } 
      
      } else {
        tempColor.set(data[i].color).toArray(colorArray, i * 3)
    meshRef.current.geometry.attributes.color.needsUpdate = true

    }
      
    meshRef.current.setMatrixAt(points5[i].id, transform.setPosition(tempObject))

    }
      
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
    ref={meshRef}
    args={[null, null, 1000]}
    onPointerMove={(e) => (e.stopPropagation(), set(e.instanceId))}
    onPointerOut={(e) => set(undefined)}>
    <sphereGeometry args={[0.2]}>
      <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
    </sphereGeometry>
    <meshBasicMaterial toneMapped={false} vertexColors />
  </instancedMesh>
  )
}

export default Dots

