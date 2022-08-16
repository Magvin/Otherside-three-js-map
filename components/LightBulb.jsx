import * as React from 'react'
import { Segments, Segment,} from '@react-three/drei'
import OrbitControls  from './OrbitControls'

export function BasicSegments(lands) {
  const n = lands.lands.slice(0,50000)
  const n1 = lands.lands.slice(50000,100000)
  const [points] = React.useState(() => {
    return Array.from(n, (item) => {
      console.log(item)
      return [item.properties.coordinates[0], 0, item.properties.coordinates[1]]
    })
  })
  const [points1] = React.useState(() => {
    return Array.from(n1, (item) => {
      return [item.properties.coordinates[0], 0, item.properties.coordinates[1]]
    })
  })
  return (
    <>
    <group>
      <Segments limit={n.length} lineWidth={0.5}>
        {points.map((p, index)=>  <Segment  key={index} start={p} end={p} color={'white'} />)}
      </Segments>

      </group>
      <group>
      <Segments limit={n1.length} lineWidth={0.5}>
        {points1.map((p, index)=>  <Segment  key={index} start={p} end={p} color={'white'} />)}
      </Segments>
      </group>
      <OrbitControls/>
    </>
  )
}


export default BasicSegments