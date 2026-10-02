import React, { useState, useEffect } from 'react'
import { quizService, QuizData, QuizAttemptData } from '../services/quizService'
import { Target, Trophy, ArrowRight, CheckCircle2, AlertCircle, Sparkles, HelpCircle } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export const Quiz: React.FC = () => {
  const [quizzes, setQuizzes] = useState<QuizData[]>([])
  const [activeQuiz, setActiveQuiz] = useState<QuizData | null>(null)
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [quizFinished, setQuizFinished] = useState(false)
  const [attemptResult, setAttemptResult] = useState<QuizAttemptData | null>(null)

  const sampleQuizzes: QuizData[] = [
    {
      id: 1,
      topic: 'Data Structures & Algorithms',
      difficulty: 'Medium',
      questionsJson: [
        JSON.stringify({ id: 1, question: 'What is the average time complexity of QuickSort?', options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(1)'], correctAnswer: 1 }),
        JSON.stringify({ id: 2, question: 'Which data structure works on LIFO (Last In First Out)?', options: ['Queue', 'Stack', 'Tree', 'Graph'], correctAnswer: 1 }),
        JSON.stringify({ id: 3, question: 'What is the worst-case space complexity of Depth First Search on a tree of height H?', options: ['O(1)', 'O(H)', 'O(V+E)', 'O(2^H)'], correctAnswer: 1 }),
      ],
    },
    {
      id: 2,
      topic: 'Java & Object Oriented Design',
      difficulty: 'Easy',
      questionsJson: [
        JSON.stringify({ id: 1, question: 'Which keyword is used to inherit a class in Java?', options: ['implements', 'extends', 'inherits', 'using'], correctAnswer: 1 }),
        JSON.stringify({ id: 2, question: 'What is the default value of a boolean variable in Java?', options: ['true', 'false', 'null', '0'], correctAnswer: 1 }),
      ],
    },
    {
      id: 3,
      topic: 'React & Frontend Architecture',
      difficulty: 'Medium',
      questionsJson: [
        JSON.stringify({ id: 1, question: 'Which hook is used for side-effects in React?', options: ['useState', 'useContext', 'useEffect', 'useReducer'], correctAnswer: 2 }),
        JSON.stringify({ id: 2, question: 'What is the purpose of React keys in lists?', options: ['Styling', 'State persistence', 'Efficient DOM re-rendering', 'Routing'], correctAnswer: 2 }),
      ],
    },
  ]

  useEffect(() => {
    quizService.getQuizzes()
      .then((data) => {
        if (data && data.length > 0) setQuizzes(data)
        else setQuizzes(sampleQuizzes)
      })
      .catch(() => setQuizzes(sampleQuizzes))
  }, [])

  const startQuiz = (quiz: QuizData) => {
    setActiveQuiz(quiz)
    setCurrentQuestionIdx(0)
    setSelectedAnswers({})
    setQuizFinished(false)
    setAttemptResult(null)
  }

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (quizFinished) return
    setSelectedAnswers((prev) => ({ ...prev, [questionIdx]: optionIdx }))
  }

  const handleSubmitQuiz = async () => {
    if (!activeQuiz) return
    const questions = activeQuiz.questionsJson.map((q) => (typeof q === 'string' ? JSON.parse(q) : q))
    let correctCount = 0
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++
      }
    })

    try {
      const res = await quizService.submitAttempt(activeQuiz.id, correctCount, questions.length)
      setAttemptResult(res)
    } catch (err) {
      setAttemptResult({
        id: Date.now(),
        quizId: activeQuiz.id,
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        scorePercentage: (correctCount / questions.length) * 100,
        feedback: correctCount === questions.length ? '🌟 Perfect score! Masterful understanding.' : 'Good effort! Review the missed questions to strengthen concepts.',
      })
    }
    setQuizFinished(true)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Quiz Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Target size={14} className="text-purple-400" />
              <span>Interactive Knowledge Evaluation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Quiz <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Mastery</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Test your understanding across Data Structures, Java, and CS fundamentals with instant AI scoring and concept explanations.
            </p>
          </div>

          {activeQuiz && (
            <Button
              variant="outline"
              size="md"
              onClick={() => setActiveQuiz(null)}
            >
              ← Back to Quizzes
            </Button>
          )}
        </div>
      </div>

      {!activeQuiz ? (
        /* Quiz Selection Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => {
            const qCount = quiz.questionsJson ? quiz.questionsJson.length : 0
            return (
              <Card key={quiz.id} variant="glass" className="p-6 flex flex-col justify-between space-y-5 hover:border-indigo-500/50">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {quiz.difficulty}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{qCount} Questions</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{quiz.topic}</h3>
                </div>

                <Button
                  variant="gradient"
                  size="md"
                  onClick={() => startQuiz(quiz)}
                  className="w-full"
                >
                  <span>Start Quiz Now</span>
                  <ArrowRight size={16} />
                </Button>
              </Card>
            )
          })}
        </div>
      ) : (
        /* Active Quiz Interface */
        <Card variant="glass" className="max-w-3xl mx-auto p-6 sm:p-8 space-y-6 border-indigo-500/30">
          {!quizFinished ? (
            (() => {
              const questions = activeQuiz.questionsJson.map((q) => (typeof q === 'string' ? JSON.parse(q) : q))
              const currentQ = questions[currentQuestionIdx]
              const progressPct = ((currentQuestionIdx + 1) / questions.length) * 100

              return (
                <div className="space-y-6">
                  {/* Progress Info */}
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-2">
                      <HelpCircle size={16} className="text-indigo-400" />
                      Question {currentQuestionIdx + 1} of {questions.length}
                    </span>
                    <span className="text-indigo-400">{activeQuiz.topic}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    ></div>
                  </div>

                  {/* Question Text */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                      {currentQ.question}
                    </h2>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQ.options.map((opt: string, optIdx: number) => {
                      const isSelected = selectedAnswers[currentQuestionIdx] === optIdx
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(currentQuestionIdx, optIdx)}
                          className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-between ${
                            isSelected
                              ? 'bg-indigo-600/25 border-indigo-500 text-white shadow-lg glow-indigo'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                              isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            {opt}
                          </span>
                          {isSelected && <CheckCircle2 size={18} className="text-indigo-400 shrink-0" />}
                        </button>
                      )
                    })}
                  </div>

                  {/* Nav Controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                      disabled={currentQuestionIdx === 0}
                    >
                      Previous
                    </Button>

                    {currentQuestionIdx < questions.length - 1 ? (
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => setCurrentQuestionIdx((prev) => prev + 1)}
                      >
                        <span>Next Question</span>
                        <ArrowRight size={16} />
                      </Button>
                    ) : (
                      <Button
                        variant="emerald"
                        size="md"
                        onClick={handleSubmitQuiz}
                      >
                        <span>Submit Quiz</span>
                        <Trophy size={16} />
                      </Button>
                    )}
                  </div>
                </div>
              )
            })()
          ) : (
            /* Results Screen */
            attemptResult && (
              <div className="text-center space-y-6 py-6 animate-slide-up">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-4xl shadow-2xl glow-indigo">
                  <Trophy size={40} />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Quiz Completed!</h2>
                  <p className="text-xs text-indigo-400 font-semibold">{activeQuiz.topic}</p>
                </div>

                <Card variant="glass" className="p-6 max-w-sm mx-auto space-y-4 border-indigo-500/30">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>Overall Score</span>
                    <span className="text-2xl font-extrabold text-indigo-400">{attemptResult.scorePercentage.toFixed(0)}%</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Correct Answers</span>
                    <span className="font-bold text-white">{attemptResult.correctAnswers} / {attemptResult.totalQuestions}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
                    {attemptResult.feedback}
                  </div>
                </Card>

                <Button
                  variant="gradient"
                  size="md"
                  onClick={() => setActiveQuiz(null)}
                >
                  Return to Quizzes
                </Button>
              </div>
            )
          )}
        </Card>
      )}
    </div>
  )
}
