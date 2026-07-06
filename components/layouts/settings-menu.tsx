'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Settings, User, Bell, Database, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MENU_ITEMS = [
  { icon: User, label: 'Account', href: '/dashboard/settings#account' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/settings#notifications' },
  { icon: Database, label: 'Data & export', href: '/dashboard/settings#data-export' },
]

export function SettingsMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <Button variant="ghost" size="icon" title="Settings" onClick={() => setOpen((o) => !o)}>
        <Settings className="w-4 h-4" />
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl border border-border shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold">Settings</p>
          </div>
          <div className="py-1.5">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors duration-150"
              >
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="border-t border-border py-1.5">
            <Link
              href="/dashboard/settings"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 text-sm text-primary hover:bg-muted transition-colors duration-150"
            >
              <span>All settings</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
