/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/models/character/character.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/character.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Akai003.geometry} material={materials['Akai_MAT.003']} rotation={[Math.PI / 2, 0, 0]} scale={0.01} castShadow/>
    </group>
  )
}

useGLTF.preload('/character.glb')