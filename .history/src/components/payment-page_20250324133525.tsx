"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { animated, useSpring } from "@react-spring/three"
import { Environment, PresentationControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Smartphone, Landmark } from "lucide-react"

interface Train {
  id: number
  name: string
  type: string
  duration: string
  price: number
  model: string
}

interface Seat {
  id: string
  price: number
}

interface BookingDetails {
  from: string
  to: string
  date: string
  passengers: number
  class: string
}

interface PaymentPageProps {
  selectedTrain: Train | null
  selectedSeats: Seat[]
  bookingDetails: BookingDetails
}

interface CardDetails {
  number: string
  name: string
  expiry: string
  cvv: string
}

interface CreditCardModelProps {
  isFlipped: boolean
  cardDetails: CardDetails
}

function CreditCardModel({ isFlipped, cardDetails }: CreditCardModelProps) {
  const { rotation } = useSpring({
    rotation: isFlipped ? [0, Math.PI, 0] : [0, 0, 0],
    config: { mass: 5, tension: 500, friction: 80 },
  })

  return (
    <animated.group rotation={rotation}>
      {/* Front of card */}
      <group position={[0, 0, 0.01]}>
        <mesh>
          <planeGeometry args={[3.4, 2.1]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>

        {/* Card chip */}
        <mesh position={[-1, 0.5, 0.01]}>
export default function PaymentPage({ selectedTrain, selectedSeats, bookingDetails }: PaymentPageProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })

  const calculateTotalPrice = () => {
    if (!selectedTrain || !selectedSeats.length) return 0
    return selectedSeats.reduce((total, seat) => total + seat.price, 0)
  }

  const handleFocusCVV = () => {
    setIsFlipped(true)
  }

  const handleBlurCVV = () => {
    setIsFlipped(false)
  }

  if (!selectedTrain || !selectedSeats.length) {
    return <div className="p-8 text-center">Please select a train and seats first</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="h-[500px] bg-muted rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            snap={false}
          >
            <CreditCardModel isFlipped={isFlipped} cardDetails={cardDetails} />
          </PresentationControls>
          <Environment preset="city" />
        </Canvas>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <CardDescription>Complete your booking by making a payment</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="card">
                <CreditCard className="h-4 w-4 mr-2" />
                Card
              </TabsTrigger>
              <TabsTrigger value="upi">
                <Smartphone className="h-4 w-4 mr-2" />
                UPI
              </TabsTrigger>
              <TabsTrigger value="netbanking">
                <Landmark className="h-4 w-4 mr-2" />
                Net Banking
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails((prev) => ({ ...prev, number: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-name">Name on Card</Label>
                <Input
                  id="card-name"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails((prev) => ({ ...prev, expiry: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    onFocus={handleFocusCVV}
                    onBlur={handleBlurCVV}
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails((prev) => ({ ...prev, cvv: e.target.value }))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upi" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="upi-id">UPI ID</Label>
                <Input id="upi-id" placeholder="name@upi" />
              </div>
            </TabsContent>

            <TabsContent value="netbanking" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bank">Select Bank</Label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select your bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                </select>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 border-t pt-4">
            <h3 className="font-medium mb-2">Booking Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Train:</span>
                <span>{selectedTrain?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Journey:</span>
                <span>
                  {bookingDetails.from} to {bookingDetails.to}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{bookingDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Seats:</span>
                <span>{selectedSeats.map((seat) => seat.id).join(", ")}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Amount:</span>
                <span>₹{calculateTotalPrice()}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Pay ₹{calculateTotalPrice()}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}