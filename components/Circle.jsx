import React from 'react';

function CircleLand(props) {
    return (
        <mesh {...props} recieveShadow={true} castShadow={true}>
         <sphereBufferGeometry args={[1, 10]} />
        <meshPhysicalMaterial  color={"white"} />
      </mesh>
    )
}
export default CircleLand;