/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/models/character/untitled.glb 
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useInputs } from "../hooks/useInputs";

export function Model(props) {
  const currentAction=useRef("")
  const { forward, backward, left, right, shift, jump } = useInputs();
  const group = useRef();
  const { nodes, materials, animations, scene } = useGLTF(
    "models/character/untitled.glb"
  );
  const { actions } = useAnimations(animations, group);
  scene.scale.set([0.5, 0.5, 0.5]);
  
  useEffect(() => {
    let action=''
    if (forward || backward || left || right) {
      action = "WALK";
      if (shift) {
        action = "RUN";
      }
    } else if (jump) {
      action = "JUMP";
    } else {
      action = "IDLE"
    }
    if(currentAction.current!=action){
      const nextActionToPlay=actions[action]
      const current=actions[currentAction.current]
      current?.fadeOut(0.3)
      nextActionToPlay?.reset().fadeIn(0.3).play()
      currentAction.current=action
    }
  }, [forward, backward, left, right, shift, jump]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Armature"
          position={[0, -0.8, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Akai"
            geometry={nodes.Akai.geometry}
            material={materials["Akai_MAT.001"]}
            skeleton={nodes.Akai.skeleton}
            castShadow
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/character/untitled.glb");
