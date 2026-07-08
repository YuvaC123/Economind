'use client'

import { MacroeconomicEnvironment, ECONOMIC_INDICATORS } from '@/lib/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'

interface MacroeconomicCardProps {
  macro: MacroeconomicEnvironment
  onChange?: (key: keyof MacroeconomicEnvironment, value: number) => void
  readOnly?: boolean
}

export function MacroeconomicCard({ macro, onChange, readOnly = false }: MacroeconomicCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Macroeconomic Environment</CardTitle>
        <CardDescription>Current economic indicators and market conditions</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {ECONOMIC_INDICATORS.map((indicator) => {
            const value = macro[indicator.key as keyof MacroeconomicEnvironment]

            return (
              <div key={indicator.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">{indicator.label}</label>
                  <span className="text-sm font-semibold">
                    {typeof value === 'number' ? value.toFixed(1) : value}
                  </span>
                </div>

                {!readOnly ? (
                  <Slider
                    value={[typeof value === 'number' ? value : 0]}
                    onValueChange={(val: number | readonly number[]) =>
                      onChange?.(
                        indicator.key as keyof MacroeconomicEnvironment,
                        Array.isArray(val) ? val[0] : (val as number)
                      )
                    }
                    min={indicator.min}
                    max={indicator.max}
                    step={indicator.step}
                  />
                ) : (
                  <div className="h-1.5 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{
                        width: `${
                          ((typeof value === 'number' ? value : 0) - indicator.min) /
                          (indicator.max - indicator.min) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-border p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Avg. Inflation</p>
            <p className="text-lg font-semibold text-primary">{macro.inflation.toFixed(1)}%</p>
          </div>
          <div className="rounded-lg border border-border p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">GDP Growth</p>
            <p className="text-lg font-semibold text-primary">{macro.gdpGrowth.toFixed(1)}%</p>
          </div>
          <div className="rounded-lg border border-border p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Confidence</p>
            <p className="text-lg font-semibold text-primary">{macro.marketConfidence.toFixed(0)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
