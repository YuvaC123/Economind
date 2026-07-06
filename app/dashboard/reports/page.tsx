'use client'

import { Button } from '@/components/ui/button'
import { FileText, Download, Share2, Trash2 } from 'lucide-react'

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      title: 'Q4 Consumer Behavior Analysis',
      date: '2 days ago',
      type: 'Research Report',
      pages: 24,
    },
    {
      id: 2,
      title: 'Inflation Impact Study - Sarah Chen',
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Reports</h2>
        <p className="text-muted-foreground">Generated research reports and analyses</p>
      </div>

      <div className="flex gap-2">
        <Button className="gap-2">
          <FileText className="w-4 h-4" />
          Generate Report
        </Button>
      </div>

      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="card-glass">
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
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
