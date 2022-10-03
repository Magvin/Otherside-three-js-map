import React, {useMemo, useState,useRef, useLayoutEffect,useEffect} from 'react'
import * as THREE from "three";
import { useLoader, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { a } from "@react-spring/three";
import { Text } from '@react-three/drei'

const tempColor = new THREE.Color()
function Dots({parcel}) {
  const meshRef = useRef()
  const textRef = useRef();
  const panelRef = useRef()
  const { camera } = useThree();
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [positionOfHovered,setPositions] =useState({x:0,y:0,z:0});
  const [enableTooltip, setEnableTooltip] = useState(false);
  const offset = 0.1;
  const [widthPanel, setWidthPanel] = useState(2 + 2 * offset);
  const [heightPanel, setHeightPanel] = useState(1 + 2 * offset);
  const colorMap = useLoader(TextureLoader, 'land-mask-gradient.png')
  const data = Array.from({ length: parcel.length }, () => ({ color: "#5B75D3", scale: 1 }))
  const colorArray = useMemo(() => Float32Array.from(new Array(parcel.length).fill().flatMap((_, i) => tempColor.set(data[i].color).toArray())), [])
  const position =  useMemo(() => {
    const pos =  Array.from(parcel, (item) => {
      return [item.properties.coordinates[0] -201,
        item.properties.coordinates[1] - 201,20]
    }).flat()
    const token =  Array.from(parcel, (item) => {
      return item.properties.token_id
    })
    return {
      positions: new THREE.BufferAttribute(new Float32Array(pos),3),
      token: new THREE.BufferAttribute(new Float32Array(token),3 )
    }
  },[parcel]);

  const raycaster = useThree((state) => state.raycaster)
  React.useEffect(() => {
    if (raycaster.params.Points) {
      const old = raycaster.params.Points.threshold
      raycaster.params.Points.threshold = 0.175
      return () => {
        if (raycaster.params.Points) raycaster.params.Points.threshold = old
      }
    }
  }, [])

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
      panelRef.current.lookAt(camera.position);
    const { x, y, z } = positionOfHovered;
    panelRef.current.position.set(x,y+2,z);
    } else {
      meshRef.current.setAttribute(
        "color",
        new THREE.BufferAttribute(new Float32Array(colorArray), 3)
      );

    }
  },
  [hoveredIndex, colorArray, positionOfHovered, camera.position])
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
  }, [heightPanel, textRef]);
  useEffect(() => {
    if (panelRef && panelRef.current) {
      panelRef.current.visible = enableTooltip;
    }
  }, [enableTooltip]);
  return (
    <a.points onPointerOver={(e)=>{
      setPositions(e.point),
      setEnableTooltip(true),
      setHoveredIndex(e.index)
    }} 
    onPointerLeave={()=>{
      setEnableTooltip(false),
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
      <mesh ref={panelRef}>
     <planeGeometry args={[widthPanel+4,heightPanel+2 ]}  />
     <meshBasicMaterial  color='red' />
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
          Parcel: {hoveredIndex}
        </Text>

        </mesh>
    </a.points>
  )
}

export default Dots

