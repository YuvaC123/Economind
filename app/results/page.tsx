'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { generateMockSimulationResult, DEFAULT_PERSONA, PREDEFINED_SCENARIOS } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Download, Share2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function ResultsContent() {
  const searchParams = useSearchParams()
  const personaName = searchParams.get('personaName') ?? DEFAULT_PERSONA.name
  const scenario =
    PREDEFINED_SCENARIOS.find((s) => s.id === searchParams.get('scenarioId')) ?? PREDEFINED_SCENARIOS[0]
  const result = generateMockSimulationResult(DEFAULT_PERSONA.id, scenario.id)

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        <h1 className="text-3xl font-semibold mb-1">Simulation Results</h1>
        <p className="text-muted-foreground">
          Economic behavior analysis for {personaName} under {scenario.name}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-6">
        {/* Executive Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
            <CardDescription>Natural language analysis of consumer decision patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {personaName} demonstrates a moderate risk tolerance with balanced spending and
              saving behaviors. Under current economic conditions, the consumer shows preference for
              diversified investments while maintaining adequate emergency savings. Behavioral
              patterns indicate strong future orientation with some sensitivity to market confidence
              indicators. Overall alignment with rational choice theory is 71%, suggesting minor
              deviations from pure economic rationality driven primarily by loss-aversion preferences.
            </p>
          </CardContent>
        </Card>

        {/* Decision Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: 'Monthly Spending',
              value: `$${result.decisions.spending.toFixed(0)}`,
              confidence: `${(result.confidence.spending * 100).toFixed(0)}%`,
            },
            {
              label: 'Savings',
              value: `$${result.decisions.saving.toFixed(0)}`,
              confidence: `${(result.confidence.saving * 100).toFixed(0)}%`,
            },
            {
              label: 'Borrowing',
              value: `$${result.decisions.borrowing.toFixed(0)}`,
              confidence: `${(result.confidence.borrowing * 100).toFixed(0)}%`,
            },
            {
              label: 'Investing',
              value: `$${result.decisions.investing.toFixed(0)}`,
              confidence: `${(result.confidence.investing * 100).toFixed(0)}%`,
            },
          ].map((item, i) => (
            <div key={i} className="card-glass">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-2xl font-semibold text-primary mt-2">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-2">Confidence: {item.confidence}</p>
            </div>
          ))}
        </div>

        {/* Decision Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Consumer Decisions Timeline</CardTitle>
            <CardDescription>Sequence of economic decisions and rationale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.reasoning.map((reason, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">{i + 1}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Behavioral Traits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Behavioral Traits</CardTitle>
              <CardDescription>Consumer psychology metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(result.behavioralTraits).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-semibold">{(value * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-500" style={{ width: `${value * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theory Alignment</CardTitle>
              <CardDescription>Economic theory fit analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(result.theoryAlignment).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-semibold">{(value * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-500" style={{ width: `${value * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Section */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share Results
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ResultsContent />
    </Suspense>
  )
}
