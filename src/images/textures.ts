import { NearestFilter, TextureLoader } from 'three';
import { dirtImg, glassImg, grassImg, grassSideImg, logImg, logTopImg, woodImg, leavesImg } from './images';

const dirtTexture = new TextureLoader().load(dirtImg);
const glassTexture = new TextureLoader().load(glassImg);
const grassTexture = new TextureLoader().load(grassImg);
const grassSideTexture = new TextureLoader().load(grassSideImg);
const logTexture = new TextureLoader().load(logImg);
const logTopTexture = new TextureLoader().load(logTopImg);
const woodTexture = new TextureLoader().load(woodImg);
const leavesTexture = new TextureLoader().load(leavesImg);

dirtTexture.magFilter = NearestFilter;
grassTexture.magFilter = NearestFilter;
grassSideTexture.magFilter = NearestFilter;
glassTexture.magFilter = NearestFilter;
logTexture.magFilter = NearestFilter;
logTopTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;
leavesTexture.magFilter = NearestFilter;

export {
  dirtTexture,
  glassTexture,
  grassTexture,
  grassSideTexture,
  logTexture,
  logTopTexture,
  woodTexture,
  leavesTexture,
};
