"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Line, useTexture } from "@react-three/drei"
import { Vector3 } from "three"
import { useSpring, animated } from "@react-spring/three"

// Convert lat/lng to 3D coordinates
function latLngToVector3(lat, lng, radius = 10) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)

  return new Vector3(x, y, z)
}

// Train model component
function TrainModel({ position, rotation }) {
  const AnimatedMesh = animated.mesh

  return (
    <AnimatedMesh position={position} rotation={rotation}>
      {/* Train body */}
      <boxGeometry args={[0.4, 0.15, 0.2]} />
      <meshStandardMaterial color="#e11d48" />

      {/* Train roof */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.4, 0.05, 0.18]} />
        <meshStandardMaterial color="#be123c" />
      </mesh>

      {/* Train windows */}
      <mesh position={[0.1, 0.05, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.08, 0.21]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
      <mesh position={[-0.1, 0.05, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.08, 0.21]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
    </AnimatedMesh>
  )
}

// Station marker component
function StationMarker({ position, name, isActive, isUpcoming }) {
  const { camera } = useThree()
  const [visible, setVisible] = useState(false)

  useFrame(() => {
    // Make text always face the camera
    const lookAt = camera.position.clone()
    lookAt.y = position.y
    setVisible(true)
  })

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={isActive ? "#22c55e" : isUpcoming ? "#3b82f6" : "#94a3b8"}
          emissive={isActive ? "#22c55e" : isUpcoming ? "#3b82f6" : "#94a3b8"}
          emissiveIntensity={0.5}
        />
      </mesh>
      {visible && (
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.01}
          outlineColor="#0f172a"
        >
          {name}
        </Text>
      )}
    </group>
  )
}

// Railway track component
function RailwayTrack({ points }) {
  return <Line points={points} color="#94a3b8" lineWidth={1} dashed={false} />
}

// India map component
function IndiaMap({ selectedTrain }) {
  const mapRef = useRef()
  const texture = useTexture("/placeholder.svg?height=1024&width=1024")

  // Animation for train position
  const [trainPosition, setTrainPosition] = useState(new Vector3(0, 0, 0))
  const [trainRotation, setTrainRotation] = useState([0, 0, 0])
  const [trackPoints, setTrackPoints] = useState([])
  const [stationPoints, setStationPoints] = useState([])

  const trainSpring = useSpring({
    position: trainPosition.toArray(),
    rotation: trainRotation,
    config: { tension: 120, friction: 14 },
  })

  useEffect(() => {
    if (selectedTrain) {
      // Convert coordinates to 3D points
      const points = selectedTrain.coordinates.map((coord) => latLngToVector3(coord.lat, coord.lng))

      setTrackPoints(points)
      setStationPoints(points)

      // Calculate current position based on progress
      const progress = selectedTrain.progress / 100
      const totalPoints = points.length
      const exactIndex = progress * (totalPoints - 1)
      const lowerIndex = Math.floor(exactIndex)
      const upperIndex = Math.min(lowerIndex + 1, totalPoints - 1)
      const fraction = exactIndex - lowerIndex

      // Interpolate between points
      if (lowerIndex < totalPoints - 1) {
        const p1 = points[lowerIndex]
        const p2 = points[upperIndex]

        const newPosition = new Vector3().lerpVectors(p1, p2, fraction)
        setTrainPosition(newPosition)

        // Calculate rotation to face direction of travel
        const direction = new Vector3().subVectors(p2, p1).normalize()
        const angle = Math.atan2(direction.x, direction.z)
        setTrainRotation([0, angle, 0])
      } else {
        setTrainPosition(points[totalPoints - 1])
      }
    }
  }, [selectedTrain])

  return (
    <group ref={mapRef}>
      {/* India map outline */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#1e293b" opacity={0.7} transparent />
      </mesh>

      {/* Railway tracks */}
      {trackPoints.length > 0 && <RailwayTrack points={trackPoints} />}

      {/* Station markers */}
      {selectedTrain &&
        stationPoints.map((point, index) => {
          const station = selectedTrain.route[index]
          const isActive = station?.status === "current"
          const isUpcoming = station?.status === "upcoming"

          return (
            <StationMarker
              key={index}
              position={point}
              name={station?.name}
              isActive={isActive}
              isUpcoming={isUpcoming}
            />
          )
        })}

      {/* Animated train */}
      {selectedTrain && <TrainModel position={trainSpring.position} rotation={trainSpring.rotation} />}
    </group>
  )
}

export default function TrainMap({ selectedTrain }) {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 10, 15], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <IndiaMap selectedTrain={selectedTrain} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>
    </div>
  )
}

