import React, { useRef } from "react";
import { Preload } from "@react-three/drei";
import { useHelper } from "@react-three/drei";
import { BoxHelper } from "three";
import Trees from "./Trees";
import Lights from "./Lights";
import Ground from "./Ground";
import { Model } from "./Player";

const Home = () => {
  const meshRef = useRef();
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
