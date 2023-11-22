import { useLoader } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from "three";

const Ground = () => {
  const ground4 = useLoader(TextureLoader, '../../public/Ground/ground4.jpg')
  return (
    <>
    <mesh rotation-x={Math.PI * -0.5} position={[0, -0.8, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} receiveShadow />
        <meshStandardMaterial map={ground4} />
      </mesh>
    </>
  );
};

export default Ground;
