'use client'
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TrainSelection from "@/components/train-selection"
import BookingForm from "@/components/booking-form"
import SeatSelection from "@/components/seat-selection"
import PaymentPage from "@/components/payment-page"
const page = () => {
    const [selectedTrain, setSelectedTrain] = useState(null)
    const [selectedSeats, setSelectedSeats] = useState([])
    const [bookingDetails, setBookingDetails] = useState({
        from: "",
        to: "",
        date: "",
        passengers: 1,
        class: "sleeper",
    })

    return (
        <div className="container mx-auto py-8 px-4">
            <Link
            <h1 className="text-3xl font-bold mb-8 text-center">Train Booking</h1>

            <Tabs defaultValue="select-train" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="select-train">Select Train</TabsTrigger>
                    <TabsTrigger value="select-seats">Select Seats</TabsTrigger>
                    <TabsTrigger value="payment">Payment</TabsTrigger>
                </TabsList>

                <TabsContent value="select-train">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="h-[500px] bg-muted rounded-lg overflow-hidden">
                            <TrainSelection onSelectTrain={setSelectedTrain}/>
                        </div>
                        <div>
                            <BookingForm
                                bookingDetails={bookingDetails}
                                setBookingDetails={setBookingDetails}
                                selectedTrain={selectedTrain}
                            />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="select-seats">
                    <SeatSelection
                        selectedTrain={selectedTrain}
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                        bookingDetails={bookingDetails}
                    />
                </TabsContent>

                <TabsContent value="payment">
                    <PaymentPage selectedTrain={selectedTrain} selectedSeats={selectedSeats}
                                 bookingDetails={bookingDetails}/>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default page
