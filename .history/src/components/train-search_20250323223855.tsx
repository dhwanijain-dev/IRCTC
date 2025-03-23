"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Train } from "lucide-react"

// Sample train numbers for quick selection
const popularTrains = [
  { number: "12301", name: "Howrah-New Delhi Rajdhani" },
  { number: "12302", name: "New Delhi-Howrah Rajdhani" },
  { number: "12951", name: "Mumbai-Delhi Rajdhani" },
]

interface TrainSearchProps {
  onSearch: (trainNumber: string) => void
}

export default function TrainSearch({ onSearch }: TrainSearchProps) {
  const [trainNumber, setTrainNumber] = useState<string>("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (trainNumber.trim()) {
      onSearch(trainNumber.trim())
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-slate-700 rounded-3xl">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2 rounded-lg">
              <Input
                  type="text"
                  placeholder="Enter Train Number"
                  value={trainNumber}
                  onChange={(e) => setTrainNumber(e.target.value)}
                  className="bg-white/20 border-slate-600 text-white rounded-lg placeholder:text-slate-400"
              />
            <Button type="submit" className="text-white" variant="default">
                Track
                <Search className="h-4 w-4 mr-2 text-white" />
              </Button>
            </div>

            <div>
              <p className="text-sm text-slate-300 mb-2">Popular Trains:</p>
              <div className="flex flex-wrap gap-2">
                {popularTrains.map((train) => (
                    <Button
                        key={train.number}
                        variant="outline"
                        size="sm"
                        className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                        onClick={() => {
                          setTrainNumber(train.number)
                          onSearch(train.number)
                        }}
                    >
                      <Train className="h-3 w-3 mr-1" />
                      {train.number}
                    </Button>
                ))}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
  )
}