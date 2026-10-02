import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/authService'
import { setCredentials } from '../../store/authSlice'
import Button from '../ui/Button'

export default function OtpLogin() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [wait, setWait] = useState(0)
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (wait <= 0) return
    const timer = window.setTimeout(() => setWait(wait - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [wait])
  const failure = (error: any) => setMessage(error.response?.data?.message || error.response?.data?.detail || 'Request failed. Please try again.')
  async function send() {
    setBusy(true)
    setMessage('')
    try {
      const result = await authService.sendOtp(email.trim())
      setSent(true)
      setCode('')
      setWait(60)
      setMessage(result.message)
    } catch (error) { failure(error) }
    finally { setBusy(false) }
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!sent) { await send(); return }
    setBusy(true)
    setMessage('')
    try {
      const result = await authService.verifyOtp(email.trim(), code)
      dispatch(setCredentials({ token: result.token, user: {
        id: result.userId, username: result.username, email: result.email, role: result.role,
      } }))
      navigate('/dashboard')
    } catch (error) { failure(error) }
    finally { setBusy(false) }
  }
  const inputClass = 'w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-3 text-white'
  return <form onSubmit={submit} className="space-y-4">
    <p className="text-sm text-slate-400">Use the email address on your StudentAI account.</p>
    <label className="block text-sm" htmlFor="otp-email">Email address</label>
    <input id="otp-email" className={inputClass} type="email" autoComplete="email" required maxLength={254}
      value={email} disabled={sent || busy} onChange={e => setEmail(e.target.value)} />
    {sent && <>
      <label className="block text-sm" htmlFor="otp-code">Six-digit code</label>
      <input id="otp-code" className={inputClass} inputMode="numeric" autoComplete="one-time-code"
        pattern="[0-9]{6}" maxLength={6} required value={code} disabled={busy}
        onChange={e => setCode(e.target.value.replace(/\D/g, ''))} />
      <p className="text-xs text-slate-400">The code expires in 5 minutes.</p>
    </>}
    {message && <p role="status" className="text-sm text-indigo-300">{message}</p>}
    <Button type="submit" variant="gradient" className="w-full" disabled={busy}>
      {busy ? 'Please wait...' : sent ? 'Verify code and sign in' : 'Send login code'}
    </Button>
    {sent && <div className="flex justify-between text-sm">
      <button type="button" disabled={busy || wait > 0} onClick={send} className="text-indigo-300 disabled:opacity-50">
        {wait > 0 ? `Resend in ${wait}s` : 'Resend code'}
      </button>
      <button type="button" disabled={busy} onClick={() => { setSent(false); setCode(''); setMessage('') }}>
        Change email
      </button>
    </div>}
  </form>
}
