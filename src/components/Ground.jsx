import React from "react";

const Ground = () => {
  return (
    <>
      <mesh rotation-x={Math.PI * -0.5} position={[0, -0.8, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} receiveShadow />
        <meshStandardMaterial color={0x00ff00} />
      </mesh>
    </>
  );
};

export default Ground;
