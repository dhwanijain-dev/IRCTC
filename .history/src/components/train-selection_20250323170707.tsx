"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, PresentationControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const trains = [
  { id: 1, name: "Express 101", type: "Superfast", duration: "6h 30m", price: 1200 },
  { id: 2, name: "Rajdhani", type: "Premium", duration: "5h 15m", price: 1800 },
  { id: 3, name: "Shatabdi", type: "Executive", duration: "4h 45m", price: 2200 },
]

function Train({ trainId, ...props }) {
  // In a real app, you would load different models based on trainId
  return (
    <group {...props}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5, 1, 1.5]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[4.5, 0.5, 1.4]} />
        <meshStandardMaterial color="#60a5fa" />
      </mesh>
      <mesh position={[-2.2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-1.2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[1.2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[2.2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  )
}

export default function TrainSelection({ onSelectTrain }) {
  const [currentTrainIndex, setCurrentTrainIndex] = useState(0)
  const currentTrain = trains[currentTrainIndex]

  const nextTrain = () => {
    setCurrentTrainIndex((prev) => (prev + 1) % trains.length)
  }

  const prevTrain = () => {
    setCurrentTrainIndex((prev) => (prev - 1 + trains.length) % trains.length)
  }

  useEffect(() => {
    onSelectTrain(currentTrain)
  }, [currentTrainIndex, onSelectTrain])

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
          >
            <Train trainId={currentTrain.id} position={[0, -1, 0]} rotation={[0, Math.PI / 4, 0]} />
          </PresentationControls>
          <Environment preset="city" />
        </Canvas>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
          <Button variant="outline" size="icon" onClick={prevTrain}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextTrain}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-card p-4 rounded-b-lg">
        <h2 className="text-xl font-bold">{currentTrain.name}</h2>
        <div className="flex justify-between mt-2">
          <div>
            <p className="text-sm text-muted-foreground">Type</p>
            <p>{currentTrain.type}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Duration</p>
            <p>{currentTrain.duration}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p>₹{currentTrain.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

