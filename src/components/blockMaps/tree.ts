import { nanoid } from 'nanoid';
import { CubeMap } from '../../hooks/useStore';
import { Triplet, Texture } from '../Cube';

function genTreeMap() {
  const treeLeavesMap = [
    { x: 1, y: 3, z: 0 },
    { x: 0, y: 3, z: 1 },
    { x: 1, y: 3, z: 1 },
    { x: -1, y: 3, z: 0 },
    { x: 0, y: 3, z: -1 },
    { x: -1, y: 3, z: -1 },
    { x: 1, y: 3, z: -1 },
    { x: -1, y: 3, z: 1 },
    { x: 2, y: 3, z: 0 },
    { x: 2, y: 3, z: 1 },
    { x: 2, y: 3, z: -1 },
    { x: 0, y: 3, z: 2 },
    { x: -1, y: 3, z: 2 },
    { x: 1, y: 3, z: 2 },
    { x: 0, y: 3, z: -2 },
    { x: -1, y: 3, z: -2 },
    { x: 1, y: 3, z: -2 },
    { x: -2, y: 3, z: 0 },
    { x: -2, y: 3, z: 1 },
    { x: -2, y: 3, z: -1 },
    { x: 1, y: 4, z: 0 },
    { x: 0, y: 4, z: 1 },
    { x: 1, y: 4, z: 1 },
    { x: -1, y: 4, z: 0 },
    { x: 0, y: 4, z: -1 },
    { x: -1, y: 4, z: -1 },
    { x: 1, y: 4, z: -1 },
    { x: -1, y: 4, z: 1 },
    { x: 2, y: 4, z: 0 },
    { x: 2, y: 4, z: 1 },
    { x: 2, y: 4, z: -1 },
    { x: 0, y: 4, z: 2 },
    { x: -1, y: 4, z: 2 },
    { x: 1, y: 4, z: 2 },
    { x: 0, y: 4, z: -2 },
    { x: -1, y: 4, z: -2 },
    { x: 1, y: 4, z: -2 },
    { x: -2, y: 4, z: 0 },
    { x: -2, y: 4, z: 1 },
    { x: -2, y: 4, z: -1 },
    { x: 0, y: 5, z: 0 },
    { x: 1, y: 5, z: 0 },
    { x: 0, y: 5, z: 1 },
    { x: 1, y: 5, z: 1 },
    { x: -1, y: 5, z: 0 },
    { x: 0, y: 5, z: -1 },
    { x: -1, y: 5, z: -1 },
    { x: 1, y: 5, z: -1 },
    { x: -1, y: 5, z: 1 },
    { x: 0, y: 6, z: 0 },
    { x: -1, y: 6, z: 0 },
    { x: 1, y: 6, z: 0 },
    { x: 0, y: 6, z: -1 },
    { x: 0, y: 6, z: 1 },
  ];
  return treeLeavesMap;
}

export function tree(x: number, y: number, z: number): CubeMap {
  return [0, 1, 2, 3, 4]
    .map((e) => ({ key: nanoid(), pos: [x, y + e, z] as Triplet, texture: 'log' as Texture }))
    .concat(
      genTreeMap().map((e) => ({
        key: nanoid(),
        pos: [x + e.x, y + e.y, z + e.z] as Triplet,
        texture: 'leaves' as Texture,
      })),
    );
}
