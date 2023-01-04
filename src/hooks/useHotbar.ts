import { useEffect, useState } from 'react';
import { Texture } from '../components/Cube';

type HotbarItem = { texture: Texture | null; current: boolean };
type Hotbar = [
  HotbarItem,
  HotbarItem,
  HotbarItem,
  HotbarItem,
  HotbarItem,
  HotbarItem,
  HotbarItem,
  HotbarItem,
  HotbarItem,
];

export default function useHotbar(): {
  active: HotbarItem;
  setActive: (index: number) => void;
  hotbar: Hotbar;
  setItem: (index: number, texture: Texture) => void;
} {
  const [hotbar, setHotbar] = useState<Hotbar>([
    { texture: 'dirt', current: true },
    { texture: 'grass', current: false },
    { texture: 'glass', current: false },
    { texture: 'wood', current: false },
    { texture: 'log', current: false },
    { texture: null, current: false },
    { texture: null, current: false },
    { texture: null, current: false },
    { texture: null, current: false },
  ]);

  let active = hotbar.filter((e) => e.current === true)[0];
  useEffect(() => {
    active = hotbar.filter((e) => e.current === true)[0];
  }, [hotbar]);

  function setActive(index: number) {
    setHotbar(
      hotbar.map((e, i) => {
        e.current = i === index ? true : false;
        return e;
      }) as Hotbar,
    );
  }
  function setItem(index: number, texture: Texture): void {
    hotbar[index].texture = texture;
    return setHotbar(hotbar);
  }

  return { active, setActive, hotbar, setItem };
}
