'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Trait {
  name: string
  value: number
  description: string
}

const BEHAVIORAL_TRAITS: Trait[] = [
  {
    name: 'Risk Aversion',
    value: 72,
    description: 'Preference for safe investments',
  },
  {
    name: 'Loss Aversion',
    value: 68,
    description: 'Fear of losing money',
  },
  {
    name: 'Time Preference',
    value: 55,
    description: 'Preference for present over future',
  },
  {
    name: 'Rationality',
    value: 78,
    description: 'Logical decision-making tendency',
  },
  {
    name: 'Herding Behavior',
    value: 45,
    description: 'Following market trends',
  },
  {
    name: 'Overconfidence',
    value: 38,
    description: 'Confidence in decision-making',
  }
]

export function BehavioralTraits() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Behavioral Profile</CardTitle>
        <CardDescription>Psychological factors influencing decisions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {BEHAVIORAL_TRAITS.map((trait) => (
          <div key={trait.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{trait.name}</p>
                <p className="text-xs text-muted-foreground">{trait.description}</p>
              </div>
              <Badge variant="outline">{trait.value}%</Badge>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${trait.value}%` }}
              />
            </div>
          </div>
        ))}

        {/* Summary */}
        <div className="pt-4 border-t border-border mt-6">
          <p className="text-xs text-muted-foreground text-center">
            Risk profile: <span className="font-medium text-primary">Moderate Conservative</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
