'use client'

import { BarChart3, LineChart, PieChart } from 'lucide-react'
import { StatCard } from '@/components/shared/stat-card'
import { MiniBarChart } from '@/components/charts/mini-bar-chart'
import { MiniLineChart } from '@/components/charts/mini-line-chart'
import { MiniDonutChart } from '@/components/charts/mini-donut-chart'

const SPENDING_DISTRIBUTION = [
  { label: 'Housing', value: 32 },
  { label: 'Food', value: 18 },
  { label: 'Transport', value: 12 },
  { label: 'Entertainment', value: 10 },
  { label: 'Savings', value: 28 },
]

const SAVINGS_TREND = [
  { label: 'Jan', value: 14.2 },
  { label: 'Feb', value: 15.1 },
  { label: 'Mar', value: 14.8 },
  { label: 'Apr', value: 16.3 },
  { label: 'May', value: 17.5 },
  { label: 'Jun', value: 18.5 },
]

const INVESTMENT_ALLOCATION = [
  { label: 'Stocks', value: 45 },
  { label: 'Bonds', value: 25 },
  { label: 'Real Estate', value: 20 },
  { label: 'Cash', value: 10 },
]

const CONSUMER_COMPARISON = [
  { label: 'Sarah C.', value: 3240 },
  { label: 'John S.', value: 4180 },
  { label: 'Emma W.', value: 2650 },
]

const INDICATOR_TIMELINE = [
  { label: 'Jan', value: 2.1 },
  { label: 'Feb', value: 2.4 },
  { label: 'Mar', value: 2.8 },
  { label: 'Apr', value: 3.1 },
  { label: 'May', value: 2.9 },
  { label: 'Jun', value: 2.5 },
]

const CONFIDENCE_SCORES = [
  { label: 'Spending', value: 82 },
  { label: 'Saving', value: 74 },
  { label: 'Borrowing', value: 51 },
  { label: 'Investing', value: 68 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Analytics Dashboard</h2>
        <p className="text-muted-foreground">
          Comprehensive analysis of consumer behavior patterns and trends
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={BarChart3} label="Avg. Spending" value="$3,240" change="+12%" changePositive />
        <StatCard icon={LineChart} label="Savings Rate" value="18.5%" change="+2.3%" changePositive />
        <StatCard
          icon={PieChart}
          label="Investment Alloc."
          value="42%"
          change="-5%"
          changePositive={false}
        />
        <StatCard icon={BarChart3} label="Risk Score" value="6.2/10" change="Moderate" changePositive />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-glass">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-4 h-4 text-primary" />
            <h3 className="font-medium">Spending Distribution</h3>
          </div>
          <MiniDonutChart data={SPENDING_DISTRIBUTION} />
        </div>

        <div className="card-glass">
          <div className="flex items-center gap-2 mb-4">
            <LineChart className="w-4 h-4 text-primary" />
            <h3 className="font-medium">Savings Trend</h3>
          </div>
          <MiniLineChart data={SAVINGS_TREND} formatValue={(v) => `${v.toFixed(1)}%`} />
        </div>

        <div className="card-glass">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-4 h-4 text-primary" />
            <h3 className="font-medium">Investment Allocation</h3>
          </div>
          <MiniDonutChart data={INVESTMENT_ALLOCATION} />
        </div>

        <div className="card-glass">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="font-medium">Consumer Comparison</h3>
          </div>
          <MiniBarChart data={CONSUMER_COMPARISON} formatValue={(v) => `$${v.toLocaleString()}`} />
        </div>

        <div className="card-glass">
          <div className="flex items-center gap-2 mb-4">
            <LineChart className="w-4 h-4 text-primary" />
            <h3 className="font-medium">Economic Indicators Timeline</h3>
          </div>
          <MiniLineChart data={INDICATOR_TIMELINE} formatValue={(v) => `${v.toFixed(1)}% inflation`} />
        </div>

        <div className="card-glass">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="font-medium">Confidence Scores</h3>
          </div>
          <MiniBarChart data={CONFIDENCE_SCORES} formatValue={(v) => `${v}%`} />
        </div>
      </div>
    </div>
  )
}
