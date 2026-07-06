'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Brain, User, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="flex items-center justify-center pt-16 pb-20">
      <motion.div
        className="max-w-3xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary">
          <Brain className="w-4 h-4" />
          <span className="text-sm font-medium">AI-Powered Economic Research</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 text-balance leading-tight tracking-tight">
          Simulate consumer behavior with <span className="text-primary">EconoMind</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Understand how different personas make economic decisions under various macroeconomic
          scenarios. Validate economic theories with behavioral analysis.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              Launch Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href="#features" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Learn More
            </Button>
          </a>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {[
            { icon: User, title: 'Persona Builder', desc: 'Create realistic consumer profiles' },
            { icon: BarChart3, title: 'Scenario Engine', desc: 'Model economic conditions' },
            { icon: Brain, title: 'Behavior Analysis', desc: 'Understand decision patterns' },
          ].map((item, i) => (
            <div key={i} className="card-glass">
              <item.icon className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-medium mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
