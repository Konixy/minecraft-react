import React from 'react';
import { useThree } from '@react-three/fiber';
// eslint-disable-next-line import/named
import { PointerLockControls } from '@react-three/drei/core/PointerLockControls';

export default function FPV({
  isLocked,
  setIsMenuDisplayed,
}: {
  isLocked: React.MutableRefObject<boolean>;
  setIsMenuDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { camera, gl } = useThree();
  

  // useEffect(() => {
  //   setSize(window.innerWidth, window.innerHeight);
  // }, [window.innerWidth, window.innerHeight]);

  return (
    <PointerLockControls
      selector=".back-to-game-btn"
      args={[camera, gl.domElement]}
      onUpdate={(self) => {
        if (self) {
          if (self.addEventListener) {
            self.addEventListener('lock', () => {
              isLocked.current = true;
              setIsMenuDisplayed(false);
            });
            self.addEventListener('unlock', () => {
              isLocked.current = false;
              setIsMenuDisplayed(true);
            });
          }
        }
      }}
    />
  );
}
