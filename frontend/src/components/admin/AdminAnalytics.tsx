import React from 'react'
import { AdminAnalyticsResponse } from '../../services/adminService'
import { Card } from '../common/Card'

interface AdminAnalyticsProps {
  analytics: AdminAnalyticsResponse
}

export const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ analytics }) => {
  const getMaxValue = (data: Record<string, number>) => {
    const values = Object.values(data)
    return Math.max(...values, 1)
  }

  return (
    <div className="space-y-6">
      {/* User Growth Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth (Last 30 Days)</h3>
        <div className="flex items-end justify-between h-48 px-2 overflow-x-auto">
          {Object.entries(analytics.userGrowth).map(([date, count]) => {
            const maxValue = getMaxValue(analytics.userGrowth)
            const height = (count / maxValue) * 100
            const dayNumber = date.split('-')[2]
            return (
              <div key={date} className="flex flex-col items-center flex-1 min-w-[20px]">
                <div className="text-xs text-gray-600 mb-1">{count}</div>
                <div
                  className="w-full bg-primary-500 rounded-t transition-all duration-300 hover:bg-primary-600"
                  style={{ height: `${Math.max(height, 2)}%` }}
                ></div>
                <div className="text-xs text-gray-600 mt-1">{dayNumber}</div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Quiz Attempts Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Attempts (Last 30 Days)</h3>
        <div className="flex items-end justify-between h-48 px-2 overflow-x-auto">
          {Object.entries(analytics.quizAttempts).map(([date, count]) => {
            const maxValue = getMaxValue(analytics.quizAttempts)
            const height = (count / maxValue) * 100
            const dayNumber = date.split('-')[2]
            return (
              <div key={date} className="flex flex-col items-center flex-1 min-w-[20px]">
                <div className="text-xs text-gray-600 mb-1">{count}</div>
                <div
                  className="w-full bg-green-500 rounded-t transition-all duration-300 hover:bg-green-600"
                  style={{ height: `${Math.max(height, 2)}%` }}
                ></div>
                <div className="text-xs text-gray-600 mt-1">{dayNumber}</div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Algorithm Completions Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Algorithm Completions (Last 30 Days)</h3>
        <div className="flex items-end justify-between h-48 px-2 overflow-x-auto">
          {Object.entries(analytics.algorithmCompletions).map(([date, count]) => {
            const maxValue = getMaxValue(analytics.algorithmCompletions)
            const height = (count / maxValue) * 100
            const dayNumber = date.split('-')[2]
            return (
              <div key={date} className="flex flex-col items-center flex-1 min-w-[20px]">
                <div className="text-xs text-gray-600 mb-1">{count}</div>
                <div
                  className="w-full bg-purple-500 rounded-t transition-all duration-300 hover:bg-purple-600"
                  style={{ height: `${Math.max(height, 2)}%` }}
                ></div>
                <div className="text-xs text-gray-600 mt-1">{dayNumber}</div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Study Hours Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Hours (Last 30 Days)</h3>
        <div className="flex items-end justify-between h-48 px-2 overflow-x-auto">
          {Object.entries(analytics.studyHours).map(([date, hours]) => {
            const maxValue = getMaxValue(analytics.studyHours)
            const height = (hours / maxValue) * 100
            const dayNumber = date.split('-')[2]
            return (
              <div key={date} className="flex flex-col items-center flex-1 min-w-[20px]">
                <div className="text-xs text-gray-600 mb-1">{hours}h</div>
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

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">
              {Object.values(analytics.userGrowth).reduce((a, b) => a + b, 0)}
            </div>
            <div className="text-sm text-gray-600">New Users (30d)</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {Object.values(analytics.quizAttempts).reduce((a, b) => a + b, 0)}
            </div>
            <div className="text-sm text-gray-600">Quiz Attempts (30d)</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {Object.values(analytics.algorithmCompletions).reduce((a, b) => a + b, 0)}
            </div>
            <div className="text-sm text-gray-600">Algorithms (30d)</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {Object.values(analytics.studyHours).reduce((a, b) => a + b, 0)}h
            </div>
            <div className="text-sm text-gray-600">Study Hours (30d)</div>
          </div>
        </Card>
      </div>
    </div>
  )
}
