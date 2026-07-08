'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ScenarioDemo } from '@/components/landing/scenario-demo'

export function HeroSection() {
  return (
    <section className="px-6 pt-16 pb-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-heading text-5xl md:text-6xl font-medium mb-6 text-balance leading-[1.05] tracking-tight">
            How does a{' '}
            <span className="italic text-primary">recession</span>{' '}
            actually change what people do with their money?
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-lg text-balance">
            EconoMind simulates consumer personas under real macroeconomic conditions, so you can
            watch behavior shift instead of just reading a theory about it. Try the slider on the
            right.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Launch Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#features" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                See what it models
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <ScenarioDemo />
        </motion.div>
      </div>
    </section>
  )
}
