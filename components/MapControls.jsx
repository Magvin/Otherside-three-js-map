import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "react-three-fiber";

const PerspectiveCam = (props) => {
  const ref = useRef();
  const { setDefaultCamera } = useThree();
  // Make the camera known to the system
  useEffect(() => setDefaultCamera(ref.current), [setDefaultCamera]);
  // Update it every frame
  useFrame(() => {
    ref.current.updateMatrixWorld();
    props.setZoom(ref.current.zoom);
  });
  return (
    <perspectiveCamera
      ref={ref}
      position={props.position}
      // scale={[0.5, 0.5, 0.5]}
      // up={[0, 0, 1.0]}
    />
  );
};

export default PerspectiveCam;
