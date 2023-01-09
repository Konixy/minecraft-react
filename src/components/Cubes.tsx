import React from 'react';
import { useStore } from '../hooks/useStore';
import { Cube, Texture, Triplet } from './Cube';

export const Cubes = () => {
  const [cubes] = useStore((state) => [state.cubes]);
  return cubes.map(({ key, pos, texture }: { key: string; pos: Triplet; texture: Texture }) => {
    return <Cube key={key} position={pos} texture={texture} />;
  });
};
