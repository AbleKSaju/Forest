import React, { useRef } from "react";
import { OrbitControls, Preload, useGLTF, useTexture } from "@react-three/drei";
import { useHelper } from "@react-three/drei";
import { BoxHelper, DirectionalLightHelper, PointLightHelper } from "three";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame } from "@react-three/fiber";
import Trees from "./Trees";
import Lights from "./Lights";
import Ground from "./Ground";

const Home = () => {
  const meshRef = useRef();
  // useHelper(meshRef,LightShadow,'red')
  useHelper(meshRef, BoxHelper, 5, "red");
  // const usl = "../../public/istockphoto-865457032-612x612.jpg";
  // const texture = useTexture(usl);
  // const count=Math.random() * 60
  // const boundaries=Math.random()* 60

  return (
    <>
      <OrbitControls />
      <Trees boundaries={50} count={10} castShadow />
      <Lights/>
      <Ground/>
  
      <Preload all />
    </>
  );
};

export default Home;
