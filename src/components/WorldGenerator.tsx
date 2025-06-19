// TODO: https://www.redblobgames.com/maps/terrain-from-noise/

import alea from 'alea';
import { createNoise2D } from 'simplex-noise';
import PoissonDiskSampling from 'poisson-disk-sampling';
import { CubeMap } from '../hooks/useStore';
import { nanoid } from 'nanoid';
import { Texture, Triplet } from './Cube';
import { tree } from './blockMaps/tree';

const height = 40;
const width = 40;
const yFactor = 10; // 8

const seed1 = Math.random();
const seed2 = Math.random();
// console.log('Seed 1: %s, Seed 2: %d', seed1, seed2);
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

export function genPoints(): Points {
  const result: Points = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = x / width - 0.5,
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
      // use addCube() to see real time world generation
    }
  }
  return result;
}

function addTrees(points: Points) {
  const p = new PoissonDiskSampling({
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

export function GenWorld(): CubeMap {
  const points = genPoints();
  const treesPoints = addTrees(points);
  const texture = 'grass' as Texture;
  const trees: CubeMap = [];

  treesPoints.map((e) => {
    const x = Math.round(e[0]),
      z = Math.round(e[1]);
    // console.log(points.filter((p) => p.x === x && p.y === z));
    const point = points.filter((p) => p.x === x && p.y === z);

    if (point[0]) {
      const y = Math.round(point[0].e * yFactor);
      tree(x, y + 1, z).forEach((e) => trees.push(e));
    }
  });

  return points
    .map((e) => ({ key: nanoid(), pos: [e.x, Math.round(e.e * yFactor), e.y] as Triplet, texture }))
    .concat(trees);
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
