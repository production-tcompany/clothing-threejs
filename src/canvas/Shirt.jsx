import React, { useEffect, useRef, useState} from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';
const Shirt = () => {
    const meshRef = useRef()
    const snap = useSnapshot(state);
    const  {nodes, materials} = useGLTF('/shirt_baked.glb');

    // Load texture for logo and full
    const logoTexture = useTexture(snap.logoDecal);
    logoTexture.anisotropy = 16;
    const fullTexture = useTexture(snap.fullDecal);

    const [rotation, setRotation] = useState([0, 0, 0]);

    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (event) => {
        if (!isDragging) return;

        const { movementX, movementY } = event;
        setRotation((prevRotation) => [
        prevRotation[0] + movementY * 0.01,
        prevRotation[1] + movementX * 0.01,
        prevRotation[2],
        ]);
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging]);

    useFrame((state, delta) => {
        easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
        meshRef.current.rotation.set(...rotation);
    })

    const stateString = JSON.stringify(snap);
    //useFrame runs on every frame, updating the color of the shirt's material (materials.lambert1) to smoothly transition to the color defined in the state (snap.color).

  return (
    <group
        key={stateString}
    >
        <mesh
            ref={meshRef}
            castShadow
            geometry={nodes.T_Shirt_male.geometry}
            material={materials.lambert1}
            material-roughness = {1}
            dispose={null}
        >
        {snap.isFullTexture && (
            <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
            />
        )}
        {snap.isLogoTexture && (
            <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            // map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
            />
        )}
        </mesh>
    </group>
  )
}

export default Shirt
