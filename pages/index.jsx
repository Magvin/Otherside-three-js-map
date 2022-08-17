import css from "../styles/Home.module.css";
import Controls from '../components/CameraControls'
import * as React from 'react'
import Dots from "../components/Dots";
import { SSAOPass, UnrealBloomPass } from 'three-stdlib'
import { Effects } from '@react-three/drei'
import { Canvas, extend, useThree,  } from '@react-three/fiber'

extend({ SSAOPass, UnrealBloomPass })
export default function Home() {
  const cameraRef = React.useRef()
  return (
    <div className={css.scene}>
      <Canvas
        frameloop="always"
        shadows={true}
        className={css.canvas}
        camera={{
          position: [0,100,450]
        }}
      >
      <Dots/>
      <Post />
      <Controls ref={cameraRef} /> 
      </Canvas>
    </div>
  );
}

function Post() {
  const { scene, camera } = useThree()
  return (
    <Effects disableGamma>
      <sSAOPass args={[scene, camera]} kernelRadius={0.5} maxDistance={0.1} />
      <unrealBloomPass threshold={0.9} strength={0.75} radius={0.5} />
    </Effects>
  )
}