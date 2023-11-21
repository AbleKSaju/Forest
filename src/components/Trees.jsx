import { useLoader } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const tree = {
  position: { x: 0, y: 0 },
  box: 0,
};

const Trees = ({ boundaries, count }) => {
  const [trees, setTrees] = useState([]);
  const model = useLoader(
    GLTFLoader,
    "../../public/models/old_tree/scene.gltf"
  );
  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });

  const uodatePosition = (treeArray, boundary) => {
    treeArray.map((val) => {
      val.position.x = Math.random() * 100;
      val.position.z = Math.random() * 100;
    });
    setTrees(treeArray);
  };

  useEffect(() => {
    const tempTrees = [];
    for (let i = 0; i < 20; i++) {
      tempTrees.push({ position: { x: 0, z: 0 }, box: 1 });
    }
    uodatePosition(tempTrees, boundaries);
  }, []);
  return (
    <group>
      {trees.map((tree,index) => (
        <object3D key={index} position={[tree.position.x,0,tree.position.z]}>
            <primitive object={model.scene.clone()} />
        </object3D>
      ))}
    </group>
  );
};

export default Trees;
