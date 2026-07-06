'use client'

import { BehavioralTraits } from '@/components/dashboard/behavioral-traits'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2 } from 'lucide-react'

export default function PersonaBuilderPage() {
  const personas = [
    { id: 1, name: 'Sarah Chen', age: 35, income: 85000 },
    { id: 2, name: 'John Smith', age: 42, income: 120000 },
    { id: 3, name: 'Emma Wilson', age: 28, income: 65000 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Persona Builder</h2>
        <p className="text-muted-foreground">Create and manage consumer personas for simulations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personas List */}
        <div className="lg:col-span-2">
          <div className="flex gap-2 mb-4">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Persona
            </Button>
          </div>

          <div className="grid gap-4">
            {personas.map((persona) => (
              <div key={persona.id} className="card-glass">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                      {persona.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium">{persona.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Age: {persona.age} &bull; Income: ${(persona.income / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Behavioral Traits Sidebar */}
        <div className="lg:col-span-1">
          <BehavioralTraits />
        </div>
      </div>
    </div>
  )
}
