'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Calendar as CalendarIcon,
    Clock,
    User,
    CheckCircle2,
    ChevronRight,
    ArrowLeft,
    Sparkles,
    Mail,
    Briefcase,
    Zap,
    Globe
} from 'lucide-react'

import { sendBookingEmail } from '../../lib/actions'
import 'react-day-picker/dist/style.css'

const TIME_SLOTS = [
    "09:00 AM",
    "10:30 AM",
    "01:00 PM",
    "02:30 PM",
    "04:00 PM"
]

const SERVICES = [
    { id: "fs", label: "Custom Full-Stack Development", icon: <Zap size={14} /> },
    { id: "sa", label: "SaaS Architecture Design", icon: <Globe size={14} /> },
    { id: "tc", label: "Strategic Technical Consultation", icon: <Briefcase size={14} /> },
    { id: "ua", label: "UI/UX & Performance Audit", icon: <Sparkles size={14} /> }
]

export default function BookingPage() {
    const router = useRouter()

    const [date, setDate] = useState<Date | undefined>(() => new Date())
    const today = new Date()
    const [selectedTime, setSelectedTime] = useState<string>("")
    const [selectedService, setSelectedService] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [step, setStep] = useState(1)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!date || !selectedTime || !selectedService) return

        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        formData.append('date', format(date, 'PPP'))
        formData.append('time', selectedTime)
        formData.append('service', selectedService)

        const result = await sendBookingEmail(formData)

        if (result.success) {
            setIsConfirmed(true)
        } else {
            alert("Failed to send booking request. Please try again.")
            setIsSubmitting(false)
        }
    }

    if (isConfirmed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center space-y-6 sm:space-y-8 p-8 sm:p-12 rounded-3xl border bg-card shadow-xl"
                >
                    <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-9 h-9 sm:w-12 sm:h-12 text-primary" />
                    </div>

                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Booking Confirmed!</h2>
                        <p className="mt-3 text-muted-foreground text-base sm:text-lg">
                            You&apos;re scheduled for <strong>{format(date!, 'MMMM do')}</strong> at <strong>{selectedTime}</strong>
                        </p>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        I&apos;ll be in touch shortly to confirm your session details.
                    </div>

                    <button
                        onClick={() => router.push('/')}
                        className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity"
                    >
                        Back to Portfolio
                    </button>
                </motion.div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-background py-8 md:py-12 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Navigation */}
                <div className="flex items-center justify-between mb-6 md:mb-10">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Back to Portfolio</span>
                        <span className="sm:hidden">Back</span>
                    </button>

                    {/* Step Indicator */}
                    <div className="flex gap-2 sm:gap-3">
                        {[1, 2].map((i) => (
                            <div
                                key={i}
                                className={`h-1.5 w-10 sm:w-14 rounded-full transition-all duration-300 ${step >= i ? 'bg-primary' : 'bg-muted'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-card rounded-2xl sm:rounded-3xl border shadow-sm overflow-hidden flex flex-col lg:flex-row">
                    {/* Sidebar */}
                    <div className="lg:w-72 xl:w-88 bg-muted/40 p-6 sm:p-8 lg:p-10 flex flex-col border-b lg:border-b-0 lg:border-r">
                        <div className="space-y-5 md:space-y-6 flex-1">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="w-11 h-11 sm:w-13 sm:h-13 bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg shrink-0">
                                    <Sparkles size={22} />
                                </div>
                                <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black tracking-tighter leading-[0.95]">
                                    Let&apos;s Build Something{' '}
                                    <span className="bg-linear-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">Great</span>
                                </h1>
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Book a focused 60-minute strategy call to discuss your product architecture, development roadmap, or technical challenges.
                            </p>

                            <div>
                                <div className="uppercase text-[10px] font-semibold tracking-widest text-muted-foreground mb-3">
                                    What&apos;s Included
                                </div>
                                <div className="space-y-3">
                                    {[
                                        "60-minute deep-dive strategy call",
                                        "Personalized action plan & roadmap",
                                        "Code & architecture review"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex gap-3 items-start">
                                            <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                                            <span className="text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 mt-6 border-t text-xs text-muted-foreground">
                            Powered by Calendly-style experience · Built with Next.js
                        </div>
                    </div>

                    {/* Main Form Area */}
                    <form onSubmit={handleSubmit} className="flex-1 p-5 sm:p-6 md:p-8 lg:p-8 xl:p-10 flex flex-col min-w-0">
                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex-1 space-y-6 sm:space-y-8"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        {/* Calendar */}
                                        <div className="min-w-0">
                                            <h3 className="flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground mb-3">
                                                <CalendarIcon size={13} /> SELECT DATE
                                            </h3>
                                            <div className="w-full bg-background rounded-2xl border shadow-sm overflow-hidden">
                                                <DayPicker
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    disabled={today ? { before: today } : undefined}
                                                    className="p-3 w-full"
                                                />
                                            </div>
                                        </div>

                                        {/* Time & Service */}
                                        <div className="space-y-6 min-w-0">
                                            {/* Time Slots */}
                                            <div>
                                                <h3 className="flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground mb-3">
                                                    <Clock size={13} /> PREFERRED TIME (GMT+1)
                                                </h3>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {TIME_SLOTS.map((time) => (
                                                        <button
                                                            key={time}
                                                            type="button"
                                                            onClick={() => setSelectedTime(time)}
                                                            className={`py-3 px-3 border font-medium transition-all text-xs sm:text-sm rounded-xl ${selectedTime === time ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'hover:border-primary/50 hover:bg-muted/50'}`}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Service Type */}
                                            <div>
                                                <h3 className="flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground mb-3">
                                                    <Briefcase size={13} /> SERVICE TYPE
                                                </h3>
                                                <select
                                                    required
                                                    value={selectedService}
                                                    onChange={(e) => setSelectedService(e.target.value)}
                                                    className="w-full h-12 px-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none text-xs sm:text-sm font-medium cursor-pointer"
                                                >
                                                    <option value="" disabled>Choose your session focus...</option>
                                                    {SERVICES.map((service) => (
                                                        <option key={service.id} value={service.label}>
                                                            {service.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        disabled={!date || !selectedTime || !selectedService}
                                        className="w-full py-3.5 sm:py-4 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all text-sm sm:text-base rounded-xl shadow-lg shadow-primary/20"
                                    >
                                        Continue to Your Details
                                        <ChevronRight size={18} />
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="max-w-lg mx-auto w-full space-y-6 sm:space-y-8 flex-1 flex flex-col"
                                >
                                    <div className="text-center">
                                        <h2 className="text-2xl sm:text-3xl font-bold">Almost there...</h2>
                                        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                            {selectedService} · {date ? format(date, 'EEEE, MMMM do') : ''} at {selectedTime}
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                            <input
                                                required
                                                name="name"
                                                placeholder="Your full name"
                                                className="w-full pl-11 pr-5 h-12 sm:h-13 rounded-xl border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                                            />
                                        </div>

                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                            <input
                                                required
                                                name="email"
                                                type="email"
                                                placeholder="your@email.com"
                                                className="w-full pl-11 pr-5 h-12 sm:h-13 rounded-xl border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-auto">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="flex-1 h-12 rounded-xl border font-semibold hover:bg-muted transition-colors text-sm"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-70 text-sm"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Confirming...
                                                </>
                                            ) : (
                                                "Confirm & Book"
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </main>
    )
}
