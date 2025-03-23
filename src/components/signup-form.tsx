"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, Mail, Lock, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SignupFormProps {
  onToggleForm: () => void
}

export default function SignupForm({ onToggleForm }: SignupFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordMatch, setPasswordMatch] = useState(true)

  useEffect(() => {
    // Check if passwords match
    if (confirmPassword) {
      setPasswordMatch(password === confirmPassword)
    }

    // Calculate password strength
    if (password) {
      let strength = 0
      // Length check
      if (password.length >= 8) strength += 1
      // Contains number
      if (/\d/.test(password)) strength += 1
      // Contains special char
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1
      // Contains uppercase and lowercase
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1

      setPasswordStrength(strength)
    } else {
      setPasswordStrength(0)
    }
  }, [password, confirmPassword])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }
    // Handle signup logic here
    console.log("Sign up with:", { name, email, password })
  }

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500"
    if (passwordStrength === 2) return "bg-yellow-500"
    if (passwordStrength >= 3) return "bg-green-500"
    return "bg-gray-700"
  }

  const getStrengthText = () => {
    if (!password) return ""
    if (passwordStrength <= 1) return "Weak"
    if (passwordStrength === 2) return "Medium"
    if (passwordStrength >= 3) return "Strong"
    return ""
  }

  return (
    <div className="space-y-6 text-white">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Create a New Account</h1>
        <p className="text-sm text-gray-300">Sign up to IRCTC</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="border-gray-700 bg-gray-900/50 pl-10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="signup-email"
              type="email"
              placeholder="your@email.com"
              className="border-gray-700 bg-gray-900/50 pl-10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              className="border-gray-700 bg-gray-900/50 pl-10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {password && (
            <div className="space-y-1">
              <div className="flex h-1 w-full overflow-hidden rounded-full bg-gray-700">
                <div
                  className={`transition-all duration-300 ${getStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                ></div>
              </div>
              <p
                className={`text-xs ${passwordStrength <= 1 ? "text-red-400" : passwordStrength === 2 ? "text-yellow-400" : "text-green-400"}`}
              >
                {getStrengthText()}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              className={`border-gray-700 bg-gray-900/50 pl-10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 ${
                confirmPassword && !passwordMatch ? "border-red-500" : ""
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPassword && passwordMatch && <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-500" />}
          </div>
          {confirmPassword && !passwordMatch && <p className="text-xs text-red-400">Passwords don&apos;t match</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-2 text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/20"
        >
          Sign up <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-400">Already have an account? </span>
        <button type="button" className="font-medium text-blue-400 hover:text-blue-300" onClick={onToggleForm}>
          Log in
        </button>
      </div>
    </div>
  )
}

