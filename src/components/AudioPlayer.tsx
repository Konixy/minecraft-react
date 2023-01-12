export type Tracks = 'grass' | 'gravel' | 'stone' | 'wood';
export type Track = `${Tracks}${1 | 2 | 3 | 4}`;

export function random(max: number) {
  return Math.floor(Math.random() * max);
}

// export default function AudioPlayer(track: Tracks) {
//   const audio: Track = (track + (random(4) + 1)) as Track;
//   const Player = new Audio('/src/sounds/' + audio + '.ogg');
//   Player.play();
//   return;
// }

const players = {
  grass: [
    new Audio('/src/sounds/grass1.ogg'),
    new Audio('/src/sounds/grass2.ogg'),
    new Audio('/src/sounds/grass3.ogg'),
    new Audio('/src/sounds/grass4.ogg'),
  ],
  gravel: [
    new Audio('/src/sounds/gravel1.ogg'),
    new Audio('/src/sounds/gravel2.ogg'),
    new Audio('/src/sounds/gravel3.ogg'),
    new Audio('/src/sounds/gravel4.ogg'),
  ],
  stone: [
    new Audio('/src/sounds/stone1.ogg'),
    new Audio('/src/sounds/stone2.ogg'),
    new Audio('/src/sounds/stone3.ogg'),
    new Audio('/src/sounds/stone4.ogg'),
  ],
  wood: [
    new Audio('/src/sounds/wood1.ogg'),
    new Audio('/src/sounds/wood2.ogg'),
    new Audio('/src/sounds/wood3.ogg'),
    new Audio('/src/sounds/wood4.ogg'),
  ],
};

export function loadSounds() {
  players.grass.forEach((e) => e.load());
  players.gravel.forEach((e) => e.load());
  players.stone.forEach((e) => e.load());
  players.wood.forEach((e) => e.load());
}

export default class AudioPlayer {
  track: Tracks;
  player: HTMLAudioElement;
  constructor(track: Tracks) {
    this.track = track;
    this.player = players[track][random(4)];
    // this.player.load();
  }
  play() {
    this.player.play();
  }
}
