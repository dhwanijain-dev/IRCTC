"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, AlertTriangle, CheckCircle } from "lucide-react"

interface Station {
  name: string
  code: string
  status: string
  actualArrival: string
  scheduledArrival: string
  actualDeparture?: string
}

interface Train {
  name: string
  number: string
  delay: number
  progress: number
  currentStation: string
  nextStation: string
  route: Station[]
}

interface TrainStatusPanelProps {
  train: Train | null
}

export default function TrainStatusPanel({ train }: TrainStatusPanelProps) {
  if (!train) return null

  const isDelayed = train.delay > 0

  // Find the current station in the route
  const currentStationIndex = train.route.findIndex((station) => station.status === "current")

  // If no current station is found, find the last departed station
  const lastDepartedIndex =
      currentStationIndex === -1
          ? train.route.reduce((lastIndex, station, index) => (station.status === "departed" ? index : lastIndex), -1)
          : currentStationIndex

  // Get upcoming stations (max 3)
  const upcomingStations = train.route.filter((station) => station.status === "upcoming").slice(0, 3)

  return (
      <Card className="bg-white/10 backdrop-blur-md border-slate-700 text-white w-full max-w-2xl">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold">{train.name}</CardTitle>
              <p className="text-slate-300">#{train.number}</p>
            </div>
            <Badge
                className={
                  isDelayed ? "bg-red-500/80 hover:bg-red-500 text-white" : "bg-green-500/80 hover:bg-green-500 text-white"
                }
            >
              {isDelayed ? (
                  <>
                    <AlertTriangle className="h-3 w-3 mr-1" /> Delayed by {train.delay} min
                  </>
              ) : (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" /> On Time
                  </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Progress bar */}
          <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${train.progress}%` }}></div>
          </div>

          {/* Current location */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <MapPin className="h-4 w-4 mr-2 text-blue-400" />
              <span className="font-medium">Current Location</span>
            </div>
            <div className="ml-6 p-2 bg-slate-800/50 rounded-md">
              <p className="font-medium">{train.currentStation}</p>
              <div className="flex items-center text-sm text-slate-300">
                <Clock className="h-3 w-3 mr-1" />
                <span>
                {currentStationIndex !== -1
                    ? `Departing at ${train.route[currentStationIndex].actualDeparture}`
                    : `Departed from ${train.route[lastDepartedIndex].name}`}
              </span>
              </div>
              <p className="text-sm text-slate-300">Next: {train.nextStation}</p>
            </div>
          </div>

          {/* Upcoming stations */}
          <div>
            <div className="flex items-center mb-2">
              <Clock className="h-4 w-4 mr-2 text-blue-400" />
              <span className="font-medium">Upcoming Stations</span>
            </div>
            <div className="space-y-2">
              {upcomingStations.map((station) => (
                  <div key={station.code} className="ml-6 flex items-center justify-between p-2 bg-slate-800/50 rounded-md">
                    <div>
                      <p className="font-medium">{station.name}</p>
                      <p className="text-xs text-slate-400">{station.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{station.actualArrival}</p>
                      <p className={`text-xs ${isDelayed ? "text-red-400" : "text-green-400"}`}>
                        {isDelayed ? `Delayed (Sch: ${station.scheduledArrival})` : "On Time"}
                      </p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
  )
}