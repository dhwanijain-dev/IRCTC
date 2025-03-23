"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Seat status: 'available', 'selected', 'booked'
const initialSeats = Array(40)
  .fill()
  .map((_, i) => ({
    id: i + 1,
    status: Math.random() > 0.3 ? "available" : "booked",
    type: i < 24 ? "lower" : i < 32 ? "middle" : "upper",
    price: i < 24 ? 100 : i < 32 ? 80 : 60,
  }))

function CoachModel({ seats, onSeatClick }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Coach body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[12, 2.5, 3]} />
        <meshStandardMaterial color="#e5e7eb" transparent opacity={0.7} />
      </mesh>

      {/* Seats */}
      {seats.map((seat, index) => {
        // Calculate position in a grid layout
        const row = Math.floor(index / 8)
        const col = index % 8
        const side = col < 4 ? -1 : 1
        const tier = index % 24 < 8 ? 0 : index % 24 < 16 ? 1 : 2

        const x = (col % 4) * 0.8 - 1.2
        const z = row * 0.7 - 4
        const y = tier * 0.7 - 0.5

        return (
          <mesh
            key={seat.id}
            position={[x * side, y, z]}
            onClick={() => seat.status !== "booked" && onSeatClick(seat.id)}
          >
            <boxGeometry args={[0.7, 0.2, 0.5]} />
            <meshStandardMaterial
              color={seat.status === "booked" ? "#ef4444" : seat.status === "selected" ? "#22c55e" : "#3b82f6"}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default function SeatSelection({ selectedTrain, selectedSeats, setSelectedSeats, bookingDetails }) {
  const [seats, setSeats] = useState(initialSeats)

  const handleSeatClick = (seatId) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === seatId ? { ...seat, status: seat.status === "selected" ? "available" : "selected" } : seat,
      ),
    )
  }

  useEffect(() => {
    const newSelectedSeats = seats
      .filter((seat) => seat.status === "selected")
      .map((seat) => ({ id: seat.id, type: seat.type, price: seat.price }))

    setSelectedSeats(newSelectedSeats)
  }, [seats, setSelectedSeats])

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0)
  }

  if (!selectedTrain) {
    return <div className="p-8 text-center">Please select a train first</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="h-[500px] bg-muted rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <CoachModel seats={seats} onSeatClick={handleSeatClick} />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={5} maxDistance={20} />
          <Environment preset="city" />
        </Canvas>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Your Seats</CardTitle>
          <CardDescription>Click on the 3D model to select your preferred seats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <span>Booked</span>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Selected Seats ({selectedSeats.length})</h3>
              {selectedSeats.length > 0 ? (
                <ul className="space-y-2">
                  {selectedSeats.map((seat) => (
                    <li key={seat.id} className="flex justify-between">
                      <span>
                        Seat {seat.id} ({seat.type})
                      </span>
                      <span>₹{seat.price}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No seats selected</p>
              )}
            </div>

            <div className="flex justify-between font-medium">
              <span>Total Price:</span>
              <span>₹{calculateTotalPrice()}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={selectedSeats.length === 0}>
            Continue to Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

