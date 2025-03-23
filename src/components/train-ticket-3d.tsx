"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, useTexture, PerspectiveCamera, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

function TrainTicket({ isFlipped, setIsFlipped }: { isFlipped: boolean; setIsFlipped: (value: boolean) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Texture for the ticket
  const texture = useTexture("/placeholder.svg?height=512&width=1024")
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping

  // Animation for rotation
  useFrame((state) => {
    if (!meshRef.current) return

    // Base rotation
    const baseRotationSpeed = 0.003
    const hoverBoost = hovered ? 2 : 1

    // Flip animation
    const targetRotationY = isFlipped ? Math.PI : 0
    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.1

    // Continuous rotation on Y axis when not flipped
    if (!isFlipped) {
      meshRef.current.rotation.y += baseRotationSpeed * hoverBoost
    }

    // Gentle floating animation
    meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      castShadow
      receiveShadow
    >
      {/* Ticket shape */}
      <boxGeometry args={[5, 3, 0.1, 10, 0.2]} />

      {/* Front material */}
      <meshStandardMaterial
        map={texture}
        roughness={0.3}
        metalness={0.7}
        color={hovered ? "#8884ff" : "#6366f1"}
        side={THREE.FrontSide}
      />

      {/* Back material */}
      <meshStandardMaterial
        color={hovered ? "#8884ff" : "#6366f1"}
        roughness={0.3}
        metalness={0.7}
        side={THREE.BackSide}
      />

      {/* Front side text */}
      <group position={[0, 0, 0.06]} visible={!isFlipped}>
        <Text
          position={[0, 1, 0]}
          fontSize={0.4}
          color="#ffffff"
          font="/fonts/Inter-Bold.woff"
          anchorX="center"
          anchorY="middle"
        >
          IRCTC EXPRESS
        </Text>

        <Text
          position={[0, 0.4, 0]}
          fontSize={0.2}
          color="#ffffff"
          font="/fonts/Inter-Regular.woff"
          anchorX="center"
          anchorY="middle"
        >
          Delhi to Mumbai
        </Text>

        <Text
          position={[-1.8, -0.2, 0]}
          fontSize={0.15}
          color="#ffffff"
          font="/fonts/Inter-Regular.woff"
          anchorX="left"
          anchorY="middle"
        >
          Date: 23 Mar 2025
        </Text>

        <Text
          position={[1.8, -0.2, 0]}
          fontSize={0.15}
          color="#ffffff"
          font="/fonts/Inter-Regular.woff"
          anchorX="right"
          anchorY="middle"
        >
          Seat: A12
        </Text>

        <Text
          position={[0, -0.8, 0]}
          fontSize={0.18}
          color="#ffffff"
          font="/fonts/Inter-Bold.woff"
          anchorX="center"
          anchorY="middle"
        >
          PNR: 2589631470
        </Text>
      </group>

      {/* Back side text */}
      <group position={[0, 0, -0.06]} rotation={[0, Math.PI, 0]} visible={isFlipped}>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.3}
          color="#ffffff"
          font="/fonts/Inter-Bold.woff"
          anchorX="center"
          anchorY="middle"
        >
          Secure Travel with IRCTC
        </Text>

        <Text
          position={[0, -0.2, 0]}
          fontSize={0.15}
          color="#ffffff"
          font="/fonts/Inter-Regular.woff"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          maxWidth={4}
        >
          Your journey is protected with end-to-end encryption and secure payment methods.
        </Text>
      </group>
    </mesh>
  )
}

export default function TrainTicket3D() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="h-full w-full cursor-pointer">
      <Canvas shadows>
        <color attach="background" args={["#161F25"]} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Main ticket */}
        <TrainTicket isFlipped={isFlipped} setIsFlipped={setIsFlipped} />

        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.5} />
      </Canvas>
    </div>
  )
}

