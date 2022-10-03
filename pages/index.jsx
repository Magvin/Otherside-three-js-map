import css from "../styles/Home.module.css";
import * as React from 'react'
import Container from "../components/Container";
import { SSAOPass, UnrealBloomPass } from 'three-stdlib'
import { Canvas, extend } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import { Stats } from '@react-three/drei'

extend({ SSAOPass, UnrealBloomPass })
export default function Home() {
  return (
    <div className={css.scene}>
      <Canvas
        frameloop="always"
        className={css.canvas}
        camera={{
          position: [0,-20,75],
          fov:100
        }}
      >
      <OrbitControls enableDamping={false} enableRotate={false} />
      <Container/>
      <Stats className="stats" />
      </Canvas>
    </div>
  );
}