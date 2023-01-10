import React, { useEffect } from 'react';
import { useStore } from '../hooks/useStore';
import { useKeyboard } from '../hooks/useKeyboard';
import * as textures from '../images/images';
import { Texture } from './Cube';
import useHotbar from '../hooks/useHotbar';

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
      className="mr-[13.1px] h-[35px] w-[35px] bg-cover rendering-pixelated last:mr-0"
      style={textureName ? { backgroundImage: `url("src/images/textures/items/${textureName}.item.png")` } : {}}
    >
      {selected ? (
        <div
          className="absolute ml-[-12px] mt-[-12px] h-[58px] w-[58px] bg-cover"
          style={{ backgroundImage: `url("src/images/hotbar_selected.png")` }}
        ></div>
      ) : (
        ''
      )}
    </div>
  );
}

export const TextureSelector = () => {
  const [activeTexture, setTexture] = useStore((state) => [state.texture, state.setTexture]);
  const keys = useKeyboard();
  const { active, setActive, hotbar } = useHotbar();
  // console.log(active);

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

  // console.log(hotbar);
  // return visible ? (
  //   <div className="centered absolute  text-3xl">
  //     <div className="-translate-y-10 text-center text-white">{activeTexture}</div>
  //   </div>
  // ) : (
  //   <></>
  // );
  return (
    <div className="absolute right-[50%] bottom-0 z-30 mb-10 translate-x-[50%]">
      <div
        className="flex h-[52.8px] w-[440px] flex-row items-center justify-center bg-cover bg-no-repeat rendering-pixelated"
        style={{ backgroundImage: `url("src/images/hotbar.png")` }}
      >
        {hotbar.map((e, index) => (
          <HotbarItem key={index} selected={e.current} textureName={e.texture} />
        ))}
      </div>
    </div>
  );
};
