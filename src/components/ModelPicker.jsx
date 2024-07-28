import React, { useState } from 'react';
import { useModel } from './ModelContext';
import { models } from './ModelContext';




const ModelPicker = ({ onSelectModel }) => {
    const { selectedModel, setSelectedModel } = useModel()
    const [isOpen, setIsOpen] = useState(false)
    
    const handleModelChange = (model) => {
        setSelectedModel(model);
        setIsOpen(false)
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen) 
    }
  
    return (
        <div className="modelpicker-container absolute top-0 left-full ml-3 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="grid grid-cols-2 gap-3 p-2 ml-5 mt-5">
              {models.map((model) => (
                <div
                  key={model.name}
                  onClick={() => handleModelChange(model)}
                  className="flex items-center justify-center  cursor-pointer rounded-full"
                >
                  <img
                    src={`/images/${model.name}.png`}
                    alt={model.name}
                    className="w-10 h-10 hover:scale-125"
                  />
                  
                </div>
              ))}
            </div>
          </div>
        
      );
};

export default ModelPicker;
