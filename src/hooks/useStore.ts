/* eslint-disable @typescript-eslint/no-empty-function */
import create from 'zustand';
import { nanoid } from 'nanoid';
import { Texture, Triplet } from '../components/Cube';
import { World } from '../components/WorldGenerator';

export type CubeType = { key: string; pos: Triplet; texture: Texture };
export type CubeMap = CubeType[];

export const useStore = create((set) => ({
  texture: 'dirt' as Texture,
  cubes: World(),
  addCube: (x: number, y: number, z: number) => {
    set((prev) => ({ cubes: [...prev.cubes, { key: nanoid(), pos: [x, y, z], texture: prev.texture }] }));
  },
  addCubes: (cubes: { x: number; y: number; z: number }[], texture: Texture) => {
    set((prev) => ({
      cubes: [...prev.cubes, ...cubes.map((cube) => ({ key: nanoid(), pos: [cube.x, cube.y, cube.z], texture }))],
    }));
  },
  removeCube: (x: number, y: number, z: number) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube: { pos: [number, number, number] }) => {
        const [X, Y, Z] = cube.pos;
        return X != x || Y != y || Z != z;
      }),
    }));
  },
  setTexture: (texture: Texture | null) => {
    set(() => ({ texture }));
  },
  saveWorld: () => {},
  resetWorld: () => {},
}));
