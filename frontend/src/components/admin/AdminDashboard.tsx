import React from 'react'
import { AdminAnalyticsResponse } from '../../services/adminService'
import { Card } from '../common/Card'
import AppLayout from "../../layouts/AppLayout";

interface AdminDashboardProps {
  analytics: AdminAnalyticsResponse
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ analytics }) => {
  return (
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">{analytics.totalUsers}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{analytics.activeUsers}</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{analytics.totalQuizzes}</div>
            <div className="text-sm text-gray-600">Total Quizzes</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{analytics.totalAlgorithms}</div>
            <div className="text-sm text-gray-600">Algorithms</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{analytics.totalDocuments}</div>
            <div className="text-sm text-gray-600">Documents</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600">{analytics.totalCodeReviews}</div>
            <div className="text-sm text-gray-600">Code Reviews</div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-900 font-medium transition-colors">
            👥 Manage Users
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-green-900 font-medium transition-colors">
            📊 View Analytics
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-900 font-medium transition-colors">
            📝 Manage Quizzes
          </button>
          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-orange-900 font-medium transition-colors">
            🔧 Manage Content
          </button>
        </div>
      </Card>

      {/* Recent Activity Summary */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Activity</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">User Growth (30 days)</span>
            <span className="font-semibold text-primary-600">
              {Object.values(analytics.userGrowth).reduce((a, b) => a + b, 0)} new users
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Quiz Attempts (30 days)</span>
            <span className="font-semibold text-green-600">
              {Object.values(analytics.quizAttempts).reduce((a, b) => a + b, 0)} attempts
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Algorithm Completions (30 days)</span>
            <span className="font-semibold text-purple-600">
              {Object.values(analytics.algorithmCompletions).reduce((a, b) => a + b, 0)} completions
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Study Hours (30 days)</span>
            <span className="font-semibold text-blue-600">
              {Object.values(analytics.studyHours).reduce((a, b) => a + b, 0)} hours
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}
