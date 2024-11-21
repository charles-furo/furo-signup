'use client'

import { useState, useEffect, useRef } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Check, Loader2, Upload } from 'lucide-react'

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

const LeftColumn = () => (
  <div className="flex-1 py-8 lg:py-20">
    <h1 className="mb-8 text-4xl font-bold leading-tight tracking-tight text-gray-900 lg:text-5xl">
      Automate your quote process with Furo
    </h1>
    
    <div className="mb-12 space-y-4">
      {["Sign up with your email", 
        "Sign up with your own quote system or provide your price database", 
        "We do the rest: you receive the quotes in minutes"].map((text) => (
        <div key={text} className="flex items-start gap-3">
          <div className="mt-1 rounded-full bg-green-100 p-0.5">
            <Check className="h-4 w-4 text-green-600" />
          </div>
          <span className="text-lg text-gray-600">{text}</span>
        </div>
      ))}
    </div>

    <div className="space-y-4">
      <p className="text-center text-sm text-gray-600">Trusted at companies large and small</p>
      <div className="flex flex-wrap items-center justify-center gap-8">
        <Image src="/placeholder.svg?height=32&width=96" alt="ConstructCo" width={96} height={32} />
        <Image src="/placeholder.svg?height=32&width=96" alt="AgriTech" width={96} height={32} />
        <Image src="/placeholder.svg?height=32&width=96" alt="BuildPro" width={96} height={32} />
        <Image src="/placeholder.svg?height=32&width=96" alt="FarmSolutions" width={96} height={32} />
        <Image src="/placeholder.svg?height=32&width=96" alt="StructureSmart" width={96} height={32} />
      </div>
    </div>
  </div>
)

