/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import { useBox } from '@react-three/cannon';
import * as textures from '../images/textures';
import { useStore } from '../hooks/useStore';
import { BufferGeometry, Material, Mesh } from 'three';

export type Triplet = [x: number, y: number, z: number];
export type Texture = 'dirt' | 'grass' | 'glass' | 'wood' | 'log';
export type TextureName = `${Texture}Texture`;

export const Cube = ({ position, texture }: { position: Triplet | undefined; texture: Texture }) => {
  const activeTexture = textures[(texture + 'Texture') as TextureName];
  const [hovered, setIsHovered] = useState(false);

  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }));

  const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube]);

  return (
    <mesh
      castShadow
      ref={ref as unknown as React.Ref<Mesh<BufferGeometry, Material | Material[]>>}
      onClick={(e) => {
        e.stopPropagation();
        if (e.faceIndex) {
          const clickedFace = Math.floor(e.faceIndex / 2);
          if (ref.current?.position) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const [x, y, z] = ref.current?.position;
            if (e.nativeEvent.altKey) removeCube(x, y, z);
            else if (clickedFace === 0) return addCube(x + 1, y, z);
            else if (clickedFace === 1) return addCube(x - 1, y, z);
            else if (clickedFace === 2) return addCube(x, y + 1, z);
            else if (clickedFace === 3) return addCube(x, y - 1, z);
            else if (clickedFace === 4) return addCube(x, y, z + 1);
            else if (clickedFace === 5) return addCube(x, y, z - 1);
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
  );
};
