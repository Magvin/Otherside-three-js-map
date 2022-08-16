import css from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import BasicPointsInstancesScene from "../components/LightBulb";

import * as React from 'react'
import lands from '../lands.json';


export default function Home() {
  const newLands = lands.data.parcels
  return (
    <div className={css.scene}>
      <div> here</div>
      <Canvas
        frameloop="always"
        shadows={true}
        className={css.canvas}
        camera={{
          position: [248+30, 100, 249]
        }}
      >
      <BasicPointsInstancesScene lands={newLands}/>
      </Canvas>
    </div>
  );
}