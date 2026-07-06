'use client'

import { PREDEFINED_SCENARIOS } from '@/lib/mock-data'
import { ScenarioBuilder } from '@/components/dashboard/scenario-builder'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'

export default function ScenariosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Economic Scenarios</h2>
        <p className="text-muted-foreground">
          Predefined and custom economic scenarios for testing consumer behavior
        </p>
      </div>

      {/* Scenario Builder */}
      <div className="card-glass">
        <ScenarioBuilder />
      </div>

      <div>
        <h3 className="text-base font-semibold mb-4">Predefined Scenarios</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PREDEFINED_SCENARIOS.map((scenario) => (
          <Card key={scenario.id} className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>{scenario.name}</CardTitle>
              <CardDescription>{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-border p-2">
                    <p className="text-xs text-muted-foreground">Inflation</p>
                    <p className="font-semibold text-sm">{scenario.macro.inflation.toFixed(1)}%</p>
                  </div>
                  <div className="rounded-lg border border-border p-2">
                    <p className="text-xs text-muted-foreground">GDP Growth</p>
                    <p className="font-semibold text-sm">{scenario.macro.gdpGrowth.toFixed(1)}%</p>
                  </div>
                  <div className="rounded-lg border border-border p-2">
                    <p className="text-xs text-muted-foreground">Unemployment</p>
                    <p className="font-semibold text-sm">{scenario.macro.unemployment.toFixed(1)}%</p>
                  </div>
                  <div className="rounded-lg border border-border p-2">
                    <p className="text-xs text-muted-foreground">Market Conf.</p>
                    <p className="font-semibold text-sm">{scenario.macro.marketConfidence.toFixed(0)}</p>
                  </div>
                </div>
              </div>

              <Button className="w-full gap-2" size="sm">
                <Play className="w-4 h-4" />
                Use Scenario
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
