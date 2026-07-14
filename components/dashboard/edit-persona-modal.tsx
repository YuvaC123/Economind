'use client'

import { useEffect, useState } from 'react'
import { X, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Persona } from '@/lib/mock-data'

interface EditPersonaModalProps {
  persona: Persona | null
  onClose: () => void
  onSave: (updated: Persona) => void
}

const fieldClass =
  'mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary/30'

export function EditPersonaModal({ persona, onClose, onSave }: EditPersonaModalProps) {
  const [form, setForm] = useState<Persona | null>(persona)

  useEffect(() => {
    setForm(persona)
  }, [persona])

  useEffect(() => {
    if (!persona) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [persona, onClose])

  if (!persona || !form) return null

  const update = <K extends keyof Persona>(key: K, value: Persona[K]) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  const handleSave = () => {
    onSave(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        aria-label="Close edit persona"
        className="absolute inset-0 bg-foreground/20 cursor-pointer"
        onClick={onClose}
      />

      <div className="relative bg-card rounded-xl border border-border shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors hover-glow"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="font-semibold mb-1">Edit persona</h3>
        <p className="text-sm text-muted-foreground mb-6">Update demographic and financial details</p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Age</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => update('age', Number(e.target.value))}
                className={fieldClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Risk appetite</label>
              <select
                value={form.riskAppetite}
                onChange={(e) => update('riskAppetite', e.target.value as Persona['riskAppetite'])}
                className={fieldClass}
              >
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Income ($/yr)</label>
              <input
                type="number"
                value={form.income}
                onChange={(e) => update('income', Number(e.target.value))}
                className={fieldClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Wealth ($)</label>
              <input
                type="number"
                value={form.wealth}
                onChange={(e) => update('wealth', Number(e.target.value))}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Savings ($)</label>
              <input
                type="number"
                value={form.savings}
                onChange={(e) => update('savings', Number(e.target.value))}
                className={fieldClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Debt ($)</label>
              <input
                type="number"
                value={form.debt}
                onChange={(e) => update('debt', Number(e.target.value))}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Monthly expenses ($)</label>
            <input
              type="number"
              value={form.monthlyExpenses}
              onChange={(e) => update('monthlyExpenses', Number(e.target.value))}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" className="gap-1.5" onClick={handleSave}>
            <Save className="w-3.5 h-3.5" />
            Save changes
          </Button>
        </div>
      </div>
    </div>
  )
}
