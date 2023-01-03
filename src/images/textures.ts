import { NearestFilter, TextureLoader } from 'three';
import { dirtImg, glassImg, grassImg, logImg, woodImg } from './images';

const dirtTexture = new TextureLoader().load(dirtImg);
const glassTexture = new TextureLoader().load(glassImg);
const grassTexture = new TextureLoader().load(grassImg);
const logTexture = new TextureLoader().load(logImg);
const woodTexture = new TextureLoader().load(woodImg);

dirtTexture.magFilter = NearestFilter;
grassTexture.magFilter = NearestFilter;
glassTexture.magFilter = NearestFilter;
logTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;

export { dirtTexture, glassTexture, grassTexture, logTexture, woodTexture };
