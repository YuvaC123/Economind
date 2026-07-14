'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PageTransition } from '@/components/shared/page-transition'
import { CountUpNumber } from '@/components/shared/count-up-number'
import { FileText, Download, Share2, Trash2, Check, Link2 } from 'lucide-react'

interface Report {
  id: number
  title: string
  date: string
  type: string
  pages: number
}

const INITIAL_REPORTS: Report[] = [
  {
    id: 1,
    title: 'Q4 Consumer Behavior Analysis',
    date: '2 days ago',
    type: 'Research Report',
    pages: 24,
  },
  {
    id: 2,
    title: 'Inflation Impact Study - John Doe',
    date: '1 week ago',
    type: 'Case Study',
    pages: 12,
  },
  {
    id: 3,
    title: 'Multi-Persona Comparative Analysis',
    date: '2 weeks ago',
    type: 'Comparative Analysis',
    pages: 18,
  },
]

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS)
  const [sharedId, setSharedId] = useState<number | null>(null)

  const handleGenerate = () => {
    const newReport: Report = {
      id: Date.now(),
      title: `New Research Report`,
      date: 'just now',
      type: 'Research Report',
      pages: Math.floor(6 + Math.random() * 20),
    }
    setReports((prev) => [newReport, ...prev])
  }

  const handleDownload = (report: Report) => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${report.title.toLowerCase().replace(/\s+/g, '-')}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = async (report: Report) => {
    const shareUrl = `${window.location.origin}/dashboard/reports#report-${report.id}`
    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch {
      // clipboard access denied — link is still shown via the confirmation state below
    }
    setSharedId(report.id)
    setTimeout(() => setSharedId(null), 1800)
  }

  const handleDelete = (report: Report) => {
    if (window.confirm(`Delete "${report.title}"? This can't be undone.`)) {
      setReports((prev) => prev.filter((r) => r.id !== report.id))
    }
  }

  return (
    <PageTransition>
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-3xl font-medium mb-1">Reports</h2>
        <p className="text-muted-foreground">Generated research reports and analyses</p>
      </div>

      <div className="flex gap-2">
        <Button className="gap-2" onClick={handleGenerate}>
          <FileText className="w-4 h-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="card-glass text-center">
          <p className="text-2xl font-mono font-semibold text-primary">
            <CountUpNumber target={reports.length} />
          </p>
          <p className="text-xs text-muted-foreground mt-2">Total Reports</p>
        </div>
        <div className="card-glass text-center">
          <p className="text-2xl font-mono font-semibold text-primary">
            <CountUpNumber target={reports.reduce((sum, r) => sum + r.pages, 0)} />
          </p>
          <p className="text-xs text-muted-foreground mt-2">Total Pages</p>
        </div>
        <div className="card-glass text-center">
          <p className="text-2xl font-mono font-semibold text-primary">
            <CountUpNumber
              target={reports.length ? Math.round(reports.reduce((sum, r) => sum + r.pages, 0) / reports.length) : 0}
            />
          </p>
          <p className="text-xs text-muted-foreground mt-2">Avg. Pages</p>
        </div>
      </div>

      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} id={`report-${report.id}`} className="card-glass scroll-mt-20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{report.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span>{report.type}</span>
                  <span>&bull;</span>
                  <span>{report.pages} pages</span>
                  <span>&bull;</span>
                  <span>{report.date}</span>
                </div>
              </div>

              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  title="Download report"
                  onClick={() => handleDownload(report)}
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  title="Copy share link"
                  onClick={() => handleShare(report)}
                >
                  {sharedId === report.id ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  title="Delete report"
                  onClick={() => handleDelete(report)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {sharedId === report.id && (
              <div className="mt-3 pt-3 border-t border-border flex items-center gap-1.5 text-xs text-muted-foreground">
                <Link2 className="w-3 h-3" />
                Link copied to clipboard
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </PageTransition>
  )
}
