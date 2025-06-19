/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import { Sky } from '@react-three/drei/core/Sky';
import { Physics } from '@react-three/rapier';
import Player from './components/Player';
import { Cubes } from './components/Cubes';
import TextureSelector from './components/TextureSelector';
import Menu from './components/Menu';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FPSStats from 'react-fps-stats';
import { loadSounds } from './components/AudioPlayer';
import FPV from './components/FPV';

export default function App() {
  const isLocked = useRef(false);
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(true);
  const [fov, setFov] = useState(90);

  useEffect(() => {
    loadSounds();
  }, []);

  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['KeyZ'] },
        { name: 'backward', keys: ['KeyS'] },
        { name: 'left', keys: ['KeyQ'] },
        { name: 'right', keys: ['KeyD'] },
        { name: 'jump', keys: ['Space'] },
      ]}
    >
      <Canvas shadows camera={{ fov }}>
        <GameCanvas isLocked={isLocked} setIsMenuDisplayed={setIsMenuDisplayed} />;
      </Canvas>
      <TextureSelector displayHotbar={!isMenuDisplayed} />
      <FPSStats isActive={process.env.NODE_ENV === 'developpement'} />
      <Menu displayed={isMenuDisplayed} />
      {!isMenuDisplayed && <div className="centered cursor">+</div>}
    </KeyboardControls>
  );
}

function GameCanvas({
  isLocked,
  setIsMenuDisplayed,
}: {
  isLocked: React.MutableRefObject<boolean>;
  setIsMenuDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const three = useThree();
  useEffect(() => {
    three.setSize(window.innerWidth, window.innerHeight);
  }, [window.innerWidth, window.innerHeight]);

  return (
    <>
      <Sky sunPosition={[100, 100, 20]} />
      <ambientLight intensity={0.3} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Player />
        {/* <Ground /> */}
        <Cubes />
      </Physics>
      <FPV isLocked={isLocked} setIsMenuDisplayed={setIsMenuDisplayed} />
    </>
  );
}
