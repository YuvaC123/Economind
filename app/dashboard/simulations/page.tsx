'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PageTransition } from '@/components/shared/page-transition'
import { CountUpNumber } from '@/components/shared/count-up-number'
import { Play, Download, Eye } from 'lucide-react'
import { generateMockSimulationResult, DEFAULT_PERSONA } from '@/lib/mock-data'

const SIMULATIONS = [
  {
    id: 1,
    persona: 'John Doe',
    scenario: 'Low Inflation Economy',
    scenarioId: 'scenario-1',
    date: '2 hours ago',
    status: 'Completed',
    accuracy: 87,
  },
  {
    id: 2,
    persona: 'John Smith',
    scenario: 'AI Revolution Boom',
    scenarioId: 'scenario-3',
    date: '5 hours ago',
    status: 'Completed',
    accuracy: 92,
  },
  {
    id: 3,
    persona: 'Emma Wilson',
    scenario: 'High Inflation Scenario',
    scenarioId: 'scenario-2',
    date: '1 day ago',
    status: 'Completed',
    accuracy: 78,
  },
]

export default function SimulationsPage() {
  const router = useRouter()

  const avgAccuracy = Math.round(
    SIMULATIONS.reduce((sum, s) => sum + s.accuracy, 0) / SIMULATIONS.length
  )
  const completedCount = SIMULATIONS.filter((s) => s.status === 'Completed').length
  const bestAccuracy = Math.max(...SIMULATIONS.map((s) => s.accuracy))

  const handleView = (sim: (typeof SIMULATIONS)[number]) => {
    router.push(`/results?personaName=${encodeURIComponent(sim.persona)}&scenarioId=${sim.scenarioId}`)
  }

  const handleDownload = (sim: (typeof SIMULATIONS)[number]) => {
    const result = generateMockSimulationResult(DEFAULT_PERSONA.id, sim.scenarioId)
    const payload = {
      persona: sim.persona,
      scenario: sim.scenario,
      date: sim.date,
      accuracy: sim.accuracy,
      result,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `simulation-${sim.id}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <PageTransition>
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-3xl font-medium mb-1">Simulations</h2>
        <p className="text-muted-foreground">View and manage your economic behavior simulations</p>
      </div>

      <div className="flex gap-2">
        <Button className="gap-2" onClick={() => router.push('/dashboard')}>
          <Play className="w-4 h-4" />
          New Simulation
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-glass text-center">
          <p className="text-2xl font-mono font-semibold text-primary">
            <CountUpNumber target={SIMULATIONS.length} />
          </p>
          <p className="text-xs text-muted-foreground mt-2">Total Simulations</p>
        </div>
        <div className="card-glass text-center">
          <p className="text-2xl font-mono font-semibold text-primary">
            <CountUpNumber target={completedCount} />
          </p>
          <p className="text-xs text-muted-foreground mt-2">Completed</p>
        </div>
        <div className="card-glass text-center">
          <p className="text-2xl font-mono font-semibold text-primary">
            <CountUpNumber target={avgAccuracy} format={(n) => `${Math.round(n)}%`} />
          </p>
          <p className="text-xs text-muted-foreground mt-2">Avg. Accuracy</p>
        </div>
        <div className="card-glass text-center">
          <p className="text-2xl font-mono font-semibold text-primary">
            <CountUpNumber target={bestAccuracy} format={(n) => `${Math.round(n)}%`} />
          </p>
          <p className="text-xs text-muted-foreground mt-2">Best Result</p>
        </div>
      </div>

      <div className="space-y-3">
        {SIMULATIONS.map((sim) => (
          <div key={sim.id} className="card-glass flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium">
                {sim.persona} - {sim.scenario}
              </h3>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span>{sim.date}</span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                  {sim.status}
                </span>
                <span className="font-mono font-medium text-primary">{sim.accuracy}% accuracy</span>
              </div>
            </div>

            <div className="flex gap-1">
              <Button variant="ghost" size="icon" title="View results" onClick={() => handleView(sim)}>
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                title="Download results"
                onClick={() => handleDownload(sim)}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </PageTransition>
  )
}
