import css from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import CircleLand from "../components/Circle";
import OrbitControls from "../components/OrbitControls";
import Light from "../components/LightBulb";

import Draggable from '../components/Draggable';
import {Suspense} from "react";
import lands from '../lands.json';
import Floor from "../components/Floor";
export default function Home() {
  const newLands = lands.data.parcels
  console.log(newLands)
  return (
    <div className={css.scene}>
      <div> here</div>
      <Canvas
        frameloop="always"
        shadows={true}
        className={css.canvas}
        camera={{
          position: [248+30, 100, 249],
        }}
      >
        <ambientLight color={"white"} intensity={0.2} />
        {/* <Light position={[0, 3, 0]} /> */}
          {newLands.map((parcel, index)=>  
            <Light key={index}position={[parcel.properties.coordinates[0],0,parcel.properties.coordinates[1]]}/>
           )}
         

        <OrbitControls />
      </Canvas>
    </div>
  );
}