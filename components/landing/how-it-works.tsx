'use client'

import { UserPlus, SlidersHorizontal, PlayCircle } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    title: 'Build a persona',
    desc: 'Define demographics, income, wealth, and behavioral traits like risk aversion and time preference.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Configure a scenario',
    desc: 'Pick a preset economic condition or fine-tune inflation, interest rates, and market volatility yourself.',
  },
  {
    icon: PlayCircle,
    title: 'Run the simulation',
    desc: 'Get spending, saving, and investment decisions, plus how closely they align with economic theory.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">How it works</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            From persona to insight in three steps
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="hidden md:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-border" />
          {steps.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold mb-4">
                {i + 1}
              </div>
              <step.icon className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-medium mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
