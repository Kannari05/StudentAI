import React, { useState } from 'react'
import { codeReviewService, CodeReviewRequest } from '../../services/codeReviewService'
import { Card } from '../common/Card'
import { Button } from '../common/Button'

interface CodeReviewInputProps {
  onReviewComplete: (review: any) => void
}

export const CodeReviewInput: React.FC<CodeReviewInputProps> = ({ onReviewComplete }) => {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState<'JAVA' | 'PYTHON' | 'CPP' | 'JAVASCRIPT'>('JAVA')
  const [reviewing, setReviewing] = useState(false)

  const handleReview = async () => {
    if (!code.trim()) {
      alert('Please enter code to review')
      return
    }

    setReviewing(true)
    try {
      const request: CodeReviewRequest = {
        code: code.trim(),
        language,
      }
      const review = await codeReviewService.reviewCode(request)
      onReviewComplete(review)
    } catch (error) {
      console.error('Code review failed:', error)
      alert('Failed to review code. Please try again.')
    } finally {
      setReviewing(false)
    }
  }

  const handleClear = () => {
    setCode('')
  }

  const getLanguageIcon = (lang: string) => {
    switch (lang) {
      case 'JAVA': return '☕'
      case 'PYTHON': return '🐍'
      case 'CPP': return '⚡'
      case 'JAVASCRIPT': return '📜'
      default: return '💻'
    }
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Code Review</h3>
      
      <div className="space-y-4">
        {/* Language Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Programming Language</label>
          <div className="grid grid-cols-4 gap-2">
            {(['JAVA', 'PYTHON', 'CPP', 'JAVASCRIPT'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  language === lang
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-2xl mb-1">{getLanguageIcon(lang)}</div>
                <div className="text-xs font-medium">{lang}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Code Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Paste Your Code</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`Paste your ${language} code here...`}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none h-64 font-mono text-sm bg-gray-900 text-green-400"
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button
            onClick={handleReview}
            disabled={reviewing || !code.trim()}
            className="flex-1"
          >
            {reviewing ? 'Reviewing Code...' : 'Review Code'}
          </Button>
          <Button
            onClick={handleClear}
            disabled={reviewing}
            variant="secondary"
          >
            Clear
          </Button>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">💡 Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Paste complete functions or classes for better analysis</li>
            <li>• Include relevant imports and dependencies</li>
            <li>• The AI will analyze bugs, complexity, and suggest improvements</li>
            <li>• Optimized and cleaner implementations will be provided</li>
          </ul>
        </div>
      </div>
    </Card>
  )
}
