'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, Lock, Bell, Database, Check } from 'lucide-react'
import { DEFAULT_PERSONA, PREDEFINED_SCENARIOS } from '@/lib/mock-data'
import { PageTransition } from '@/components/shared/page-transition'

const fieldClass =
  'mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary/30'

export default function SettingsPage() {
  const [email, setEmail] = useState('user@example.com')
  const [username, setUsername] = useState('economist_researcher')
  const [savedAccount, setSavedAccount] = useState(false)

  const [notifyCompletion, setNotifyCompletion] = useState(true)
  const [notifyReports, setNotifyReports] = useState(true)
  const [notifyDigest, setNotifyDigest] = useState(false)
  const [savedPrefs, setSavedPrefs] = useState(false)

  const handleSaveAccount = () => {
    setSavedAccount(true)
    setTimeout(() => setSavedAccount(false), 1800)
  }

  const handleSavePrefs = () => {
    setSavedPrefs(true)
    setTimeout(() => setSavedPrefs(false), 1800)
  }

  const handleExportAll = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      account: { email, username },
      notificationPreferences: {
        simulationCompletion: notifyCompletion,
        reportGeneration: notifyReports,
        weeklyDigest: notifyDigest,
      },
      persona: DEFAULT_PERSONA,
      scenarios: PREDEFINED_SCENARIOS,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `economind-data-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <PageTransition>
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-3xl font-medium mb-1">Settings</h2>
        <p className="text-muted-foreground">Manage your account and application settings</p>
      </div>

      <div className="space-y-6">
        {/* Account Settings */}
        <Card id="account" className="scroll-mt-20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-muted-foreground" />
              Account Settings
            </CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={fieldClass}
              />
            </div>
            <Button className="gap-2" onClick={handleSaveAccount}>
              {savedAccount ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {savedAccount ? 'Saved' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card id="notifications" className="scroll-mt-20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-muted-foreground" />
              Notifications
            </CardTitle>
            <CardDescription>Control notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyCompletion}
                onChange={(e) => setNotifyCompletion(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Email on simulation completion</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyReports}
                onChange={(e) => setNotifyReports(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Report generation notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyDigest}
                onChange={(e) => setNotifyDigest(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Weekly digest</span>
            </label>
            <Button variant="outline" className="gap-2" onClick={handleSavePrefs}>
              {savedPrefs ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {savedPrefs ? 'Saved' : 'Save Preferences'}
            </Button>
          </CardContent>
        </Card>

        {/* Data & Export */}
        <Card id="data-export" className="scroll-mt-20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-4 h-4 text-muted-foreground" />
              Data & Export
            </CardTitle>
            <CardDescription>Manage your data and exports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Export all your personas, simulations, and reports for backup or analysis
            </p>
            <Button variant="outline" className="gap-2 w-full" onClick={handleExportAll}>
              Export All Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
    </PageTransition>
  )
}
