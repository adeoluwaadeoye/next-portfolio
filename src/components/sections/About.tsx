"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Activity, Workflow, GitBranch, 
  Search, ShieldAlert, BarChart3, Repeat, 
  Terminal, Scale, MessageSquareCode, Layers
} from 'lucide-react';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        
        {/* --- HEADER --- */}
        <motion.div {...fadeIn} className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono text-xs mb-3 font-bold uppercase tracking-tighter">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Operational Framework v4.0
              </div>
              <h1 className="text-5xl font-black tracking-tighter mb-2">
                Systems <span className="text-blue-600">Architect.</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg font-medium leading-relaxed">
                I solve for the complexity that arises when code meets the real world. 
                My focus is the lifecycle of resilient infrastructure and the logic of scalable delivery.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT: THE ENGINEERING LIFECYCLE --- */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              01 // Execution Lifecycle
            </h3>
            
            <div className="space-y-4">
              {[
                { 
                  stage: "Discovery & First Principles", 
                  desc: "Deconstructing complex business requirements into atomic engineering problems. I focus on identifying the 'critical path' before a single line of code is written.",
                  icon: <Search size={20} />
                },
                { 
                  stage: "Architectural Hardening", 
                  desc: "Designing for the 'Failure Mode.' I implement circuit breakers, retries, and idempotency to ensure the system survives partial outages gracefully.",
                  icon: <ShieldAlert size={20} />
                },
                { 
                  stage: "Scalable Implementation", 
                  desc: "Building with a focus on 'State Decoupling.' By ensuring services are stateless, we enable infinite horizontal scaling and seamless deployments.",
                  icon: <Scale size={20} />
                },
                { 
                  stage: "Observability & Feedback", 
                  desc: "Deploying deep telemetry. I believe engineering is an iterative loop where real-user metrics dictate the next architectural evolution.",
                  icon: <BarChart3 size={20} />
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex gap-6 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 transition-all"
                >
                  <div className="mt-1 text-blue-600 dark:text-blue-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1 tracking-tight">{item.stage}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: THE DECISION LOGIC --- */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
              02 // Decision Framework
            </h3>

            {/* Decision Logic Cards */}
            <div className="grid grid-cols-1 gap-4">
              <motion.div {...fadeIn} className="p-6 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/10">
                <Layers className="mb-4 opacity-50" size={32} />
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tighter">Abstraction Balance</h4>
                <p className="text-sm text-blue-100 leading-relaxed">
                  I avoid the &quot;Premature Abstraction&quot; trap. My logic is simple: 
                  Don&apos;t build a framework when a function will do, but don&apos;t build a 
                  monolith when the domain demands microservices.
                </p>
              </motion.div>

              <motion.div {...fadeIn} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                    <Repeat size={20} />
                  </div>
                  <h4 className="font-bold uppercase tracking-tighter">Reliability Engineering</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-500">System Resilience</span>
                    <span className="text-emerald-500">EXCELLENT</span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: "94%" }} 
                      transition={{ duration: 1 }}
                      className="h-full bg-emerald-500" 
                    />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Prioritizing **Automated Recovery** over manual intervention. 
                    Every system I design is built to recover its own state 
                    without human &quot;babysitting&quot; during off-peak failures.
                  </p>
                </div>
              </motion.div>

              {/* Code-Style Thinking */}
              <motion.div {...fadeIn} className="p-6 bg-slate-900 dark:bg-black rounded-2xl font-mono text-[11px] leading-5 border border-slate-800">
                <div className="flex items-center gap-2 mb-4 text-slate-500">
                  <MessageSquareCode size={14} /> 
                  <span>Thought_Process.log</span>
                </div>
                <p className="text-purple-400">while (problem.isComplex()) &#123;</p>
                <p className="text-blue-400 ml-4">simplify_to_subproblems();</p>
                <p className="text-blue-400 ml-4">evaluate_bottlenecks();</p>
                <p className="text-emerald-400 ml-4">optimize_data_path();</p>
                <p className="text-slate-500 ml-4">Ensure O(n) or better</p>
                <p className="text-purple-400">&#125;</p>
                <p className="mt-2 text-amber-500">return&quot;Scalable Solution&quot;;</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* --- FOOTER: PERFORMANCE TARGETS --- */}
        <motion.div 
          {...fadeIn}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl"
        >
          {[
            { label: "Design Pattern", value: "Event-Driven" },
            { label: "Code Integrity", value: "Strict Typing" },
            { label: "Deployment", value: "Immutable" },
            { label: "Architecture", value: "Cloud-Native" }
          ].map((item, i) => (
            <div key={i} className="text-center md:text-left border-r last:border-0 border-slate-100 dark:border-slate-800 pr-4">
              <p className="text-[10px] font-mono uppercase text-slate-400 mb-1">{item.label}</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{item.value}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default About;