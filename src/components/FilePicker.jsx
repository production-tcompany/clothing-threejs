
import React, { useState } from 'react';
import state from '../store';

const FilePicker = ({ setActiveFilterTab }) => {
    //const snap = useSnapshot(state)
    const textures= ['ZigZag', 'TieDye', 'Blue_Pattern', 'Denim', 'Floral', 'Texture']
    const handleTextureChange = (texture) => {
      state.fullDecal = `/images/Textures/${texture}.jpg`
      state.isFullTexture = true
      setActiveFilterTab({stylishShirt: true})
      
      
    };

    return (
        <div className="modelpicker-container absolute top-0 left-full w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="grid grid-cols-2 gap-3 p-2 m-3 border-solid border-inherit">
              {textures.map((texture) => (
                <div
                  key={texture}
                  onClick={() => handleTextureChange(texture)}
                  className="flex items-center hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={`/images/Textures/${texture}.jpg`}
                    alt={texture}
                    className="w-10 h-10"
                  />
                  
                </div>
              ))}
            </div>
          </div>
        
      );
};

export default FilePicker;
