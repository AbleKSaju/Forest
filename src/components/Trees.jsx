import { useLoader } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const tree = {
  position: { x: 0, y: 0 },
  box: 0,
};

const boxIntersect = (
  minTargetX,
  minTargetZ,
  maxTargetX,
  maxTargetZ,
  minChildX,
  minChildZ,
  maxChildX,
  maxChildZ
) => {
  let aLeftOfB = maxTargetX < minChildX;
  let aRightOfB = minTargetX > maxChildX;
  let aAboveB = minTargetZ < maxChildZ;
  let aBelowB = maxTargetZ < minChildZ;
  return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
};

const isOverLapping = (index, tree, trees) => {
  const minTargetX = tree.position.x - tree.box / 2;
  const maxTargetX = tree.position.x + tree.box / 2;
  const minTargetZ = tree.position.x - tree.box / 2;
  const maxTargetZ = tree.position.x + tree.box / 2;
  for (let i = 0; i < index; i++) {
    let minChildX = trees[i].position.x - trees[i].box / 2;
    let maxChildX = trees[i].position.x + trees[i].box / 2;
    let minChildZ = trees[i].position.z - trees[i].box / 2;
    let maxChildZ = trees[i].position.z + trees[i].box / 2;
    if (
      boxIntersect(
        minTargetX,
        minTargetZ,
        maxTargetX,
        maxTargetZ,
        minChildX,
        minChildZ,
        maxChildX,
        maxChildZ
      )
    ) {
      return true;
    }
  }
  return false;
};

const Trees = ({ boundaries, count }) => {
  const [trees, setTrees] = useState([]);
  const model = useLoader(
    GLTFLoader,
    "../../public/models/old_tree/scene.gltf"
  );

  const model3 = useLoader(
    GLTFLoader,
    "../../public/models/style_tree/scene.gltf"
  );

  model3.scene.scale.set(16, 9, 18);

  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });

  model3.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });

  const newPosition = (box, boundaries) => {
    return (
      boundaries / 2 -
      box / 2 -
      (boundaries - box) * (Math.round(Math.random() * 100) / 100)
    );
  };

  const updatePosition = (treeArray, boundaries) => {
    treeArray.forEach((val, index) => {
      do {
        val.position.x = newPosition(tree.box, boundaries);
        val.position.z = newPosition(tree.box, boundaries);
      } while (isOverLapping(index, tree, treeArray));
    });
    setTrees(treeArray, boundaries);
  };

  useEffect(() => {
    const tempTrees = [];
    for (let i = 0; i < count; i++) {
      tempTrees.push({ position: { x: 0, z: 0 }, box: 1 });
    }
    updatePosition(tempTrees, boundaries);
  }, []);
  return (
    <group>
      {trees.map((tree, index) => (
        <object3D key={index} position={[tree.position.x, 0, tree.position.z]}>
          <mesh scale={[1, 1, 1]} position={[0, -1, 0]}>
            <boxGeometry />
            <meshBasicMaterial wireframe />
          </mesh>
          <primitive object={model.scene.clone()} />
        </object3D>
      ))}
      {trees.map((tree, index) => (
        <object3D
          key={index + 20}
          position={[tree.position.x-16, -0.9, tree.position.z+10]}
        >
          <mesh scale={[1, 1, 1]} position={[0, 0, 0]}>
            <boxGeometry />
            <meshBasicMaterial wireframe />
          </mesh>
          <primitive object={model3.scene.clone()} />
        </object3D>
      ))}
    </group>
  );
};

export default Trees;
