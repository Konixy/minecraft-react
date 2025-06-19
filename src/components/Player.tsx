/* eslint-disable react/no-unknown-property */
import React, { Ref, useRef } from 'react';
import * as RAPIER from '@dimforge/rapier3d-compat';
import { useFrame, useThree } from '@react-three/fiber';
// eslint-disable-next-line import/named
import { Vector3 } from 'three';
// eslint-disable-next-line import/named
import { CylinderCollider, RapierRigidBody, RigidBody, useRapier } from '@react-three/rapier';
import { useKeyboard } from '../hooks/useKeyboard';

const JUMP_FORCE = 7.5;
const SPEED = 4;

let velocity: Vector3 | undefined;
export let position: Vector3 | undefined = new Vector3(0, 20, 0);

export default function Player() {
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboard();

  const rapier = useRapier();

  const { camera } = useThree();
  const ref = useRef<RapierRigidBody>();

  useFrame((state) => {
    velocity = new Vector3(ref.current?.linvel().x, ref.current?.linvel().y, ref.current?.linvel().z);
    position = new Vector3(ref.current?.translation().x, ref.current?.translation().y, ref.current?.translation().z);

    if (ref.current?.translation())
      state.camera.position.set(ref.current.translation().x, ref.current.translation().y, ref.current.translation().z);

    const direction = new Vector3();

    const frontVector = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0));

    const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0);

    const directionAngle = Math.atan2(camera.position.x, camera.position.z);

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);

    ref.current?.setLinvel(new Vector3(direction.x, velocity?.y, direction.z), false);

    const world = rapier.world;
    const ray = world.castRay(new RAPIER.Ray(ref.current?.translation() as Vector3, { x: 0, y: -1, z: 0 }), 1000, true);

    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;
    if (jump && grounded) {
      // && Math.abs(vel.current[1]) < 0.05
      // ref.current?.setLinvel(new Vector3(velocity?.x, JUMP_FORCE, velocity?.z), false);
      ref.current?.setLinvel({ x: 0, y: JUMP_FORCE, z: 0 }, false);
    }
  });

  // ref.current?.lookAt(camera.position);
  // scene.add(camera);

  return (
    // <mesh
    //   // scale={[1, 1, 1]}
    //   ref={ref as unknown as Ref<Mesh<BufferGeometry, Material | Material[]>>}
    // >
    //   <boxGeometry attach="geometry" args={[1, 2]} />
    //   <meshStandardMaterial transparent={false} color={'green'} opacity={0} attach="material" />
    // </mesh>
    <RigidBody
      ref={ref as Ref<RapierRigidBody>}
      colliders="cuboid"
      mass={1} // 1
      type="dynamic"
      position={position}
      enabledRotations={[false, false, false]}
    >
      <CylinderCollider args={[0.95, 0.21]} />
    </RigidBody>
  );
}
