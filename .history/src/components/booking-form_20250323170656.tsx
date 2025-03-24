"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function BookingForm({ bookingDetails, setBookingDetails, selectedTrain }) {
  const [date, setDate] = useState(null)

  const handleDateSelect = (date) => {
    setDate(date)
    setBookingDetails((prev) => ({ ...prev, date: date ? format(date, "PPP") : "" }))
  }

  const calculatePrice = () => {
    if (!selectedTrain) return 0
    return selectedTrain.price * bookingDetails.passengers
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Your Journey</CardTitle>
        <CardDescription>Enter your travel details to book your train tickets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="from">From</Label>
          <Input
            id="from"
            placeholder="Departure Station"
            value={bookingDetails.from}
            onChange={(e) => setBookingDetails((prev) => ({ ...prev, from: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="to">To</Label>
          <Input
            id="to"
            placeholder="Arrival Station"
            value={bookingDetails.to}
            onChange={(e) => setBookingDetails((prev) => ({ ...prev, to: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date of Journey</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="passengers">Number of Passengers</Label>
          <Select
            value={bookingDetails.passengers.toString()}
            onValueChange={(value) => setBookingDetails((prev) => ({ ...prev, passengers: Number.parseInt(value) }))}
          >
            <SelectTrigger id="passengers">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="class">Class</Label>
          <Select
            value={bookingDetails.class}
            onValueChange={(value) => setBookingDetails((prev) => ({ ...prev, class: value }))}
          >
            <SelectTrigger id="class">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sleeper">Sleeper</SelectItem>
              <SelectItem value="ac3">AC 3 Tier</SelectItem>
              <SelectItem value="ac2">AC 2 Tier</SelectItem>
              <SelectItem value="ac1">AC 1 Tier</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <div className="w-full flex justify-between mb-4">
          <span className="text-lg font-medium">Total Price:</span>
          <span className="text-lg font-bold">₹{calculatePrice()}</span>
        </div>
        <Button className="w-full">Continue to Seat Selection</Button>
      </CardFooter>
    </Card>
  )
}

