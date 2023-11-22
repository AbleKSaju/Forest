import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { useInputs } from "../hooks/useInputs";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuarternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

const directionOffset = ({ forward, backward, left, right }) => {
  var directionOffset = 0;
  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4;
    } else if (right) {
      directionOffset = -Math.PI / 4;
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2;
    } else if (right) {
      directionOffset = -Math.PI / 4 - Math.PI / 2;
    } else {
      directionOffset = Math.PI;
    }
  } else if (left) {
    directionOffset = Math.PI / 2;
  } else if (right) {
    directionOffset = -Math.PI / 2;
  }
  return directionOffset;
};

export function Model(props) {
  const { forward, backward, left, right, shift, jump } = useInputs();
  const group = useRef();
  const { nodes, materials, animations, scene } = useGLTF(
    "models/character/untitled.glb"
  );
  const { actions } = useAnimations(animations, group);
  scene.scale.set([0.5, 0.5, 0.5]);
  const currentAction = useRef("");
  const controlRef = useRef();
  const camera = useThree((state) => state.camera);

  const updateCameraTarget = (moveX, moveZ) => {
    // Update Camera target
    cameraTarget.x = scene.position.x;
    cameraTarget.y = scene.position.y + 2;
    cameraTarget.z = scene.position.z;
    if (controlRef.current) {
      controlRef.current.target.copy(cameraTarget);
    }

    // Move Camera
    camera.position.x += moveX;
    camera.position.z += moveZ;
    camera.lookAt(cameraTarget);
  };

  useEffect(() => {
    let action = "IDLE";
    if (forward || backward || left || right) {
      action = "WALK";
      if (shift) {
        action = "RUN";
      }
      else if (jump) {
        action = "JUMP";
      }
    } else if (jump) {
      action = "JUMP";
    } else {
      action = "IDLE";
    }
    if (currentAction.current != action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.3);
      nextActionToPlay?.reset().fadeIn(0.3).play();
      currentAction.current = action;
    }
  }, [forward, backward, left, right, shift, jump]);

  useFrame((state, delta) => {
    if (currentAction.current === "RUN" || currentAction.current === "WALK") {
      //Calculate toward camera direction
      let angleYCameraPosition = Math.atan2(
        camera.position.x - scene.position.x,
        camera.position.z - scene.position.z
      );
      //Diagonal movement angle Offset
      let newDirectionOffSet = directionOffset({
        forward,
        backward,
        left,
        right,
      });
      //Rotate Model
      rotateQuarternion.setFromAxisAngle(
        rotateAngle,
        angleYCameraPosition + newDirectionOffSet
      );
      group.current.rotation.setFromQuaternion(rotateQuarternion);
      // scene.quaternion.rotateTowards(rotateQuarternion, 0.2);

      //Calculate Direction
      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffSet);

      //run walk velocity
      const velocity = currentAction.current === "RUN" ? 8 : 3;

      //move Model and character
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;
      group.current.position.x += moveX;
      group.current.position.z += moveZ;
      updateCameraTarget(moveX, moveZ);
    }
  });

  return (
    <>
      <OrbitControls ref={controlRef} />
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
              <pointLight intensity={2} position={[0, 1, -0.5]} />
      <pointLight intensity={1} position={[0, 1, 0.5]} />
          <group
            name="Armature"
            position={[0, -0.8, 0]}
            // rotation={[Math.PI / 2, 0, 0]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
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
    </>
  );
}

useGLTF.preload("models/character/untitled.glb");
