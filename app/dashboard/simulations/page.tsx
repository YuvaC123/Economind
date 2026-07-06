'use client'

import { Button } from '@/components/ui/button'
import { Play, Download, Eye } from 'lucide-react'

export default function SimulationsPage() {
  const simulations = [
    {
      id: 1,
      persona: 'Sarah Chen',
      scenario: 'Low Inflation Economy',
      date: '2 hours ago',
      status: 'Completed',
      accuracy: 87,
    },
    {
      id: 2,
      persona: 'John Smith',
      scenario: 'AI Revolution Boom',
      date: '5 hours ago',
      status: 'Completed',
      accuracy: 92,
    },
    {
      id: 3,
      persona: 'Emma Wilson',
      scenario: 'High Inflation Scenario',
      date: '1 day ago',
      status: 'Completed',
      accuracy: 78,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Simulations</h2>
        <p className="text-muted-foreground">View and manage your economic behavior simulations</p>
      </div>

      <div className="flex gap-2">
        <Button className="gap-2">
          <Play className="w-4 h-4" />
          New Simulation
        </Button>
      </div>

      <div className="space-y-3">
        {simulations.map((sim) => (
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
              <Button variant="ghost" size="icon">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
