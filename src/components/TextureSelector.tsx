import React, { useEffect } from 'react';
import { useStore } from '../hooks/useStore';
// import { useKeyboard } from '../hooks/useKeyboard';
import * as textures from '../images/images';
import { Texture } from './Cube';
import useHotbar from '../hooks/useHotbar';
import { useKeyboard } from '../hooks/useKeyboard';

export const images = {
  dirt: textures.dirtImg,
  grass: textures.grassImg,
  glass: textures.glassImg,
  wood: textures.woodImg,
  log: textures.logImg,
};

function HotbarItem({ selected, textureName }: { selected: boolean; textureName: Texture | null }) {
  return (
    <div
      className="hotbar-item"
      style={textureName ? { backgroundImage: `url("src/images/textures/items/${textureName}.item.png")` } : {}}
    >
      {selected ? (
        <div
          className="hotbar-item-selected"
          style={{ backgroundImage: `url("src/images/hotbar_selected.png")` }}
        ></div>
      ) : (
        ''
      )}
    </div>
  );
}

export default function TextureSelector({ displayHotbar }: { displayHotbar: boolean }) {
  const [setTexture] = useStore((state) => [state.setTexture]);
  const keys = useKeyboard();
  const { active, setActive, hotbar } = useHotbar();

  useEffect(() => {
    const textures = { keys };

    const pressedTexture = Object.entries(textures).find(([, v]) => v);
    if (pressedTexture) {
      const index = Number(pressedTexture[0].split('')[6]);
      setActive(index);
      setTexture(active.texture);
    }

    if (!active || pressedTexture) setActive(0);
  }, [keys]);

  return (
    <div className="hotbar-container" style={{ display: displayHotbar ? 'block' : 'none' }}>
      <div className="hotbar" style={{ backgroundImage: `url("src/images/hotbar.png")` }}>
        {hotbar.map((e, index) => (
          <HotbarItem key={index} selected={e.current} textureName={e.texture} />
        ))}
      </div>
    </div>
  );
}
