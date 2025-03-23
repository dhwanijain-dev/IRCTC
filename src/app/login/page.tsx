"use client"

import { useState } from "react"

// Dynamically import the 3D component to avoid SSR issues


import LoginForm from "@/components/login-form"
import SignupForm from "@/components/signup-form"
import Image from "next/image";

export default function Home() {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <main className="flex min-h-screen flex-col bg-gradient-to-br from-navy-900 to-purple-900 md:flex-row">
            {/* 3D Train Ticket Section (60% on desktop) */}
            <div className="flex h-[40vh] w-full items-center justify-center md:h-screen md:w-3/5">
                <Image
                src={"/pictures/ticket.png"}
                alt="Train Ticket"
                width={1024}
                height={1024}
                />
            </div>

            {/* Login/Signup Form Section (40% on desktop) */}
            <div className="flex h-[60vh] w-full items-center justify-center p-4 md:h-screen md:w-2/5">
                <div className="w-full max-w-md rounded-xl bg-black/30 p-6 backdrop-blur-md backdrop-filter md:p-8">
                    {isLogin ? (
                        <LoginForm onToggleForm={() => setIsLogin(false)} />
                    ) : (
                        <SignupForm onToggleForm={() => setIsLogin(true)} />
                    )}
                </div>
            </div>
        </main>
    )
}

