'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { TrendingUp, TrendingDown, AlertCircle, Check } from 'lucide-react'

interface Scenario {
  id: string
  name: string
  description: string
  inflationRate: number
  interestRate: number
  unemploymentRate: number
  marketVolatility: number
  severity: 'mild' | 'moderate' | 'severe'
}

const SCENARIOS: Scenario[] = [
  {
    id: 'stable',
    name: 'Stable Growth',
    description: 'Normal economic conditions with steady growth',
    inflationRate: 2.5,
    interestRate: 4.5,
    unemploymentRate: 4.0,
    marketVolatility: 12,
    severity: 'mild'
  },
  {
    id: 'recession',
    name: 'Recession',
    description: 'Economic downturn with reduced employment',
    inflationRate: 1.5,
    interestRate: 2.0,
    unemploymentRate: 7.5,
    marketVolatility: 28,
    severity: 'severe'
  },
  {
    id: 'inflation',
    name: 'High Inflation',
    description: 'Elevated inflation with rising rates',
    inflationRate: 6.0,
    interestRate: 7.5,
    unemploymentRate: 5.0,
    marketVolatility: 18,
    severity: 'moderate'
  }
]

export function ScenarioBuilder() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0])
  const [customValues, setCustomValues] = useState({
    inflation: selectedScenario.inflationRate,
    interest: selectedScenario.interestRate,
    unemployment: selectedScenario.unemploymentRate,
    volatility: selectedScenario.marketVolatility
  })
  const [justApplied, setJustApplied] = useState(false)

  const toNum = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : (v as number))

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario)
    setCustomValues({
      inflation: scenario.inflationRate,
      interest: scenario.interestRate,
      unemployment: scenario.unemploymentRate,
      volatility: scenario.marketVolatility
    })
  }

  const handleReset = () => {
    handleScenarioSelect(SCENARIOS[0])
  }

  const handleApply = () => {
    setJustApplied(true)
    setTimeout(() => setJustApplied(false), 1800)
  }

  const getSeverityClasses = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'bg-green-500/15 text-green-400 border-green-500/30'
      case 'moderate':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30'
      case 'severe':
        return 'bg-red-500/15 text-red-400 border-red-500/30'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      {/* Preset Scenarios */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Preset Scenarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleScenarioSelect(scenario)}
              className={`p-3 rounded-lg border cursor-pointer text-left transition-all duration-150 active:scale-[0.98] hover-glow ${
                selectedScenario.id === scenario.id
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border hover:border-primary/30 hover:bg-primary/5'
              }`}
            >
              <p className="font-medium text-sm">{scenario.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{scenario.description}</p>
              <div className="mt-3">
                <Badge className={getSeverityClasses(scenario.severity)} variant="outline">
                  {scenario.severity}
                </Badge>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Adjustments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Custom Adjustments</CardTitle>
          <CardDescription>Fine-tune the economic parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Inflation Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                Inflation Rate
              </label>
              <span className="text-sm font-mono font-semibold">{customValues.inflation.toFixed(1)}%</span>
            </div>
            <Slider
              value={[customValues.inflation]}
              onValueChange={(value) => setCustomValues({ ...customValues, inflation: toNum(value) })}
              min={0}
              max={10}
              step={0.5}
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                Interest Rate
              </label>
              <span className="text-sm font-mono font-semibold">{customValues.interest.toFixed(1)}%</span>
            </div>
            <Slider
              value={[customValues.interest]}
              onValueChange={(value) => setCustomValues({ ...customValues, interest: toNum(value) })}
              min={0}
              max={10}
              step={0.5}
            />
          </div>

          {/* Unemployment Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-muted-foreground" />
                Unemployment Rate
              </label>
              <span className="text-sm font-mono font-semibold">{customValues.unemployment.toFixed(1)}%</span>
            </div>
            <Slider
              value={[customValues.unemployment]}
              onValueChange={(value) => setCustomValues({ ...customValues, unemployment: toNum(value) })}
              min={0}
              max={15}
              step={0.5}
            />
          </div>

          {/* Market Volatility */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-muted-foreground" />
                Market Volatility
              </label>
              <span className="text-sm font-mono font-semibold">{customValues.volatility.toFixed(0)}</span>
            </div>
            <Slider
              value={[customValues.volatility]}
              onValueChange={(value) => setCustomValues({ ...customValues, volatility: toNum(value) })}
              min={5}
              max={50}
              step={1}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="flex-1 gap-1.5" onClick={handleApply}>
          {justApplied ? (
            <>
              <Check className="w-4 h-4" />
              Applied
            </>
          ) : (
            'Apply Scenario'
          )}
        </Button>
        <Button variant="outline" className="flex-1" onClick={handleReset}>
          Reset to Defaults
        </Button>
      </div>
    </div>
  )
}
