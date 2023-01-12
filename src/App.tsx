/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei/core/Sky';
import { Physics } from '@react-three/rapier';
import { Player } from './components/Player';
import { Cubes } from './components/Cubes';
import { TextureSelector } from './components/TextureSelector';
// eslint-disable-next-line import/named
import { PointerLockControls, PointerLockControlsProps } from '@react-three/drei/core/PointerLockControls';
import { Menu } from './components/Menu';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FPSStats from 'react-fps-stats';
import { loadSounds } from './components/AudioPlayer';

function FPV({
  isLocked,
  setIsMenuDisplayed,
}: {
  isLocked: React.MutableRefObject<boolean>;
  setIsMenuDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const controlsRef = useRef<PointerLockControlsProps & PointerLockControls>();
  const { camera, gl, setSize } = useThree();
  useEffect(() => {
    setSize(window.innerWidth, window.innerHeight);
  }, [window.innerWidth, window.innerHeight]);
  return (
    <PointerLockControls
      args={[camera, gl.domElement]}
      onUpdate={() => {
        if (controlsRef.current) {
          if (controlsRef.current.addEventListener) {
            controlsRef.current.addEventListener('lock', () => {
              isLocked.current = true;
              setIsMenuDisplayed(false);
            });
            controlsRef.current.addEventListener('unlock', () => {
              isLocked.current = false;
              setIsMenuDisplayed(true);
            });
          }
        }
      }}
      ref={controlsRef}
    />
  );
}

const app = () => {
  const isLocked = useRef(false);
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(true);
  useEffect(() => {
    loadSounds();
  }, []);
  return (
    <>
      <Canvas shadows onKeyDown={(e) => e.preventDefault()}>
        <App isLocked={isLocked} setIsMenuDisplayed={setIsMenuDisplayed} />;
      </Canvas>
      <TextureSelector />
      <FPSStats />
      {!isMenuDisplayed ? (
        <div
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="centered cursor-default select-none text-3xl text-white"
        >
          +
        </div>
      ) : (
        <Menu />
      )}
    </>
  );
};

function App({
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
      {/* eslint-disable-next-line react/no-unknown-property */}
      <ambientLight intensity={0.25} />
      <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Player />
        {/* <Ground /> */}
        <Cubes />
        <FPV isLocked={isLocked} setIsMenuDisplayed={setIsMenuDisplayed} />
      </Physics>
    </>
  );
}

export default app;
