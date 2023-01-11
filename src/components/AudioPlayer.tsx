export type Tracks = 'grass' | 'gravel' | 'stone' | 'wood';
export type Track = `${Tracks}${1 | 2 | 3 | 4}`;

export default function AudioPlayer(track: Tracks) {
  const audio = track + (Math.floor(Math.random() * 4) + 1);
  const Player = new Audio('/src/sounds/' + audio + '.ogg');
  Player.play();
  return;
}
