'use client'

import { Persona } from '@/lib/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Briefcase, Home, TrendingUp } from 'lucide-react'

interface PersonaConfigCardProps {
  persona: Persona
  onEdit?: () => void
}

export function PersonaConfigCard({ persona, onEdit }: PersonaConfigCardProps) {
  const stats = [
    { icon: User, label: 'Age', value: `${persona.age} yrs` },
    { icon: Briefcase, label: 'Income', value: `$${(persona.income / 1000).toFixed(0)}K` },
    { icon: Home, label: 'Wealth', value: `$${(persona.wealth / 1000).toFixed(0)}K` },
    { icon: TrendingUp, label: 'Savings', value: `$${(persona.savings / 1000).toFixed(0)}K` },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                {persona.name.charAt(0)}
              </div>
              {persona.name}
            </CardTitle>
            <CardDescription>Consumer Profile</CardDescription>
          </div>
          <button
            onClick={onEdit}
            className="text-xs px-3 py-1.5 rounded-lg border border-border cursor-pointer hover:bg-primary/10 hover:border-primary/30 hover:text-primary active:scale-95 transition-all duration-150 hover-glow"
          >
            Edit
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Demographics */}
        <div>
          <h4 className="text-sm font-semibold mb-1 text-muted-foreground">Demographics</h4>
          <div className="divide-y divide-border">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="flex items-center gap-3 py-2.5">
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <p className="text-sm text-muted-foreground flex-1">{stat.label}</p>
                  <p className="text-sm font-mono font-semibold">{stat.value}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Preferences</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{persona.education.replace('-', ' ')}</Badge>
            <Badge variant="outline">{persona.riskAppetite} risk</Badge>
            <Badge variant="outline">{persona.spendingBehavior}</Badge>
            <Badge variant="outline">{persona.investmentPreference}</Badge>
          </div>
        </div>

        {/* Financial Overview */}
        <div>
          <h4 className="text-sm font-semibold mb-1 text-muted-foreground">Financial Overview</h4>
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between py-2.5">
              <p className="text-sm text-muted-foreground">Monthly Expenses</p>
              <p className="text-sm font-mono font-semibold">${(persona.monthlyExpenses / 1000).toFixed(1)}K</p>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <p className="text-sm text-muted-foreground">Current Debt</p>
              <p className="text-sm font-mono font-semibold">${(persona.debt / 1000).toFixed(1)}K</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
