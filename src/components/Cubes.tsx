import React, { useEffect } from 'react';
import { useStore } from '../hooks/useStore';
import { Cube, Texture, Triplet } from './Cube';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Geometry } from 'three-stdlib';

export const Cubes = () => {
  const [cubes, addCubes, removeCube] = useStore((state) => [state.cubes, state.addCubes, state.removeCube]);

  useEffect(() => {
    for (const cube of cubes) {
      if (cubes.filter((e) => cube.pos === e.pos).length > 1) {
        removeCube(...cube.pos);
        addCubes([{ x: cube.pos[0], y: cube.pos[1], z: cube.pos[2] }], cube.texture);
      }
    }
  }, [cubes]);

  const cubesGeometry = cubes.map((e) => {
    const geometry = new Geometry();
  });

  return (
    <>
      {cubes.map(({ key, pos, texture }: { key: string; pos: Triplet; texture: Texture }) => {
        return <Cube key={key} position={pos} texture={texture} />;
      })}
    </>
  );
};
