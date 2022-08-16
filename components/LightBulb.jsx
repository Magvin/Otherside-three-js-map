import React,{useRef, useState} from "react";
import { useThree } from '@react-three/fiber'
function LightBulb(props) {
    const ref = useRef()
  const { camera, gl } = useThree();
  const [color, setColor] = useState('white')

  return (
    <mesh {...props} ref={ref} onClick={(e)=>setColor('green')} >
      {/* <pointLight castShadow /> */}
      <sphereGeometry args={[0.1, 60]}   />
      <meshPhongMaterial emissive={color} shininess={10} emissiveIntensity={10}/>
    </mesh>
  );
}

export default LightBulb;
