'use client'

import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  const benefits = [
    'Create unlimited personas',
    'Test 4+ predefined scenarios',
    'Advanced analytics dashboard',
    'Export research data',
    'Real-time simulations',
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="card-glass">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl font-semibold mb-3 tracking-tight">Start simulating today</h2>
              <p className="text-muted-foreground mb-8">
                Join researchers and economists using EconoMind to understand consumer behavior
                patterns
              </p>

              <div className="space-y-3 mb-8">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Right Content - Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { number: '1,000+', label: 'Personas Created' },
                { number: '50+', label: 'Economic Theories' },
                { number: '99.9%', label: 'Uptime' },
                { number: '24/7', label: 'Available' },
              ].map((stat, i) => (
                <div key={i} className="rounded-lg border border-border bg-muted p-4 text-center transition-colors duration-150 hover:border-primary/30 hover:bg-primary/5">
                  <div className="text-xl font-semibold text-primary mb-1">{stat.number}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
