import React, { createContext, useContext, useState } from 'react';

const ModelContext = createContext();

export const models = [
    { name: 'T-Shirt', path: '/shirt_baked.glb', geometry: 'T_Shirt_male', material: 'lambert1', x: 1, y: 1, z: 1, position: [0, 0, 0]},
    { name: 'One Shoulder Dress', path: '/one-shoulder_dress_formal_model.glb', geometry: 'one_shoulder_formal_dressPattern2D_3531541_lambert1_0003', material: 'lambert1', x: 0.00063135403218180, y: 0.00063135403218180, z: 0.00063135403218180, position: [0, 0, 0]},
    { name: 'Jeans', path: '/jeans.glb', geometry: 'defaultMaterial', material:'Jeans.001', x: 0.4313540321818045, y: 0.4313540321818045, z: 0.4313540321818045, position: [0, 0, 0] },
    { name: 'Hoodie', path: '/hoodie.glb', geometry: 'Object_4', material: 'WORLD_ZIP_HOODIE', x: 0.0006313540321818045, y: 0.0006313540321818045, z: 0.0006313540321818045, position: [0, 0, 0]},
  ];


export const useModel = () => {
  return useContext(ModelContext);
};

export const ModelProvider = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState(models[0]);

  return (
    <ModelContext.Provider value={{ selectedModel, setSelectedModel }}>
      {children}
    </ModelContext.Provider>
  );
};
