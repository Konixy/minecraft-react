/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-unknown-property */
import React, { useState, useRef } from 'react';
import * as textures from '../images/textures';
import { useStore } from '../hooks/useStore';
// eslint-disable-next-line import/named
import { RigidBody, RigidBodyApi } from '@react-three/rapier';
import { position } from './Player';

export type Triplet = [x: number, y: number, z: number];
export type Texture = 'dirt' | 'grass' | 'glass' | 'wood' | 'log';
export type TextureName = `${Texture}Texture`;

export const Cube = ({ position, texture }: { position: Triplet | undefined; texture: Texture }) => {
  const ref = useRef<RigidBodyApi>();
  const activeTexture = textures[(texture + 'Texture') as TextureName];
  const [hovered, setIsHovered] = useState(false);

  const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube]);

  return (
    <RigidBody type="fixed" ref={ref as React.MutableRefObject<RigidBodyApi>} position={position}>
      <mesh
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          if (e.faceIndex) {
            const clickedFace = Math.floor(e.faceIndex / 2);
            if (ref.current?.translation()) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const [x, y, z]: Triplet = ref.current?.translation();
              if (e.nativeEvent.altKey) removeCube(x, y, z);
              // else if (position) {
              //   if (
              //     !(
              //       Math.floor(position[0]) === x &&
              //       Math.floor(position[2]) === z &&
              //       (Math.floor(position[2]) === y || Math.floor(position[2]) + 1)
              //     )
              //   ) {
              else if (clickedFace === 0) return addCube(x + 1, y, z);
              else if (clickedFace === 1) return addCube(x - 1, y, z);
              else if (clickedFace === 2) return addCube(x, y + 1, z);
              else if (clickedFace === 3) return addCube(x, y - 1, z);
              else if (clickedFace === 4) return addCube(x, y, z + 1);
              else if (clickedFace === 5) return addCube(x, y, z - 1);
              //   }
              // }
            }
          }
        }}
        onPointerEnter={async (e) => {
          e.stopPropagation();
          setIsHovered(true);
          // setActiveTexture(new TextureLoader().load(hoverTexture));
        }}
        onPointerLeave={() => {
          setIsHovered(false);
        }}
      >
        <boxBufferGeometry attach="geometry" args={[1, 1]} />
        <meshStandardMaterial
          map={activeTexture}
          transparent={true}
          opacity={texture === 'glass' ? 0.8 : 1}
          color={hovered ? 'gray' : 'white'}
          attach="material"
        />
      </mesh>
    </RigidBody>
  );
};
