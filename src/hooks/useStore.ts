/* eslint-disable @typescript-eslint/no-empty-function */
// eslint-disable-next-line import/named
import create, { SetState } from 'zustand';
import { nanoid } from 'nanoid';
import { Texture, Triplet } from '../components/Cube';
import { GenWorld } from '../components/WorldGenerator';

export type CubeType = { key: string; pos: Triplet; texture: Texture };
export type CubeMap = CubeType[];

type Store = {
  texture: Texture | null;
  cubes: CubeMap;
  addCube: (x: number, y: number, z: number) => void;
  addCubes: (cubes: { x: number; y: number; z: number }[], texture: Texture) => void;
  removeCube: (x: number, y: number, z: number) => void;
  setTexture: (texture: Texture | null) => void;
  saveWorld: () => void;
  resetWorld: () => void;
};

export const useStore = create((set: SetState<Store>) => ({
  texture: 'dirt' as Texture | null,
  cubes: GenWorld(),
  addCube: (x: number, y: number, z: number) => {
    set((prev) => {
      if (!prev.texture) return prev;
      else return { cubes: [...prev.cubes, { key: nanoid(), pos: [x, y, z], texture: prev.texture }] };
    });
  },
  addCubes: (cubes: { x: number; y: number; z: number }[], texture: Texture) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        ...cubes.map((cube) => ({ key: nanoid(), pos: [cube.x, cube.y, cube.z] as Triplet, texture })),
      ],
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