export default function FuroSignUp() {
  const [step, setStep] = useState('initial')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentProvider, setCurrentProvider] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [showWelcome, setShowWelcome] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        if (step === 'crm') {
          setShowWelcome(true)
        } else {
          setStep('crm')
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isLoading, step])

  const handleProviderClick = (provider: string) => {
    setCurrentProvider(provider)
    setIsModalOpen(true)
  }

  const handleProviderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsModalOpen(false)
    setIsLoading(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
      setIsModalOpen(false)
      setIsLoading(true)
      // Here you would typically handle the file upload to your server
      console.log('File to upload:', file)
    }
  }

  const initialProviderButtons = [
    { title: 'Sign up with Microsoft Outlook', color: '#0078d4', icon: (
      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 5L12 14L23 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1 5H23V19H1V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { title: 'Sign up with Google', color: '#4285f4', icon: (
      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    )},
    { title: 'Sign up with Yahoo', color: '#720e9e', icon: (
      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 7L12 2L2 7V17L12 22L22 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 4.5L7 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { title: 'Sign up with OVH Cloud', color: '#123456', icon: (
      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor"/>
      </svg>
    )},
  ]

  const crmProviderButtons = [
    { title: 'Sign up with Salesforce', color: '#00A1E0', icon: (
      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.93 5.63c-.58-.3-1.22-.45-1.87-.45-1.14 0-2.22.47-3 1.3-.78.84-1.2 1.94-1.2 3.1 0 1.98 1.38 3.68 3.32 4.04.58.1 1.17.05 1.73-.15.56-.2 1.07-.55 1.48-1.02.4-.47.7-1.03.85-1.63.15-.6.15-1.23 0-1.84-.16-.6-.45-1.16-.86-1.63-.4-.47-.92-.82-1.48-1.02l.03.3zm4.93 2.7c-.3-1.18-.85-2.27-1.6-3.22-.76-.95-1.7-1.72-2.78-2.27-1.07-.55-2.25-.83-3.45-.83-1.57 0-3.1.5-4.37 1.43-1.27.93-2.2 2.24-2.67 3.73-.23.75-.35 1.54-.35 2.33 0 1.66.53 3.27 1.53 4.6 1 1.33 2.4 2.3 4 2.73.8.22 1.62.33 2.45.33 1.57 0 3.1-.5 4.37-1.43 1.27-.93 2.2-2.24 2.67-3.73.23-.75.35-1.54.35-2.33 0-.55-.05-1.1-.15-1.64v.3z"/>
      </svg>
    )},
    { title: 'Sign up with HubSpot', color: '#FF7A59', icon: (
      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zM8.115 10.88c.512-.706 1.044-1.275 1.666-1.768l2.531 3.117c-.512.706-1.044 1.275-1.666 1.768L8.115 10.88zm5.336-2.24c-.706-.512-1.275-1.044-1.768-1.666l3.117-2.531c.706.512 1.275 1.044 1.768 1.666l-3.117 2.531zm-2.24 5.336c.512.706 1.044 1.275 1.666 1.768l-2.531 3.117c-.706-.512-1.275-1.044-1.768-1.666l2.633-3.219zm5.336 2.24c.706.512 1.275 1.044 1.768 1.666l-3.117 2.531c-.706-.512-1.275-1.044-1.768-1.666l3.117-2.531z"/>
      </svg>
    )},
    { title: 'Sign up with QuickBooks', color: '#2CA01C', icon: (
      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-13v2h2v-2h-2zm0 4v6h2v-6h-2zm-3-1v2h2v-2H8zm0 4v2h2v-2H8zm6-4v2h2v-2h-2zm0 4v2h2v-2h-2z"/>
      </svg>
    )},
    { title: 'Other', color: '#6B7280', icon: <Upload className="mr-2 h-5 w-5" /> },
  ]

  const renderRightColumn = () => {
    if (isLoading) {
      return (
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
            <p className="mt-4 text-lg font-semibold">Processing...</p>
          </CardContent>
        </Card>
      )
    }

    switch (step) {
      case 'crm':
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Connect Your CRM</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {crmProviderButtons.map((button, index) => (
                <Button 
                  key={index}
                  className="w-full text-white hover:opacity-90" 
                  style={{backgroundColor: button.color}}
                  size="lg"
                  onClick={() => handleProviderClick(button.title)}
                >
                  {button.icon}
                  {button.title}
                </Button>
              ))}
            </CardContent>
          </Card>
        )
      case 'welcome':
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Welcome to Furo</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg">You have successfully signed up and subscribed!</p>
              <p className="text-sm text-gray-600">
                Each quote request from customer will generate an estimate in your mailbox automatically
              </p>
              <Button 
                onClick={() => {
                  setStep('initial')
                  setShowWelcome(false)
                }}
                className="mt-4"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        )
      default:
        return (
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-4">
              {initialProviderButtons.map((button, index) => (
                <Button 
                  key={index}
                  className="w-full text-white hover:opacity-90" 
                  style={{backgroundColor: button.color}}
                  size="lg"
                  onClick={() => handleProviderClick(button.title)}
                >
                  {button.icon}
                  {button.title}
                </Button>
              ))}

              <p className="text-sm text-gray-600">
                By signing up, you agree to Furo's{" "}
                <Link className="text-primary hover:underline" href="#">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link className="text-primary hover:underline" href="#">
                privacy policy
                </Link>
                .
              </p>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link className="text-primary hover:underline" href="/login">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto flex min-h-screen max-w-6xl flex-col px-4 lg:flex-row lg:items-center lg:gap-20">
        <LeftColumn />
        <div className="flex-1 py-8 lg:py-20 flex items-center justify-center">
          {showWelcome ? renderRightColumn() : (
            step === 'initial' ? renderRightColumn() : (
              <Card className="w-full max-w-md">
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
                  <p className="mt-4 text-lg font-semibold">Processing...</p>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentProvider}</DialogTitle>
            <DialogDescription>
              {currentProvider === 'Other'
                ? 'Upload a CSV file of your database of items, options, and prices.'
                : `Enter your ${currentProvider.split(' ').pop()} account credentials to sign up.`}
            </DialogDescription>
          </DialogHeader>
          {currentProvider === 'Other' ? (
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={!file}>
                Upload CSV
              </Button>
            </form>
          ) : (
            <form onSubmit={handleProviderSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
