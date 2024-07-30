import React, {useState, useEffect} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import { useSnapshot } from 'valtio'

import config from '../config/config'
import state from '../store'
import {download, stylishShirt} from '../assets'
import {EditorTabs, FilterTabs, DecalTypes} from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import { ModelPicker,ColorPicker, CustomButton, Tab, FilePicker } from '../components'
import { useModel } from '../components/ModelContext'

const Customizer = () => {
  const defaultModel = {name: 'Shirt', path: '/shirt_baked.glb', geometry: 'T_Shirt_male', material: 'lambert1'}

  const { selectedModel } = useModel()

  const snap = useSnapshot(state)
  const [isActive, setIsActive] = useState(true)
  const [ activeEditorTab, setActiveEditorTab] = useState("")
  const [ activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true, stylishShirt: false
  })
  const generateTabContent = () => {
    switch(activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker setActiveFilterTab={setActiveFilterTab}/>
      case "modelpicker":
        return <ModelPicker 
          onSelectModel={selectedModel}/>
      default:
        return null
    }
  }



  const handleActiveFilterTab = (tabName) => {
    switch(tabName) {
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName]
        break;
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
    }

    
    setActiveFilterTab((prevState) => {
      return{
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  useEffect(() => {
    setActiveFilterTab("")
  }, [selectedModel])

  return (
    <div>
      <AnimatePresence>
        {!snap.intro && (
          <>
            <motion.div key='custom' className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
              <div className='flex items-center min-h-screen'>
                <div className='editortabs-container tabs'>
                  {EditorTabs.map((tab) => (
                    <Tab key = {tab.name} tab={tab} handleClick={() => {setIsActive(!isActive); isActive ? setActiveEditorTab(tab.name) : setActiveEditorTab("")}} />
                  ))}
                  {generateTabContent()}
                </div>
              </div> 
            </motion.div>

            <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
              <CustomButton type={'filled'} title={'Go Back'} handleClick={() => state.intro = true} customStyles={'w-fit px-4 px-2.5 font-bold text-sm'} />
            </motion.div>

            <motion.div className='filtertabs-container' {...slideAnimation('up')}>
              {FilterTabs.map((tab) => (
                <Tab key = {tab.name} tab={tab} isFilterTab isAciveTab={activeFilterTab[tab.name]} handleClick={() => handleActiveFilterTab(tab.name)} />
              ))}
            </motion.div>
          </> 
        )}
      </AnimatePresence>
    </div>
  )
}

export default Customizer
