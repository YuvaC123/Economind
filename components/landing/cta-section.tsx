'use client'

import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  const benefits = [
    'Create unlimited personas',
    'Test 8 predefined economic scenarios',
    'Analytics dashboard with spending, savings, and investment charts',
    'Export persona and scenario data as JSON',
    'Instant simulation results, no waiting',
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="card-glass text-center">
          <h2 className="text-3xl font-semibold mb-3 tracking-tight">Start simulating today</h2>
          <p className="text-muted-foreground mb-8">
            Explore how consumer personas respond to economic conditions — free to try, no account
            required to explore the dashboard.
          </p>

          <div className="space-y-3 mb-8 text-left max-w-sm mx-auto">
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
      </div>
    </section>
  )
}
