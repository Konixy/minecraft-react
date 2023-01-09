/* eslint-disable prefer-const */
// export function GenerateNewWorld() {
//   return new Error('Function not implemented');
// }

// TODO: https://www.redblobgames.com/maps/terrain-from-noise/

import alea from 'alea';
import { createNoise2D } from 'simplex-noise';
import PoissonDiskSampling from 'poisson-disk-sampling';
import { CubeMap } from '../hooks/useStore';
import { nanoid } from 'nanoid';
import { Texture, Triplet } from './Cube';

const seed1 = Math.random();
const seed2 = Math.random();
const genE = createNoise2D(alea(seed1));
const genM = createNoise2D(alea(seed2));

function noiseE(nx: number, ny: number) {
  return genE(nx, ny) / 2 + 0.5;
}
function noiseM(nx: number, ny: number) {
  return genM(nx, ny) / 2 + 0.5;
}

type Points = {
  e: number;
  m: number;
  x: number;
  y: number;
}[];

const height = 10;
const width = 10;

export function genPoints(): Points {
  const result: Points = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let nx = x / width - 0.5,
        ny = y / height - 0.5;
      let e =
        1.0 * noiseE(1 * nx, 1 * ny) +
        0.5 * noiseE(2 * nx, 2 * ny) +
        0.25 * noiseE(4 * nx, 4 * ny) +
        0.13 * noiseE(8 * nx, 8 * ny) +
        0.06 * noiseE(16 * nx, 16 * ny) +
        0.03 * noiseE(32 * nx, 32 * ny);
      e = e / (0.8 + 0.47 + 0.38 + 0.2 + 0.06 + 0.03);
      e = Math.pow(e, 5.0);
      let m =
        1.0 * noiseM(1 * nx, 1 * ny) +
        0.75 * noiseM(2 * nx, 2 * ny) +
        0.33 * noiseM(4 * nx, 4 * ny) +
        0.33 * noiseM(8 * nx, 8 * ny) +
        0.33 * noiseM(16 * nx, 16 * ny) +
        0.5 * noiseM(32 * nx, 32 * ny);
      m = m / (1.0 + 0.75 + 0.33 + 0.33 + 0.33 + 0.5);
      result.push({ e, m, x, y });
    }
  }
  return result;
}

function addTrees(points: Points) {
  let p = new PoissonDiskSampling({
    shape: [height, width],
    maxDistance: 10,
    minDistance: 2,
    tries: 15,
    distanceFunction: (p) => {
      const e = points.filter((e) => e.x === Math.round(p[0]) && e.y === Math.round(p[1]))[0]?.e;
      return Math.pow(biome(e) === 'FOREST' || biome(e) === 'JUNGLE' ? 1 : 0, 2.7) ? 0 : 1;
    },
  });

  return p.fill();
}

export function World(): CubeMap {
  const points = genPoints();
  const trees = addTrees(points);
  const texture = 'grass' as Texture;

  const yFactor = 10;

  return points
    .map((e) => ({ key: nanoid(), pos: [e.x, Math.round(e.e * yFactor), e.y] as Triplet, texture }))
    .concat(
      trees.map((e) => ({
        key: nanoid(),
        pos: [e[0], Math.round(e[1] * yFactor) + 1, e[2]] as Triplet,
        texture: 'log',
      })),
    );
}

export function biome(e: number) {
  if (e < 0.1) return 'WATER';
  else if (e < 0.2) return 'BEACH';
  else if (e < 0.3) return 'FOREST';
  else if (e < 0.5) return 'JUNGLE';
  else if (e < 0.7) return 'SAVANNAH';
  else if (e < 0.9) return 'DESERT';
  else return 'SNOW';
}
