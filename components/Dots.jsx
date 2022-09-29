import React, { useMemo, useRef,useState,useEffect } from 'react'
import {  useFrame,useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

const tempColor = new THREE.Color()
const tempObject = new THREE.Vector3()

function Dots({parcel}) {
  const { camera } = useThree();
  const meshRef = useRef()
  const prevRef = useRef()
  const textRef = useRef();
  const panelRef = useRef()
  const offset = 0.1;
  const [widthPanel, setWidthPanel] = useState(2 + 2 * offset);
  const [heightPanel, setHeightPanel] = useState(1 + 2 * offset);
  const [enableTooltip, setEnableTooltip] = useState(false);
  const [hovered, set] = useState()
  const [positionOfHovered,setPositions] =useState({x:0,y:0,z:0});
  const points = React.useMemo(() => {
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
    // textRef.current.visible = false


    }
      
    meshRef.current.setMatrixAt(points[i].id, transform.setPosition(tempObject))

    }
    panelRef.current.lookAt(camera.position);
    const offsetX = 1;
    const { x, y, z } = positionOfHovered;
    panelRef.current.position.set(x,y+5,z);
    meshRef.current.instanceMatrix.needsUpdate = true
  })
  useEffect(() => {
    const checkTextRenderer = setInterval(() => {
      const { max, min } = textRef.current.geometry.boundingBox;

      const heightText = max.y - min.y;
      if (isFinite(heightText)) {
        clearInterval(checkTextRenderer);
        if (heightText > heightPanel - 2 * offset) {
          setHeightPanel(heightText + offset * 2);
        }
      }
    }, 200);

    return () => {
      clearInterval(checkTextRenderer);
    };
  }, [textRef]);
  useEffect(() => {
    if (panelRef && panelRef.current) {
      panelRef.current.visible = enableTooltip;
    }
  }, [enableTooltip]);

  return (
    <group>
    <instancedMesh
    ref={meshRef}
    args={[null, null, points.length]}
    onPointerMove={(e) => (e.stopPropagation(), set(e.instanceId), setPositions(e.point),setEnableTooltip(true))}
    onPointerOut={(e) => (set(undefined), setEnableTooltip(false))}>
    <sphereGeometry args={[0.24]}>
      <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
    </sphereGeometry>
    <meshBasicMaterial toneMapped={false} vertexColors />
    <mesh ref={panelRef}>
     <planeGeometry args={[widthPanel+4,heightPanel+2 ]} />
        <meshStandardMaterial roughness={0.75} color="green" />
        <Text
          ref={textRef}
          color={"#fff"}
          fontSize={0.8}
          maxWidth={200}
          lineHeight={1.5}
          letterSpacing={0.02}
          position={[0,0,0.1]}
          textAlign={"left"}
          overflowWrap="break-word"
          whiteSpace="overflowWrap"
        >
          Parcel: {hovered}
        </Text>

        </mesh>
  </instancedMesh>
  </group>
  )
}

export default Dots

