/* eslint-disable @typescript-eslint/no-empty-function */
import create from 'zustand';
import { nanoid } from 'nanoid';
import { Texture } from '../components/Cube';

export const useStore = create((set) => ({
  texture: 'dirt',
  cubes: [],
  addCube: (x: number, y: number, z: number) => {
    set((prev) => ({ cubes: [...prev.cubes, { key: nanoid(), pos: [x, y, z], texture: prev.texture }] }));
  },
  removeCube: (x: number, y: number, z: number) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube: { pos: [number, number, number] }) => {
        const [X, Y, Z] = cube.pos;
        return X != x || Y != y || Z != z;
      }),
    }));
  },
  setTexture: (texture: Texture) => {
    set(() => ({ texture }));
  },
  saveWorld: () => {},
  resetWorld: () => {},
}));
