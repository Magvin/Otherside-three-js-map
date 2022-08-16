import React from "react";

function Floor(props) {
  return (
    <mesh {...props} position={[248,-2,249]} recieveShadow={true}>
      <boxBufferGeometry args={[20,1,100]} />
      <meshPhysicalMaterial color='white' />
    </mesh>
  );
}

export default Floor;