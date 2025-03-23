"use client"

import { useState } from "react"
import TrainMap from "@/components/train-map"
import TrainStatusPanel from "@/components/train-status-panel"
import TrainSearch from "@/components/train-search"

// Mock train data - in a real app, this would come from an API
const mockTrainData = {
    "12301": {
        name: "Howrah-New Delhi Rajdhani Express",
        number: "12301",
        status: "On Time",
        currentStation: "Kanpur Central",
        nextStation: "New Delhi",
        delay: 0,
        route: [
            {
                name: "Howrah Junction",
                code: "HWH",
                status: "departed",
                scheduledDeparture: "16:10",
                actualDeparture: "16:10",
            },
            {
                name: "Asansol Junction",
                code: "ASN",
                status: "departed",
                scheduledArrival: "18:01",
                actualArrival: "18:01",
                scheduledDeparture: "18:03",
                actualDeparture: "18:03",
            },
            {
                name: "Dhanbad Junction",
                code: "DHN",
                status: "departed",
                scheduledArrival: "18:55",
                actualArrival: "18:55",
                scheduledDeparture: "18:57",
                actualDeparture: "18:57",
            },
            {
                name: "Gaya Junction",
                code: "GAYA",
                status: "departed",
                scheduledArrival: "20:23",
                actualArrival: "20:23",
                scheduledDeparture: "20:25",
                actualDeparture: "20:25",
            },
            {
                name: "Dehri On Sone",
                code: "DOS",
                status: "departed",
                scheduledArrival: "21:10",
                actualArrival: "21:10",
                scheduledDeparture: "21:12",
                actualDeparture: "21:12",
            },
            {
                name: "Mughalsarai Junction",
                code: "MGS",
                status: "departed",
                scheduledArrival: "22:05",
                actualArrival: "22:05",
                scheduledDeparture: "22:15",
                actualDeparture: "22:15",
            },
            {
                name: "Allahabad Junction",
                code: "ALD",
                status: "departed",
                scheduledArrival: "23:30",
                actualArrival: "23:30",
                scheduledDeparture: "23:35",
                actualDeparture: "23:35",
            },
            {
                name: "Kanpur Central",
                code: "CNB",
                status: "departed",
                scheduledArrival: "01:30",
                actualArrival: "01:30",
                scheduledDeparture: "01:35",
                actualDeparture: "01:35",
            },
            { name: "New Delhi", code: "NDLS", status: "upcoming", scheduledArrival: "04:55", actualArrival: "04:55" },
        ],
        progress: 85, // percentage of journey completed
        coordinates: [
            { lat: 22.5986, lng: 88.3696 }, // Howrah
            { lat: 23.6739, lng: 86.9661 }, // Asansol
            { lat: 23.7957, lng: 86.4304 }, // Dhanbad
            { lat: 24.7955, lng: 84.9994 }, // Gaya
            { lat: 24.9168, lng: 84.0432 }, // Dehri On Sone
            { lat: 25.2815, lng: 83.1139 }, // Mughalsarai
            { lat: 25.4358, lng: 81.8463 }, // Allahabad
            { lat: 26.4499, lng: 80.3319 }, // Kanpur
            { lat: 28.6139, lng: 77.209 }, // New Delhi
        ],
    },
    "12302": {
        name: "New Delhi-Howrah Rajdhani Express",
        number: "12302",
        status: "Delayed",
        currentStation: "Gaya Junction",
        nextStation: "Dhanbad Junction",
        delay: 25,
        route: [
            { name: "New Delhi", code: "NDLS", status: "departed", scheduledDeparture: "16:10", actualDeparture: "16:10" },
            {
                name: "Kanpur Central",
                code: "CNB",
                status: "departed",
                scheduledArrival: "20:20",
                actualArrival: "20:20",
                scheduledDeparture: "20:25",
                actualDeparture: "20:25",
            },
            {
                name: "Allahabad Junction",
                code: "ALD",
                status: "departed",
                scheduledArrival: "22:30",
                actualArrival: "22:45",
                scheduledDeparture: "22:35",
                actualDeparture: "22:50",
            },
            {
                name: "Mughalsarai Junction",
                code: "MGS",
                status: "departed",
                scheduledArrival: "23:50",
                actualArrival: "00:05",
                scheduledDeparture: "00:00",
                actualDeparture: "00:15",
            },
            {
                name: "Dehri On Sone",
                code: "DOS",
                status: "departed",
                scheduledArrival: "00:55",
                actualArrival: "01:10",
                scheduledDeparture: "00:57",
                actualDeparture: "01:12",
            },
            {
                name: "Gaya Junction",
                code: "GAYA",
                status: "current",
                scheduledArrival: "01:43",
                actualArrival: "02:08",
                scheduledDeparture: "01:45",
                actualDeparture: "02:10",
            },
            {
                name: "Dhanbad Junction",
                code: "DHN",
                status: "upcoming",
                scheduledArrival: "03:25",
                actualArrival: "03:50",
                scheduledDeparture: "03:27",
                actualDeparture: "03:52",
            },
            {
                name: "Asansol Junction",
                code: "ASN",
                status: "upcoming",
                scheduledArrival: "04:25",
                actualArrival: "04:50",
                scheduledDeparture: "04:27",
                actualDeparture: "04:52",
            },
            { name: "Howrah Junction", code: "HWH", status: "upcoming", scheduledArrival: "06:55", actualArrival: "07:20" },
        ],
        progress: 55, // percentage of journey completed
        coordinates: [
            { lat: 28.6139, lng: 77.209 }, // New Delhi
            { lat: 26.4499, lng: 80.3319 }, // Kanpur
            { lat: 25.4358, lng: 81.8463 }, // Allahabad
            { lat: 25.2815, lng: 83.1139 }, // Mughalsarai
            { lat: 24.9168, lng: 84.0432 }, // Dehri On Sone
            { lat: 24.7955, lng: 84.9994 }, // Gaya
            { lat: 23.7957, lng: 86.4304 }, // Dhanbad
            { lat: 23.6739, lng: 86.9661 }, // Asansol
            { lat: 22.5986, lng: 88.3696 }, // Howrah
        ],
    },
    "12951": {
        name: "Mumbai Central - New Delhi Rajdhani Express",
        number: "12951",
        status: "Delayed",
        currentStation: "Kota Junction",
        nextStation: "Sawai Madhopur",
        delay: 15,
        route: [
            {
                name: "Mumbai Central",
                code: "MMCT",
                status: "departed",
                scheduledDeparture: "16:35",
                actualDeparture: "16:35",
            },
            {
                name: "Borivali",
                code: "BVI",
                status: "departed",
                scheduledArrival: "17:13",
                actualArrival: "17:13",
                scheduledDeparture: "17:15",
                actualDeparture: "17:15",
            },
            {
                name: "Surat",
                code: "ST",
                status: "departed",
                scheduledArrival: "19:14",
                actualArrival: "19:14",
                scheduledDeparture: "19:16",
                actualDeparture: "19:16",
            },
            {
                name: "Vadodara Junction",
                code: "BRC",
                status: "departed",
                scheduledArrival: "20:55",
                actualArrival: "20:55",
                scheduledDeparture: "21:00",
                actualDeparture: "21:00",
            },
            {
                name: "Ratlam Junction",
                code: "RTM",
                status: "departed",
                scheduledArrival: "00:15",
                actualArrival: "00:25",
                scheduledDeparture: "00:20",
                actualDeparture: "00:30",
            },
            {
                name: "Kota Junction",
                code: "KOTA",
                status: "current",
                scheduledArrival: "03:00",
                actualArrival: "03:15",
                scheduledDeparture: "03:05",
                actualDeparture: "03:20",
            },
            {
                name: "Sawai Madhopur",
                code: "SWM",
                status: "upcoming",
                scheduledArrival: "04:32",
                actualArrival: "04:47",
                scheduledDeparture: "04:34",
                actualDeparture: "04:49",
            },
            {
                name: "Mathura Junction",
                code: "MTJ",
                status: "upcoming",
                scheduledArrival: "06:25",
                actualArrival: "06:40",
                scheduledDeparture: "06:27",
                actualDeparture: "06:42",
            },
            { name: "New Delhi", code: "NDLS", status: "upcoming", scheduledArrival: "08:35", actualArrival: "08:50" },
        ],
        progress: 65, // percentage of journey completed
        coordinates: [
            { lat: 18.9712, lng: 72.819 }, // Mumbai Central
            { lat: 19.2312, lng: 72.8553 }, // Borivali
            { lat: 21.1702, lng: 72.8311 }, // Surat
            { lat: 22.3072, lng: 73.1812 }, // Vadodara
            { lat: 23.3315, lng: 75.0367 }, // Ratlam
            { lat: 25.2138, lng: 75.8648 }, // Kota
            { lat: 26.0207, lng: 76.3534 }, // Sawai Madhopur
            { lat: 27.4924, lng: 77.6737 }, // Mathura
            { lat: 28.6139, lng: 77.209 }, // New Delhi
        ],
    },
}

export default function TrackYourTrainPage() {
    const [selectedTrain, setSelectedTrain] = useState<any>(null)
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleTrainSearch = (trainNumber: string | number) => {
        setSearchQuery(String(trainNumber))
        setSelectedTrain(mockTrainData[trainNumber])
    }

    return (
        <div className="relative w-full p h-screen bg-slate-900">
            {/* 3D Map */}
            <TrainMap selectedTrain={selectedTrain} />

            {/* UI Overlay */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="container mx-auto h-full flex flex-col">
                    {/* Header */}
                    <div className="pt-8 pb-4 pointer-events-auto">
                        <h1 className="text-3xl font-bold text-white">Track Your Train</h1>
                        <p className="text-slate-300">Live train movement across India's railway network</p>
                    </div>

                    {/* Search Panel */}
                    <div className="w-full max-w-md pointer-events-auto">
                        <TrainSearch onSearch={handleTrainSearch} />
                    </div>

                    {/* Spacer */}
                    <div className="flex-grow"></div>

                    {/* Status Panel */}
                    {selectedTrain && (
                        <div className="mb-8 pointer-events-auto">
                            <TrainStatusPanel train={selectedTrain} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

