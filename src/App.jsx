import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {Canvas} from '@react-three/fiber'
import Home from "./components/Home";

function App() {
  return (
    <>
      <Canvas shadows>
        <Home/>
      </Canvas>
    </>
  );
}

export default App;
