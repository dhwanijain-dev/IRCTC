'use client'
import React from 'react'
import BlurText from './components/BlurText'
import { Canvas } from '@react-three/fiber'
import Navbar from './components/Navbar'
import SmokeEffect from './components/SmokeEffect'
import { Environment } from '@react-three/drei'
import StandingTrain from './components/StandingTrain'
import { MousePositionProvider } from './components/MousePositionProvider'
import CameraController from './components/CameraController'
import { Features } from './components/Features'
import TextPressure from './components/TextPressure'
import { Carousal } from './components/Carousal'
import Image from 'next/image'
import { PinCard } from './components/BookTicket'

const Page = () => {
    return (
        <MousePositionProvider>
            <div className="relative">
                <Canvas gl={{ antialias: false }} camera={{ position: [5, 2, 10] }} style={{ height: '100vh', width: '100vw' }}>
                    <CameraController />
                    <color attach="background" args={['#fff']} />
                    <SmokeEffect position={[0, 60, -110]} />
                    <Environment preset="forest" backgroundIntensity={1} />
                    <StandingTrain />
                </Canvas>
                <section className="flex items-start justify-center h-screen w-full absolute top-0 left-0">
                    <Navbar />
                    <BlurText
                        text="Journey Smarter, Travel Faster"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-6xl absolute top-52"
                    />
                    <div className="flex gap-4 absolute top-80">
                        <button className="group relative rounded-2xl h-12 overflow-hidden overflow-x-hidden  bg-neutral-950 px-8 py-2 text-neutral-50">
                            <span className="relative z-10">Book Now</span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                                <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-blue-500 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                            </span>
                        </button>

                        <button className="group relative rounded-2xl h-12 overflow-hidden overflow-x-hidden  bg-neutral-950 px-8 py-2 text-neutral-50">
                            <span className="relative z-10">Track Live Train</span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                                <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-blue-500 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                            </span>
                        </button>
                    </div>
                </section>
                <section className="flex items-center justify-center h-screen w-full">
                    <PinCard />
                </section>
                <section className="flex flex-col items-center justify-between h-screen w-full p-10">
                    <TextPressure
                        text="Why&nbsp;Choose&nbsp;Us"
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={true}
                        textColor="#000"
                        strokeColor="#ff0000"
                        minFontSize={18}
                    />
                    <Features />
                </section>
                <section className='h-screen w-full flex flex-col justify-evenly items-center'>
                    <h1 className="text-5xl">Testimonials</h1>
                    <Carousal />
                </section>
            </div>
        </MousePositionProvider>
    );
};

export default Page;