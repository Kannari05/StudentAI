import React from 'react'
import { ProgressSummaryResponse } from '../../services/progressService'
import { Card } from '../common/Card'

interface ProgressChartsProps {
  summary: ProgressSummaryResponse
}

export const ProgressCharts: React.FC<ProgressChartsProps> = ({ summary }) => {
  const formatMinutes = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`
    }
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const getMaxValue = (data: Record<string, number>) => {
    const values = Object.values(data)
    return Math.max(...values, 1)
  }

  return (
    <div className="space-y-6">
      {/* Weekly Progress Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress (Last 7 Days)</h3>
        <div className="flex items-end justify-between h-48 px-4">
          {Object.entries(summary.weeklyProgress).map(([day, minutes]) => {
            const maxValue = getMaxValue(summary.weeklyProgress)
            const height = (minutes / maxValue) * 100
            return (
              <div key={day} className="flex flex-col items-center flex-1">
                <div className="text-xs text-gray-600 mb-2">{formatMinutes(minutes)}</div>
                <div
                  className="w-full bg-primary-500 rounded-t transition-all duration-300 hover:bg-primary-600"
                  style={{ height: `${Math.max(height, 2)}%` }}
                ></div>
                <div className="text-xs text-gray-600 mt-2 font-medium">{day}</div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Monthly Progress Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Progress (Last 30 Days)</h3>
        <div className="flex items-end justify-between h-48 px-2 overflow-x-auto">
          {Object.entries(summary.monthlyProgress).map(([date, minutes]) => {
            const maxValue = getMaxValue(summary.monthlyProgress)
            const height = (minutes / maxValue) * 100
            const dayNumber = date.split('-')[2]
            return (
              <div key={date} className="flex flex-col items-center flex-1 min-w-[20px]">
                <div
                  className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                  style={{ height: `${Math.max(height, 2)}%` }}
                ></div>
                <div className="text-xs text-gray-600 mt-1">{dayNumber}</div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Study Time Summary */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Time Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {formatMinutes(Object.values(summary.weeklyProgress).reduce((a, b) => a + b, 0))}
            </div>
            <div className="text-sm text-gray-600">This Week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatMinutes(Object.values(summary.monthlyProgress).reduce((a, b) => a + b, 0))}
            </div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatMinutes(Math.round(Object.values(summary.monthlyProgress).reduce((a, b) => a + b, 0) / 30))}
            </div>
            <div className="text-sm text-gray-600">Daily Avg</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
