import React, { useRef, useEffect, useState } from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '../store'
import * as THREE from 'three'
import { useModel } from '../components/ModelContext'

const Shirt = () => {
  const { selectedModel } = useModel()

  const meshRef = useRef()
  const snap = useSnapshot(state)
  const {nodes, materials} = useGLTF(selectedModel.path)
  const [loading, setLoading] = useState(true);

  const logoTexture = useTexture(snap.logoDecal)
  const fullTexture = useTexture(snap.fullDecal)
  
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [isNewModel, setIsNewModel] = useState(true);
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
    
    setRotation((prevRotation) => {
      if (isNewModel) {
        setIsNewModel(false);
        return [movementY * 0.01, movementX * 0.01, 0];
      }
      return [
        prevRotation[0] ,
        prevRotation[1] + movementX * 0.01,
        prevRotation[2],
      ];
    });
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

  
  
  useEffect(() => {
    if (meshRef.current) {
      
      meshRef.current.position.set(selectedModel.position[0], selectedModel.position[1], selectedModel.position[2])
      
      state.isFullTexture = false
    }
  }, [selectedModel, nodes, materials, snap.color]);

  useFrame((state, delta) => {
    easing.dampC(materials[selectedModel.material].color, snap.color, 0.25, delta)
    meshRef.current.rotation.set(...rotation);
  })
  const stateString = JSON.stringify(snap)
  return (
    <group key={stateString}>
      
      <mesh 
        ref= {meshRef} 
        castShadow 
        scale={[selectedModel.x, selectedModel.y, selectedModel.z]}
        position={[0, 0, 0]}
        geometry={nodes[selectedModel.geometry].geometry}
        material={selectedModel.material ? materials[selectedModel.material] : materials['']}
        material-roughness={1} 
      >
        
        {snap.isFullTexture && (
          // <Decal position={selectedModel.position} rotation={[0, 0, 0]} map={fullTexture} scale={1} dispose={false} />
          <meshStandardMaterial map={fullTexture} polygonOffset polygonOffsetFactor={-1} />
        )}

        {snap.isLogoTexture && (
          <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={logoTexture}  />
        )} 

      </mesh>
      
    </group>
    
  )
}

export default Shirt
