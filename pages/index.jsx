import css from "../styles/Home.module.css";
import * as React from 'react'
import Container from "../components/Container";
import { SSAOPass, UnrealBloomPass } from 'three-stdlib'
import { Effects } from '@react-three/drei'
import { Canvas, extend, useThree,  } from '@react-three/fiber'
import { OrbitControls } from '../components/MapControls'
extend({ SSAOPass, UnrealBloomPass })
export default function Home() {
  return (
    <div className={css.scene}>
      <Canvas
      antialias={true}
        frameloop="always"
        shadows={true}
        className={css.canvas}
        camera={{
          position: [200,100,150]
        }}
      >
      <Container/>
      <OrbitControls />
      </Canvas>
    </div>
  );
}