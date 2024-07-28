import React from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, Center, OrbitControls } from "@react-three/drei"
import Shirt from './Shirt'
import Backdrop from "./Backdrop"
import CameraRig from "./CameraRig"
import { useModel } from "../components/ModelContext"

const CanvasModel = () => {

  const {selectedModel} = useModel()
  return (
    <Canvas shadows camera={{position: [0, 0, 0], fov: 25}} gl={{preserveDrawingBuffer: true}} className="w-full max-w-full h-full transition-all ease-in">
      <ambientLight intensity={1} />

      <Environment preset="city" />
      <directionalLight
        position={[-15, 10, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight
        position={[15, 10, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <CameraRig>
        <Backdrop />
        <Center cacheKey={selectedModel.geometry}>
            <Shirt />
        </Center>
      </CameraRig>
      
    </Canvas>
  )
}

export default CanvasModel
