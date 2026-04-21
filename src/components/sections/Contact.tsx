'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSend, FiLoader, FiChevronDown, FiShield,
  FiMail, FiPhone, FiLinkedin, FiArrowUpRight
} from 'react-icons/fi';
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { sendEmail } from '@/lib/sendEmail';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      setLocalTime(new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit'
      }));
    };
    updateClock();
    const timer = setInterval(updateClock, 60000);
    return () => clearInterval(timer);
  }, []);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const result = await sendEmail(new FormData(e.currentTarget));
    if (result.success) {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      setCharCount(0);
      setTimeout(() => setStatus('idle'), 4500);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">

          {/* LEFT COLUMN - INFO */}
          <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-28 self-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FiShield className="size-6 text-primary" />
                <span className="text-xs font-black uppercase tracking-[0.5em] text-muted-foreground">
                  SECURE CHANNEL
                </span>
              </div>

              <h2 className="text-6xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-none text-foreground">
                Let&apos;s Build<br />
                <span className="bg-linear-to-r from-primary via-violet-500 to-emerald-500 bg-clip-text text-transparent">
                  Something Great.
                </span>
              </h2>
            </div>

            <div className="max-w-md text-lg text-muted-foreground space-y-4">
              <p>I&apos;m currently open to new opportunities and exciting collaborations.</p>
              <p>Whether you&apos;re looking for a fullstack solution, technical consultation, or product architecture — I&apos;m ready to help turn your idea into reality.</p>
            </div>

            {/* Live Status */}
            <div className="flex items-center gap-4 bg-card border border-border rounded-3xl px-6 py-5">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Available for freelance &amp; full-time roles</p>
                <p className="text-xs text-muted-foreground">Lagos, Nigeria • {localTime || '--:--'}</p>
              </div>
            </div>

            {/* Quick Contact Links */}
            <div className="space-y-3">
              <div className="uppercase text-xs font-black tracking-widest text-muted-foreground mb-4">DIRECT LINKS</div>

              <ContactLink
                icon={<FaWhatsapp className="text-[#25D366]" />}
                label="WhatsApp"
                value="+234 814 089 8790"
                href="https://wa.me/2348140898790"
              />
              <ContactLink
                icon={<FiMail />}
                label="Email"
                value="adeoluadeoye7@gmail.com"
                href="mailto:adeoluadeoye7@gmail.com"
              />
              <ContactLink
                icon={<FiPhone />}
                label="Call"
                value="+234 814 089 8790"
                href="tel:+2348140898790"
              />
              <ContactLink
                icon={<FiLinkedin className="text-[#0077B5]" />}
                label="LinkedIn"
                value="Adeoluwa Adeoye"
                href="https://www.linkedin.com/in/adeoyeadeoluwa"
              />
            </div>
          </div>

          {/* RIGHT COLUMN - FORM */}
          <div className="lg:col-span-7">
            <div className="bg-card border border-border rounded-3xl p-8 md:p-12 lg:p-16">
              <div className="mb-10">
                <h3 className="text-4xl font-bold tracking-tight">Send a Message</h3>
                <p className="mt-3 text-muted-foreground">I typically respond within 24 hours.</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-8">
                <input type="text" name="website_url" className="hidden" tabIndex={-1} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase tracking-widest">Full Name</Label>
                    <Input name="fullName" required placeholder="Your name" className="h-14 rounded-2xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase tracking-widest">Email</Label>
                    <Input name="emailAddress" type="email" required placeholder="you@email.com" className="h-14 rounded-2xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-widest">Project Type</Label>
                  <div className="relative">
                    <select
                      name="projectType"
                      required
                      defaultValue=""
                      className="w-full h-14  rounded-2xl border-border bg-secondary px-6 text-sm focus:border-primary"
                    >
                      <option value="" disabled>Select inquiry type</option>
                      <option value="Product Architecture">Product Architecture</option>
                      <option value="SaaS Engineering">SaaS Engineering</option>
                      <option value="Consultancy">Technical Consultation</option>
                      <option value="Other">Other</option>
                    </select>
                    <FiChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    <Label>Message</Label>
                    <span>{charCount}/500</span>
                  </div>
                  <Textarea
                    name="details"
                    required
                    maxLength={500}
                    onChange={(e) => setCharCount(e.target.value.length)}
                    placeholder="Describe your project, timeline, or how I can assist..."
                    className="min-h-45 rounded-3xl p-6 resize-y"
                  />
                </div>

                <Button
                  disabled={status === 'sending' || status === 'success'}
                  className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-sm bg-linear-to-r from-primary to-violet-600 hover:brightness-110"
                >
                  {(status === 'idle' || status === 'error') && <>Send Message <FiSend className="ml-3" /></>}
                  {status === 'sending' && <FiLoader className="animate-spin" />}
                  {status === 'success' && 'Message Sent Successfully'}
                </Button>
              </form>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-emerald-500 text-sm font-medium mt-6"
                  >
                    Thank you! I&apos;ll get back to you soon.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-red-500 text-sm font-medium mt-6"
                  >
                    Something went wrong. Please try again or email me directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Reusable Contact Link Component */
function ContactLink({ icon, label, value, href }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      target={href.startsWith('http') ? "_blank" : undefined}
      className="group flex items-center gap-5 p-6 bg-card border border-border rounded-3xl hover:border-primary/50 transition-all hover:shadow-sm"
    >
      <div className="text-3xl shrink-0">{icon}</div>
      <div className="flex-1">
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-muted-foreground truncate">{value}</p>
      </div>
      <FiArrowUpRight className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
    </Link>
  );
}