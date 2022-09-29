import React from 'react'
import { BufferAttribute } from "three";
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

function Dots({parcel}) {
  const colorMap = useLoader(TextureLoader, 'land-mask-gradient.png')
  const position =  React.useMemo(() => {
    const pos =  Array.from(parcel, (item) => {
      return [item.properties.coordinates[0] -200,
        item.properties.coordinates[1] - 200,0]
    }).flat()
    return new BufferAttribute(new Float32Array(pos),3);
  });
  console.log(position)
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} {...position}/>
      </bufferGeometry>
      <pointsMaterial
        size={2.5}
        color={'0xdddcff'}
        vertexColors={false}
        depthWrite={false}
        depthTest={false}
        map={colorMap}
        transparent
      />
    </points>
  )
}

export default Dots

