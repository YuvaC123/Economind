'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Play, Download, Eye } from 'lucide-react'
import { generateMockSimulationResult, DEFAULT_PERSONA } from '@/lib/mock-data'

const SIMULATIONS = [
  {
    id: 1,
    persona: 'Sarah Chen',
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Simulations</h2>
        <p className="text-muted-foreground">View and manage your economic behavior simulations</p>
      </div>

      <div className="flex gap-2">
        <Button className="gap-2" onClick={() => router.push('/dashboard')}>
          <Play className="w-4 h-4" />
          New Simulation
        </Button>
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
                <span className="font-medium text-primary">{sim.accuracy}% accuracy</span>
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
  )
}
