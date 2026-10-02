import React from 'react'
import { ProgressSummaryResponse } from '../../services/progressService'
import { Card } from '../common/Card'

interface ProgressDashboardProps {
  summary: ProgressSummaryResponse
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ summary }) => {
  const formatHours = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)}m`
    }
    return `${hours}h`
  }

  const getActivityLabel = (activity: string) => {
    switch (activity) {
      case 'ALGORITHM': return 'Algorithms'
      case 'QUIZ': return 'Quizzes'
      case 'CHAT': return 'Chat'
      case 'PROGRAMMING_TUTOR': return 'Programming'
      case 'RAG': return 'RAG'
      case 'CODE_REVIEW': return 'Code Review'
      default: return activity
    }
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">{summary.totalAlgorithmsCompleted}</div>
            <div className="text-sm text-gray-600">Algorithms Completed</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{summary.averageQuizScore.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Avg Quiz Score</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{formatHours(summary.totalStudyHours)}</div>
            <div className="text-sm text-gray-600">Total Study Time</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{summary.currentStreak}🔥</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
        </Card>
      </div>

      {/* Topics Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weak Topics */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weak Topics</h3>
          {summary.weakTopics.length > 0 ? (
            <div className="space-y-2">
              {summary.weakTopics.map((topic, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-red-500">⚠️</span>
                  <span className="text-gray-700">{topic}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No weak topics identified yet</p>
          )}
        </Card>

        {/* Strong Topics */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Strong Topics</h3>
          {summary.strongTopics.length > 0 ? (
            <div className="space-y-2">
              {summary.strongTopics.map((topic, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-green-500">✅</span>
                  <span className="text-gray-700">{topic}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No strong topics identified yet</p>
          )}
        </Card>
      </div>

      {/* Activity Breakdown */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(summary.activityBreakdown).map(([activity, count]) => (
            <div key={activity}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{getActivityLabel(activity)}</span>
                <span className="font-medium">{count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{
                    width: `${(count / Math.max(...Object.values(summary.activityBreakdown))) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
