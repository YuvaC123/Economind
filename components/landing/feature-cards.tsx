'use client'

import { BarChart3, Zap, Brain, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Behavioral Economics',
    description: 'Analyze how real consumers deviate from rational economic models',
  },
  {
    icon: TrendingUp,
    title: 'Macroeconomic Scenarios',
    description: 'Test consumer behavior across different economic conditions',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Visualize spending patterns, savings decisions, and investment choices',
  },
  {
    icon: Zap,
    title: 'Real-time Simulation',
    description: 'Run instant simulations with your custom personas and scenarios',
  },
]

export function FeatureCards() {
  return (
    <section id="features" className="py-20 px-6 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">Features</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 tracking-tight">
            Built for research
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand consumer economic behavior and validate economic
            theories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <div key={i} className="card-glass">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 p-2 rounded-lg bg-primary/10">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
