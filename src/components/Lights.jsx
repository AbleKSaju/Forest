import { useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import { DirectionalLightHelper, PointLightHelper } from "three";

const Lights = () => {
  const ref = useRef();
  const point = useRef();
  useHelper(point, PointLightHelper, 5, "red");
  useHelper(ref, DirectionalLightHelper, 5, "blue");
  return (
    <>
      <ambientLight intensity={0} />
      {/* <spotLight intensity={100} position={[20,20,0]}/> */}
      <pointLight intensity={2} position={[0, 1, -0.5]} />
      <pointLight intensity={1} position={[0, 1, 0.5]} />
      <directionalLight
        ref={ref}
        castShadow
        intensity={1}
        position={[50, 70, 2]}
      />
    </>
  );
};

export default Lights;
