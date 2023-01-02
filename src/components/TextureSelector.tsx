import React, { useEffect } from 'react';
import { useStore } from '../hooks/useStore';
import { useKeyboard } from '../hooks/useKeyboard';
import * as textures from '../images/images';
import { Texture } from './Cube';

export const images = {
  dirt: textures.dirtImg,
  grass: textures.grassImg,
  glass: textures.glassImg,
  wood: textures.woodImg,
  log: textures.logImg,
};

function HotbarSelected() {
  return (
    <div
      className="absolute ml-[-12px] mt-[-12px] h-[58px] w-[58px] bg-cover"
      style={{ backgroundImage: `url("src/images/hotbar_selected.png")` }}
    ></div>
  );
}

export const TextureSelector = () => {
  const [activeTexture, setTexture] = useStore<[Texture, (texture: Texture) => void]>((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = { dirt, grass, glass, wood, log };

    const pressedTexture: [Texture, boolean] | undefined = Object.entries(textures).find(([, v]) => v) as [
      Texture,
      boolean,
    ];

    if (pressedTexture) setTexture(pressedTexture[0]);
  }, [dirt, grass, glass, wood, log]);

  // return visible ? (
  //   <div className="centered absolute  text-3xl">
  //     <div className="-translate-y-10 text-center text-white">{activeTexture}</div>
  //   </div>
  // ) : (
  //   <></>
  // );
  const itemClassName = 'h-[35px] w-[35px] mr-[13.1px] bg-cover rendering-pixelated last:mr-0';
  return (
    <div className="absolute right-[50%] bottom-0 z-30 mb-10 translate-x-[50%]">
      <div
        className="flex h-[52.8px] w-[440px] flex-row items-center justify-center bg-cover bg-no-repeat rendering-pixelated"
        style={{ backgroundImage: `url("src/images/hotbar.png")` }}
      >
        <div
          className={itemClassName}
          style={{
            backgroundImage: `url("src/images/textures/items/dirt.item.png")`,
          }}
        >
          {activeTexture === 'dirt' ? <HotbarSelected /> : ''}
        </div>
        <div className={itemClassName} style={{ backgroundImage: `url("src/images/textures/items/grass.item.png")` }}>
          {activeTexture === 'grass' ? <HotbarSelected /> : ''}
        </div>
        <div className={itemClassName} style={{ backgroundImage: `url("src/images/textures/items/glass.item.png")` }}>
          {activeTexture === 'glass' ? <HotbarSelected /> : ''}
        </div>
        <div className={itemClassName} style={{ backgroundImage: `url("src/images/textures/items/wood.item.png")` }}>
          {activeTexture === 'wood' ? <HotbarSelected /> : ''}
        </div>
        <div className={itemClassName} style={{ backgroundImage: `url("src/images/textures/items/log.item.png")` }}>
          {activeTexture === 'log' ? <HotbarSelected /> : ''}
        </div>
        <div className={itemClassName}></div>
        <div className={itemClassName}></div>
        <div className={itemClassName}></div>
        <div className={itemClassName}></div>
      </div>
    </div>
  );
};
