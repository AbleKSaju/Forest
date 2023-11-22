import { useLoader } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from "three";

const Ground = () => {
  const ground2 = useLoader(TextureLoader, '../../public/Ground/ground2.jpg')
  const ground = useLoader(TextureLoader, '../../public/Ground/ground.jpg')
  const ground3 = useLoader(TextureLoader, '../../public/Ground/ground3.jpg')
  const ground4 = useLoader(TextureLoader, '../../public/Ground/ground4.jpg')
  // const intensity = 0.5; 
  // let groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture });
  // groundMaterial.color.setScalar(intensity);
  return (
    <>
      <mesh  rotation-x={Math.PI * -0.5} position={[0, -0.8, 0]} receiveShadow>
        <planeGeometry args={[140, 140]} receiveShadow />
        <meshStandardMaterial map={ground4} />
      </mesh>
    </>
  );
};

export default Ground;
