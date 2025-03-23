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
      <div className="loader">
        <div className="spinner"></div>
        <p>{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  );
}

const Page: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <MousePositionProvider>
      <div className="relative">
        {showLoader ? (
          <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="loader">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          </div>
        ) : (
          <>
            <Canvas gl={{ antialias: false }} camera={{ position: [5, 2, 10] }} style={{ height: '100vh', width: '100vw' }}>
              <Suspense fallback={<Loader />}>
                <CameraController />
                <color attach="background" args={['#fff']} />
                <SmokeEffect position={[0, 60, -110]} />
                <Environment preset="forest" backgroundIntensity={1} />
                <StandingTrain />
              </Suspense>
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
                <button className="group relative rounded-2xl h-12 overflow-hidden overflow-x-hidden bg-neutral-950 px-8 py-2 text-neutral-50">
                  <span className="relative z-10">
                    <Link href="/booking">
                        Book Now
                    </Link>
                    
                    </span>
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-blue-500 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                  </span>
                </button>

                <button className="group relative rounded-2xl h-12 overflow-hidden overflow-x-hidden bg-neutral-950 px-8 py-2 text-neutral-50">
                    <span className="relative z-10"><Link href="/trackingtrain">
                     Track Live Train
                    </Link></span>
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-blue-500 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                  </span>
                </button>
              </div>
            </section>
            <section className="flex flex-col items-center justify-center h-screen w-full">
              <h1>
                <GradientText
                  colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
                  showBorder={false}
                  className="custom-class text-5xl"
                >
                  Our Services
                </GradientText>
              </h1>
              <Holidays />
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
            <section className="h-screen w-full flex flex-col justify-evenly items-center">
              <h1 className="text-5xl">Testimonials</h1>
              <Carousal />
            </section>
            <motion.footer className="relative overflow-hidden h-screen w-full flex justify-evenly items-start p-10">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <Image src="/logo.png" alt="IRCTC" width={50} height={50} />
                  <h1 className="text-5xl">IRCTC</h1>
                </div>
                <div>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
              </div>
              <div className="flex flex-col p-10 gap-4">
                <ul className="flex gap-4">
                  <li className="border-r-2 pr-3">About Us</li>
                  <li className="border-r-2 pr-3">Terms & Conditions</li>
                  <li className="border-r-2 pr-3">Refund Policy</li>
                  <li>Support</li>
                </ul>
                <h1 className="text-3xl">Contact</h1>
                <p>Phone: +91 6269017333</p>
                <p>Email: +91 6269017333</p>
              </div>
              <motion.h1
                initial={{ opacity: 1, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-[35vw] absolute -bottom-56"
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