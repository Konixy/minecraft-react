/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-unknown-property */
import React, { useState, useRef, useEffect } from 'react';
import * as textures from '../images/textures';
import { CubeType, useStore } from '../hooks/useStore';
// eslint-disable-next-line import/named
import { RigidBody, RigidBodyApi } from '@react-three/rapier';
import { MeshStandardMaterial } from 'three';

export type Triplet = [x: number, y: number, z: number];
export type Texture = 'dirt' | 'grass' | 'grassSide' | 'glass' | 'wood' | 'log' | 'logTop' | 'leaves';
export type TextureName = `${Texture}Texture`;
export type Direction = 'right' | 'left' | 'bottom' | 'top' | 'back' | 'front';

export const Cube = ({ position, texture }: { position: Triplet; texture: Texture }) => {
  const ref = useRef<RigidBodyApi>();
  const activeTexture = textures[(texture + 'Texture') as TextureName];
  const [hovered, setIsHovered] = useState(false);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [addCube, removeCube, cubes] = useStore((state) => [state.addCube, state.removeCube, state.cubes]);

  const textureMap = [
    directions.includes('right')
      ? null
      : texture === 'grass'
      ? textures[(texture + 'SideTexture') as TextureName]
      : activeTexture,
    directions.includes('left')
      ? null
      : texture === 'grass'
      ? textures[(texture + 'SideTexture') as TextureName]
      : activeTexture,
    directions.includes('top')
      ? null
      : texture === 'log'
      ? textures[(texture + 'TopTexture') as TextureName]
      : activeTexture,
    directions.includes('bottom')
      ? null
      : texture === 'log'
      ? textures[(texture + 'TopTexture') as TextureName]
      : texture === 'grass'
      ? textures['dirtTexture' as TextureName]
      : activeTexture,
    directions.includes('front')
      ? null
      : texture === 'grass'
      ? textures[(texture + 'SideTexture') as TextureName]
      : activeTexture,
    directions.includes('back')
      ? null
      : texture === 'grass'
      ? textures[(texture + 'SideTexture') as TextureName]
      : activeTexture,
  ];

  useEffect(() => {
    adjustFaces();
  }, [cubes]);

  // console.log(directions);

  const faces: { dir: [number, number, number]; name: Direction }[] = [
    {
      name: 'left',
      dir: [-1, 0, 0],
    },
    {
      name: 'right',
      dir: [1, 0, 0],
    },
    {
      name: 'bottom',
      dir: [0, -1, 0],
    },
    {
      name: 'top',
      dir: [0, 1, 0],
    },
    {
      name: 'back',
      dir: [0, 0, -1],
    },
    {
      name: 'front',
      dir: [0, 0, 1],
    },
  ];

  function getVoxel(x: number, y: number, z: number) {
    const cube = cubes.filter((cube: CubeType) => cube.pos[0] === x && cube.pos[1] === y && cube.pos[2] === z)[0];
    if (cube) return cube;
    else return null;
  }

  function adjustFaces() {
    for (const face of faces) {
      const neighbour = getVoxel(position[0] + face.dir[0], position[1] + face.dir[1], position[2] + face.dir[2]);
      if (neighbour) {
        if (neighbour.texture === 'glass' || neighbour.texture === 'leaves') return;
        switch (face.name) {
          case 'left':
            setDirections([...directions, 'left']);
            break;
          case 'right':
            setDirections([...directions, 'right']);
            break;
          case 'bottom':
            setDirections([...directions, 'bottom']);
            break;
          case 'top':
            setDirections([...directions, 'top']);
            break;
          case 'back':
            setDirections([...directions, 'back']);
            break;
          case 'front':
            setDirections([...directions, 'front']);
            break;
        }
      }
    }
  }

  return (
    <RigidBody type="fixed" ref={ref as React.MutableRefObject<RigidBodyApi>} position={position}>
      <mesh
        castShadow
        material={[
          ...textureMap.map((e) =>
            e
              ? new MeshStandardMaterial({
                  map: e,
                  transparent: true,
                  opacity: texture === 'glass' ? 0.8 : 1,
                  color: hovered ? 'gray' : 'white',
                })
              : new MeshStandardMaterial(),
          ),
        ]}
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          if (e.faceIndex) {
            const clickedFace = Math.floor(e.faceIndex / 2);
            if (ref.current?.translation()) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const [x, y, z]: Triplet = ref.current?.translation();

              if (e.which !== 3) removeCube(x, y, z);
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
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        {/* {textureMap.map((e) => (
          <meshStandardMaterial
            key={Math.random()}
            map={e}
            transparent={true}
            opacity={texture === 'glass' ? 0.8 : 1}
            color={hovered ? 'gray' : 'white'}
            attach="material"
          />
        ))} */}
        {/* <meshStandardMaterial
          map={activeTexture}
          transparent={true}
          opacity={texture === 'glass' ? 0.8 : 1}
          color={hovered ? 'gray' : 'white'}
          attach="material"
        /> */}
      </mesh>
    </RigidBody>
  );
};
