import React from 'react'
import { CodeReview } from '../../services/codeReviewService'
import { Card } from '../common/Card'
import { Button } from '../common/Button'

interface CodeReviewResultsProps {
  review: CodeReview
  onNewReview: () => void
}

export const CodeReviewResults: React.FC<CodeReviewResultsProps> = ({ review, onNewReview }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-300'
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'LOW': return 'bg-green-100 text-green-800 border-green-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'HIGH': return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'MEDIUM': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'LOW': return 'bg-gray-100 text-gray-800 border-gray-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Summary */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Overall Summary</h3>
        <p className="text-gray-700">{review.overallSummary}</p>
      </Card>

      {/* Function Explanations */}
      {review.functionExplanations && review.functionExplanations.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Function Explanations</h3>
          <div className="space-y-4">
            {review.functionExplanations.map((func, index) => (
              <div key={index} className="border-l-4 border-primary-500 pl-4">
                <h4 className="font-semibold text-gray-900">{func.functionName}</h4>
                <p className="text-sm text-gray-600 mt-1">{func.explanation}</p>
                <div className="mt-2 text-xs text-gray-500">
                  <span className="inline-block bg-gray-100 px-2 py-1 rounded mr-2">
                    Parameters: {func.parameters}
                  </span>
                  <span className="inline-block bg-gray-100 px-2 py-1 rounded">
                    Returns: {func.returnType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Bugs Found */}
      {review.bugsFound && review.bugsFound.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Bugs Found ({review.bugsFound.length})
          </h3>
          <div className="space-y-3">
            {review.bugsFound.map((bug, index) => (
              <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{bug.description}</h4>
                    <p className="text-sm text-gray-600 mt-1">Location: {bug.location}</p>
                    <p className="text-sm text-gray-700 mt-2">Fix: {bug.fix}</p>
                  </div>
                  <span className={`ml-4 px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(bug.severity)}`}>
                    {bug.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Improvements */}
      {review.improvements && review.improvements.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Improvements ({review.improvements.length})
          </h3>
          <div className="space-y-3">
            {review.improvements.map((improvement, index) => (
              <div key={index} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{improvement.description}</h4>
                    <p className="text-sm text-gray-600 mt-1">Location: {improvement.location}</p>
                    <p className="text-sm text-gray-700 mt-2">Suggestion: {improvement.suggestion}</p>
                  </div>
                  <span className={`ml-4 px-3 py-1 rounded-full text-xs font-medium border ${getImpactColor(improvement.impact)}`}>
                    {improvement.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Complexity Analysis */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Complexity Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Time Complexity */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Time Complexity</h4>
            {review.timeComplexity && Object.keys(review.timeComplexity).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(review.timeComplexity).map(([func, complexity]) => (
                  <div key={func} className="flex justify-between text-sm">
                    <span className="text-gray-600">{func}</span>
                    <span className="font-mono font-medium text-primary-600">{complexity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No time complexity data available</p>
            )}
          </div>

          {/* Space Complexity */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Space Complexity</h4>
            {review.spaceComplexity && Object.keys(review.spaceComplexity).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(review.spaceComplexity).map(([func, complexity]) => (
                  <div key={func} className="flex justify-between text-sm">
                    <span className="text-gray-600">{func}</span>
                    <span className="font-mono font-medium text-primary-600">{complexity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No space complexity data available</p>
            )}
          </div>
        </div>
      </Card>

      {/* Optimized Code */}
      {review.optimizedCode && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimized Code</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{review.optimizedCode}</pre>
          </div>
        </Card>
      )}

      {/* Cleaner Implementation */}
      {review.cleanerImplementation && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cleaner Implementation</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{review.cleanerImplementation}</pre>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex space-x-4">
        <Button onClick={onNewReview} className="flex-1">
          Review New Code
        </Button>
      </div>
    </div>
  )
}
