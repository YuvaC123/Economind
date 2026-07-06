'use client'

import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TutorialButton } from '@/components/dashboard/tutorial-modal'
import { NotificationsButton } from '@/components/layouts/notifications-button'
import { ExportButton } from '@/components/layouts/export-button'
import { SettingsMenu } from '@/components/layouts/settings-menu'

interface TopNavProps {
  onRunSimulation?: () => void
}

export function TopNav({ onRunSimulation }: TopNavProps) {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-30 border-b border-border bg-white h-16"
      style={{ left: 'var(--sidebar-width, 280px)' }}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full border border-border text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Live</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <TutorialButton />

          <NotificationsButton />

          <ExportButton />

          <div className="w-px h-6 bg-border hidden sm:block" />

          <Button onClick={onRunSimulation} className="gap-2 hidden sm:flex" size="sm">
            <Play className="w-4 h-4" />
            Run Simulation
          </Button>

          <SettingsMenu />
        </div>
      </div>
    </header>
  )
}
