import React, { useMemo, useRef } from 'react'
import {  useFrame } from '@react-three/fiber'
import * as THREE from 'three'


const tempColor = new THREE.Color()
const tempObject = new THREE.Vector3()

function Dots({parcel}) {
  
  const meshRef = useRef()
  const prevRef = useRef()
  const [hovered, set] = React.useState()
  const [points] = React.useState(() => {
    return Array.from(parcel, (item) => {
      return {
          cords:[
            item.properties.coordinates[0] - 200,
            item.properties.coordinates[1]  - 200
          ],
          id: item.properties.token_id

      }
    });
  });

  const pos = React.useMemo(() => {
    prevRef.current = hovered
    return prevRef.current 
  }, [hovered])
  const data = Array.from({ length: points.length }, () => ({ color: "#5B75D3", scale: 1 }))
  const colorArray = useMemo(() => Float32Array.from(new Array(points.length).fill().flatMap((_, i) => tempColor.set(data[i].color).toArray())), [])

  useFrame(() => {
    for (let i = 0; i < points.length - 1; ++i) {
      tempObject.z =points[i].cords[0] 
      tempObject.x = points[i].cords[1] 
      tempObject.y = -30;
      const transform = new THREE.Matrix4()
      
      if(hovered === points[i].id) {
        if(i === pos) {
            tempColor.setRGB(10, 10, 10).toArray(colorArray, i * 3)
    meshRef.current.geometry.attributes.color.needsUpdate = true

        } 
      
      } else {
        tempColor.set(data[i].color).toArray(colorArray, i * 3)
    meshRef.current.geometry.attributes.color.needsUpdate = true

    }
      
    meshRef.current.setMatrixAt(points[i].id, transform.setPosition(tempObject))

    }
      
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
    ref={meshRef}
    args={[null, null, points.length]}
    onPointerMove={(e) => (e.stopPropagation(), set(e.instanceId))}
    onPointerOut={(e) => set(undefined)}>
    <sphereGeometry args={[0.24]}>
      <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
    </sphereGeometry>
    <meshBasicMaterial toneMapped={false} vertexColors />
  </instancedMesh>
  )
}

export default Dots

