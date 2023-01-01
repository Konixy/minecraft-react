import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei/core/Sky';
import { Physics } from '@react-three/cannon';
import { Ground } from './components/Ground';
import { Player } from './components/Player';
import { Cubes } from './components/Cubes';
import { TextureSelector } from './components/TextureSelector';
// eslint-disable-next-line import/named
import { PointerLockControls, PointerLockControlsProps } from '@react-three/drei/core/PointerLockControls';

function FPV({ isLocked }: { isLocked: React.MutableRefObject<boolean> }) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const controlsRef = useRef<PointerLockControlsProps & PointerLockControls>();
  const { camera, gl } = useThree();
  return (
    <PointerLockControls
      args={[camera, gl.domElement]}
      onUpdate={() => {
        if (controlsRef.current) {
          if (controlsRef.current.addEventListener) {
            controlsRef.current.addEventListener('lock', () => {
              isLocked.current = true;
            });
            controlsRef.current.addEventListener('unlock', () => {
              isLocked.current = false;
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
  const [pos, setPos] = useState({ offsetX: window.innerWidth / 2, offsetY: window.innerHeight });
  return (
    <>
      <Canvas
        raycaster={{
          computeOffsets: (_, { size: { width, height } }) => {
            if (isLocked.current) {
              setPos({
                offsetX: width / 2,
                offsetY: height / 2,
              });
              return {
                offsetX: width / 2,
                offsetY: height / 2,
              };
            } else {
              return { offsetX: 0, offsetY: 0 };
            }
          },
        }}
      >
        <App isLocked={isLocked} />;
      </Canvas>
      <TextureSelector />
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="centered cursor-default select-none text-3xl text-white"
        style={{ left: `${pos.offsetX}px`, top: `${pos.offsetY}px` }}
      >
        +
      </div>
    </>
  );
};

function App({ isLocked }: { isLocked: React.MutableRefObject<boolean> }) {
  const three = useThree();
  useEffect(() => {
    three.setSize(window.innerWidth, window.innerHeight);
  }, [window.innerWidth, window.innerHeight]);

  return (
    <>
      <Sky sunPosition={[100, 100, 20]} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <ambientLight intensity={0.5} />
      <Physics>
        <Player />
        <Ground />
        <Cubes />
        <FPV isLocked={isLocked} />
      </Physics>
    </>
  );
}

export default app;
