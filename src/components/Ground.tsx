/* eslint-disable react/no-unknown-property */
import React from 'react';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { grassTexture } from '../images/textures';
import { useStore } from '../hooks/useStore';
import { RepeatWrapping } from 'three';

export default function Ground() {
  const [addCube] = useStore((state) => [state.addCube]);

  grassTexture.wrapS = RepeatWrapping;
  grassTexture.wrapT = RepeatWrapping;
  grassTexture.repeat.set(100, 100);

  return (
    <RigidBody type="fixed">
      <mesh
        position={[0, 0.5, 0]}
        rotation-x={-Math.PI / 2}
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          const [x, y, z] = Object.values(e.point).map((val) => Math.ceil(val));
          addCube(x, y, z);
        }}
      >
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshStandardMaterial attach="material" map={grassTexture} />
      </mesh>
      <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
    </RigidBody>
  );
}
