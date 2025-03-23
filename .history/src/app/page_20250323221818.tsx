'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, useProgress } from '@react-three/drei';
import BlurText from './components/BlurText';
import Navbar from './components/Navbar';
import SmokeEffect from './components/SmokeEffect';
import StandingTrain from './components/StandingTrain';
import CameraController from './components/CameraController';
import { Features } from './components/Features';
import TextPressure from './components/TextPressure';
import { Carousal } from './components/Carousal';
import Image from 'next/image';
import { Holidays } from './components/BookTicket';
import GradientText from '@/components/ui/gradientText';
import { motion } from 'framer-motion';
import { MousePositionProvider } from './components/MousePositionProvider';
import Link from 'next/link';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="spinner"></div>
        <p className="text-lg font-semibold">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  );
}

const Page: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MousePositionProvider>
      <div className="relative">
        {showLoader ? (
          <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="spinner"></div>
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        ) : (
          <>
            <Canvas gl={{ antialias: false }} camera={{ position: [5, 2, 10] }} className="absolute w-full h-full">
              <Suspense fallback={<Loader />}>
                <CameraController />
                <color attach="background" args={["#fff"]} />
                <SmokeEffect position={[0, 60, -110]} />
                <Environment preset="forest" backgroundIntensity={1} />
                <StandingTrain />
              </Suspense>
            </Canvas>
            <section className="flex flex-col items-center justify-center min-h-screen px-4 md:px-10">
              <Navbar />
              <BlurText text="Journey Smarter, Travel Faster" className="text-3xl md:text-5xl text-center my-6" />
              <div className="flex flex-col md:flex-row gap-4">
                <Link href="/booking">
                  <button className="btn-primary">Book Now</button>
                </Link>
                <Link href="/trackingtrain">
                  <button className="btn-primary">Track Live Train</button>
                </Link>
              </div>
            </section>
            <section className="flex flex-col items-center justify-center min-h-screen px-4 md:px-10">
              <h1>
                <GradientText colors={["#40ffaa", "#4079ff"]} className="text-3xl md:text-5xl text-center">
                  Our Services
                </GradientText>
              </h1>
              <Holidays />
            </section>
            <section className="flex flex-col items-center justify-between min-h-screen px-4 md:px-10">
              <TextPressure text="Why Choose Us" className="text-xl md:text-4xl font-bold" />
              <Features />
            </section>
            <section className="min-h-screen flex flex-col justify-evenly items-center px-4 md:px-10">
              <h1 className="text-2xl md:text-4xl">Testimonials</h1>
              <Carousal />
            </section>
            <motion.footer className="relative min-h-screen flex flex-col md:flex-row justify-evenly items-start px-4 md:px-10">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <Image src="/logo.png" alt="IRCTC" width={50} height={50} />
                  <h1 className="text-3xl md:text-5xl">IRCTC</h1>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <div className="flex flex-col gap-4">
                <ul className="flex flex-wrap gap-4">
                  <li className="border-b-2 md:border-b-0 md:border-r-2 pr-3">About Us</li>
                  <li className="border-b-2 md:border-b-0 md:border-r-2 pr-3">Terms & Conditions</li>
                  <li className="border-b-2 md:border-b-0 md:border-r-2 pr-3">Refund Policy</li>
                  <li>Support</li>
                </ul>
                <h1 className="text-2xl md:text-3xl">Contact</h1>
                <p>Phone: +91 6269017333</p>
                <p>Email: support@irctc.com</p>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-[20vw] md:text-[35vw] absolute -bottom-40 md:-bottom-56"
              >
                IRCTC
              </motion.h1>
            </motion.footer>
          </>
        )}
      </div>
    </MousePositionProvider>
  );
};

export default Page;
