'use client'

import { useEffect, useState } from 'react'
import { HelpCircle, X, ArrowRight, ArrowLeft, User, Globe, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STEPS = [
  {
    icon: HelpCircle,
    title: 'Welcome to EconoMind',
    body: 'A 30-second tour of how to simulate consumer economic behavior.',
  },
  {
    icon: User,
    title: 'Build a persona',
    body: 'Define demographics, income, and behavioral traits like risk aversion and time preference.',
  },
  {
    icon: Globe,
    title: 'Configure a scenario',
    body: 'Choose a preset economic condition, or fine-tune inflation, interest rates, and volatility yourself.',
  },
  {
    icon: Play,
    title: 'Run & analyze',
    body: 'Run the simulation, then review decisions, confidence scores, and theory alignment in Analytics.',
  },
]

export function TutorialButton() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)

  const close = () => {
    setOpen(false)
    setStep(0)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1
  const Icon = current.icon

  return (
    <>
      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setOpen(true)}>
        <HelpCircle className="w-4 h-4" />
        <span className="hidden sm:inline">Tutorial</span>
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            aria-label="Close tutorial"
            className="absolute inset-0 bg-foreground/20 cursor-pointer"
            onClick={close}
          />

          <div className="relative bg-white rounded-xl border border-border shadow-lg w-full max-w-sm p-6">
            <button
              onClick={close}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              aria-label="Close tutorial"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-primary" />
            </div>

            <p className="text-xs font-medium text-muted-foreground mb-1">
              Step {step + 1} of {STEPS.length}
            </p>
            <h3 className="font-semibold mb-2">{current.title}</h3>
            <p className="text-sm text-muted-foreground mb-6">{current.body}</p>

            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {STEPS.map((s, i) => (
                  <span
                    key={s.title}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-150 ${
                      i === step ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                {step > 0 && (
                  <Button variant="outline" size="sm" onClick={() => setStep((s) => s - 1)}>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Button>
                )}
                {isLast ? (
                  <Button size="sm" onClick={close}>
                    Get started
                  </Button>
                ) : (
                  <Button size="sm" className="gap-1.5" onClick={() => setStep((s) => s + 1)}>
                    Next
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
