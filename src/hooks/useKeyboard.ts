import { useCallback, useEffect, useState } from 'react';

type KeyActionMap =
  | 'KeyW'
  | 'KeyS'
  | 'KeyA'
  | 'KeyD'
  | 'Space'
  | 'Digit1'
  | 'Digit2'
  | 'Digit3'
  | 'Digit4'
  | 'Digit5'
  | 'Digit6'
  | 'Digit7'
  | 'Digit8'
  | 'Digit9';

function actionByKey(key: KeyActionMap | string) {
  const keyActionMap = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
    Digit1: 'hotbar1',
    Digit2: 'hotbar2',
    Digit3: 'hotbar3',
    Digit4: 'hotbar4',
    Digit5: 'hotbar5',
    Digit6: 'hotbar6',
    Digit7: 'hotbar7',
    Digit8: 'hotbar8',
    Digit9: 'hotbar9',
  };
  return keyActionMap[key as KeyActionMap];
}

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    hotbar1: false,
    hotbar2: false,
    hotbar3: false,
    hotbar4: false,
    hotbar5: false,
    hotbar6: false,
    hotbar7: false,
    hotbar8: false,
    hotbar9: false,
  });

  const handleKeyDown = useCallback((e: unknown) => {
    console.log(e);
    (e as KeyboardEvent).preventDefault();
    const action = actionByKey((e as KeyboardEvent).code);
    if (action) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: true,
        };
      });
    }
  }, []);

  const handleKeyUp = useCallback((e: unknown) => {
    const action = actionByKey((e as KeyboardEvent).code);
    if (action) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: false,
        };
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return actions;
};
