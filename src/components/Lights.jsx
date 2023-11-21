import { useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import { DirectionalLightHelper } from "three";

const Lights = () => {
    const ref = useRef();

    useHelper(ref, DirectionalLightHelper, 5, "blue");

  return (
    <>
      <ambientLight />
      <directionalLight ref={ref} castShadow position={[5, 7, 2]} />
    </>
  );
};

export default Lights;
