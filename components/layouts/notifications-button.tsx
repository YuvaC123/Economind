'use client'

import { useEffect, useRef, useState } from 'react'
import { Bell, CheckCircle2, TrendingUp, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NOTIFICATIONS = [
  {
    icon: CheckCircle2,
    title: 'Simulation completed',
    detail: 'Sarah Chen under Low Inflation Economy finished with 87% accuracy',
    time: '2h ago',
    unread: true,
  },
  {
    icon: FileText,
    title: 'Report generated',
    detail: 'Q4 Consumer Behavior Analysis is ready to view',
    time: '1d ago',
    unread: true,
  },
  {
    icon: TrendingUp,
    title: 'Market confidence shifted',
    detail: 'AI Revolution Boom scenario confidence rose to 85',
    time: '2d ago',
    unread: false,
  },
]

export function NotificationsButton() {
  const [open, setOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(
    NOTIFICATIONS.filter((n) => n.unread).length
  )
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
      <Button
        variant="ghost"
        size="icon"
        title="Notifications"
        onClick={() => {
          setOpen((o) => !o)
          if (!open) setUnreadCount(0)
        }}
        className="relative"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary" />
        )}
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-border shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold">Notifications</p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {NOTIFICATIONS.map((n) => (
              <div
                key={n.title}
                className="flex items-start gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted transition-colors duration-150"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <n.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.detail}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
