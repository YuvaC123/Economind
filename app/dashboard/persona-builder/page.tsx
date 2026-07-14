'use client'

import { useState } from 'react'
import { Reorder } from 'framer-motion'
import { BehavioralTraits } from '@/components/dashboard/behavioral-traits'
import { EditPersonaModal } from '@/components/dashboard/edit-persona-modal'
import { PageTransition } from '@/components/shared/page-transition'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react'
import { Persona } from '@/lib/mock-data'

const INITIAL_PERSONAS: Persona[] = [
  {
    id: 'persona-2',
    name: 'John Doe',
    age: 35,
    gender: 'male',
    education: 'masters',
    income: 85000,
    wealth: 250000,
    savings: 45000,
    debt: 15000,
    monthlyExpenses: 3500,
    riskAppetite: 'moderate',
    spendingBehavior: 'balanced',
    savingPreference: 'retirement',
    investmentPreference: 'diversified',
  },
  {
    id: 'persona-3',
    name: 'John Smith',
    age: 42,
    gender: 'male',
    education: 'bachelors',
    income: 120000,
    wealth: 410000,
    savings: 60000,
    debt: 35000,
    monthlyExpenses: 4800,
    riskAppetite: 'aggressive',
    spendingBehavior: 'lavish',
    savingPreference: 'investment',
    investmentPreference: 'stocks',
  },
  {
    id: 'persona-4',
    name: 'Emma Wilson',
    age: 28,
    gender: 'female',
    education: 'bachelors',
    income: 65000,
    wealth: 90000,
    savings: 22000,
    debt: 8000,
    monthlyExpenses: 2600,
    riskAppetite: 'conservative',
    spendingBehavior: 'frugal',
    savingPreference: 'emergency',
    investmentPreference: 'bonds',
  },
]

export default function PersonaBuilderPage() {
  const [personas, setPersonas] = useState<Persona[]>(INITIAL_PERSONAS)
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null)

  const handleSave = (updated: Persona) => {
    setPersonas((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
  }

  const handleDelete = (persona: Persona) => {
    if (window.confirm(`Delete ${persona.name}? This can't be undone.`)) {
      setPersonas((prev) => prev.filter((p) => p.id !== persona.id))
    }
  }

  const handleNewPersona = () => {
    const newPersona: Persona = {
      id: `persona-${Date.now()}`,
      name: 'New Persona',
      age: 30,
      gender: 'other',
      education: 'bachelors',
      income: 60000,
      wealth: 50000,
      savings: 10000,
      debt: 5000,
      monthlyExpenses: 3000,
      riskAppetite: 'moderate',
      spendingBehavior: 'balanced',
      savingPreference: 'retirement',
      investmentPreference: 'diversified',
    }
    setPersonas((prev) => [...prev, newPersona])
    setEditingPersona(newPersona)
  }

  return (
    <PageTransition>
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-3xl font-medium mb-1">Persona Builder</h2>
        <p className="text-muted-foreground">Create and manage consumer personas for simulations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personas List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between gap-2 mb-4">
            <Button className="gap-2" onClick={handleNewPersona}>
              <Plus className="w-4 h-4" />
              New Persona
            </Button>
            <p className="text-xs text-muted-foreground hidden sm:block">Drag to reorder</p>
          </div>

          <Reorder.Group axis="y" values={personas} onReorder={setPersonas} className="grid gap-4">
            {personas.map((persona) => (
              <Reorder.Item
                key={persona.id}
                value={persona}
                className="card-interactive cursor-grab active:cursor-grabbing"
                whileDrag={{ scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 10 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                      {persona.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium">{persona.name}</h3>
                      <p className="text-sm text-muted-foreground font-mono">
                        Age: {persona.age} &bull; Income: ${(persona.income / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Edit persona"
                      onClick={() => setEditingPersona(persona)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Delete persona"
                      onClick={() => handleDelete(persona)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>

        {/* Behavioral Traits Sidebar */}
        <div className="lg:col-span-1">
          <BehavioralTraits />
        </div>
      </div>

      <EditPersonaModal
        persona={editingPersona}
        onClose={() => setEditingPersona(null)}
        onSave={handleSave}
      />
    </div>
    </PageTransition>
  )
}
