import React, { useRef } from "react";
import {
  OrbitControls,
  Preload,
  useAnimations,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useHelper } from "@react-three/drei";
import { BoxHelper, DirectionalLightHelper, PointLightHelper } from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame } from "@react-three/fiber";
import Trees from "./Trees";
import Lights from "./Lights";
import Ground from "./Ground";
import { Model } from "./Player";

constHome = () => {
  const meshRef = useRef();
  // useHelper(meshRef,LightShadow,'red')
  useHelper(meshRef, BoxHelper, 5, "red");
  return (
    <>
      <Trees boundaries={180} count={120} castShadow />
      <Lights />
      <Model />
      <Ground />
      <Preload all />
    </>
  );
};

export default Home;
