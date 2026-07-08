'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DEFAULT_PERSONA, PREDEFINED_SCENARIOS } from '@/lib/mock-data'
import { PersonaConfigCard } from '@/components/dashboard/persona-config-card'
import { MacroeconomicCard } from '@/components/dashboard/macroeconomic-card'
import { EditPersonaModal } from '@/components/dashboard/edit-persona-modal'
import { Button } from '@/components/ui/button'
import { Play, Plus } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [selectedScenario, setSelectedScenario] = useState(PREDEFINED_SCENARIOS[0])
  const [persona, setPersona] = useState(DEFAULT_PERSONA)
  const [isEditingPersona, setIsEditingPersona] = useState(false)

  const handleRunSimulation = () => {
    router.push(
      `/results?personaName=${encodeURIComponent(persona.name)}&scenarioId=${selectedScenario.id}`
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-1">Welcome back</h2>
        <p className="text-muted-foreground">
          Configure your persona and select a scenario to run simulations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Persona */}
        <div className="lg:col-span-1">
          <PersonaConfigCard persona={persona} onEdit={() => setIsEditingPersona(true)} />
        </div>

        {/* Center Column - Main Content */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-glass">
            <h3 className="text-base font-semibold mb-4">Scenario Selection</h3>
            <div className="space-y-2">
              {PREDEFINED_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario)}
                  className={`w-full text-left p-3 rounded-lg border cursor-pointer transition-all duration-150 active:scale-[0.98] ${
                    selectedScenario.id === scenario.id
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border hover:border-primary/30 hover:bg-primary/5'
                  }`}
                >
                  <p className="font-medium text-sm">{scenario.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{scenario.description}</p>
                </button>
              ))}
            </div>

            <Button className="w-full mt-4 gap-2" onClick={handleRunSimulation}>
              <Play className="w-4 h-4" />
              Run Simulation
            </Button>
          </div>

          <div className="card-glass">
            <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/persona-builder')}
              >
                Create New Persona
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/economic-scenarios')}
              >
                Custom Scenario
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/reports')}
              >
                View Recent Reports
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Macro Environment */}
        <div className="lg:col-span-1">
          <MacroeconomicCard macro={selectedScenario.macro} readOnly />
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Personas Created', value: '12' },
          { label: 'Simulations Run', value: '48' },
          { label: 'Avg. Accuracy', value: '87%' },
          { label: 'Reports Generated', value: '5' },
        ].map((stat, i) => (
          <div key={i} className="card-glass text-center">
            <p className="text-2xl font-semibold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      <EditPersonaModal
        persona={isEditingPersona ? persona : null}
        onClose={() => setIsEditingPersona(false)}
        onSave={setPersona}
      />
    </div>
  )
}
