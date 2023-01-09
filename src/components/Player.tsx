/* eslint-disable react/no-unknown-property */
import React, { Ref, useRef } from 'react';
import * as RAPIER from '@dimforge/rapier3d-compat';
import { useFrame, useThree } from '@react-three/fiber';
// eslint-disable-next-line import/named
import { Vector3 } from 'three';
import { useKeyboard } from '../hooks/useKeyboard';
// eslint-disable-next-line import/named
import { CylinderCollider, RigidBody, RigidBodyApi, useRapier } from '@react-three/rapier';

const JUMP_FORCE = 3;
const SPEED = 4;

let velocity: Vector3 | undefined;
export let position: Vector3 | undefined = new Vector3(0, 20, 0);

export const Player = () => {
  const actions = useKeyboard();

  const rapier = useRapier();

  const { camera } = useThree();
  const ref = useRef<RigidBodyApi>();

  useFrame((state) => {
    velocity = ref.current?.linvel();
    position = ref.current?.translation();

    if (ref.current?.translation())
      state.camera.position.set(ref.current.translation().x, ref.current.translation().y, ref.current.translation().z);

    const direction = new Vector3();

    const frontVector = new Vector3(0, 0, (actions.moveBackward ? 1 : 0) - (actions.moveForward ? 1 : 0));

    const sideVector = new Vector3((actions.moveLeft ? 1 : 0) - (actions.moveRight ? 1 : 0), 0, 0);

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);

    ref.current?.setLinvel(new Vector3(direction.x, velocity?.y, direction.z));

    const world = rapier.world.raw();
    const ray = world.castRay(
      new RAPIER.Ray(ref.current?.translation() as Vector3, { x: 0, y: -1, z: 0 }),
      10000,
      true,
    );
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;

    if (grounded && actions.jump) {
      // && Math.abs(vel.current[1]) < 0.05
      ref.current?.setLinvel(new Vector3(velocity?.x, JUMP_FORCE, velocity?.z));
    }
  });

  // ref.current?.lookAt(camera.position);
  // scene.add(camera);

  return (
    // <mesh
    //   // scale={[1, 1, 1]}
    //   ref={ref as unknown as Ref<Mesh<BufferGeometry, Material | Material[]>>}
    // >
    //   <boxBufferGeometry attach="geometry" args={[1, 2]} />
    //   <meshStandardMaterial transparent={false} color={'green'} opacity={0} attach="material" />
    // </mesh>
    <RigidBody
      ref={ref as Ref<RigidBodyApi>}
      colliders="cuboid"
      mass={0} // 1
      type="dynamic"
      position={position}
      enabledRotations={[false, false, false]}
    >
      <CylinderCollider args={[0.95, 0.21]} />
    </RigidBody>
  );
};
