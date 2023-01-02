/* eslint-disable react/no-unknown-property */
import React, { Ref, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
// eslint-disable-next-line import/named
import { useBox } from '@react-three/cannon';
import { BufferGeometry, Material, Mesh, Vector3 } from 'three';
import { useKeyboard } from '../hooks/useKeyboard';

const JUMP_FORCE = 3;
const SPEED = 4;

export const Player = () => {
  const actions = useKeyboard();

  const { camera, scene } = useThree();
  const [ref, api] = useBox(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 0.5, 0],
  }));

  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  const pos = useRef([0, 0, 0]);
  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);

  useFrame(() => {
    camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]));

    const direction = new Vector3();

    const frontVector = new Vector3(0, 0, (actions.moveBackward ? 1 : 0) - (actions.moveForward ? 1 : 0));

    const sideVector = new Vector3((actions.moveLeft ? 1 : 0) - (actions.moveRight ? 1 : 0), 0, 0);

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);

    api.velocity.set(direction.x, vel.current[1], direction.z);

    if (actions.jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }
  });

  ref.current?.lookAt(camera.position);
  scene.add(camera);

  return (
    <mesh
      // scale={[1, 1, 1]}
      ref={ref as unknown as Ref<Mesh<BufferGeometry, Material | Material[]>>}
    >
      <boxBufferGeometry attach="geometry" args={[1, 2]} />
      <meshStandardMaterial transparent={false} color={'green'} opacity={0} attach="material" />
    </mesh>
  );
};
