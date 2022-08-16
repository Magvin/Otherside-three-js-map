import * as React from 'react'
import { Vector3 } from 'three'
import { Canvas } from '@react-three/fiber'
import css from "../styles/Home.module.css";
import OrbitControls  from './OrbitControls'


const Setup = ({
  children,
  cameraFov = 100,
  cameraPosition = new Vector3(-5, 5, 5),
  controls = true,
  lights = true,
  ...restProps
}) => (
  <Canvas shadows camera={{ position: cameraPosition, fov: cameraFov }} {...restProps} className={css.canvas}>
    {children}
    {controls && <OrbitControls />}
  </Canvas>
)
export default Setup