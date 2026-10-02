import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  shadow?: boolean
  glow?: boolean
  variant?: 'glass' | 'solid' | 'gradient'
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  shadow = true,
  glow = false,
  variant = 'glass',
  ...props
}) => {
  const base = 'rounded-2xl transition-all duration-300'
  
  const variants: Record<string, string> = {
    glass: 'glass-card text-slate-100',
    solid: 'bg-slate-900 border border-slate-800 text-slate-100',
    gradient: 'bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-indigo-950/40 border border-indigo-500/20 text-slate-100',
  }

  const glowEffect = glow ? 'glow-indigo border-indigo-500/30' : ''
  const shadowEffect = shadow ? 'shadow-xl' : ''

  return (
    <div className={`${base} ${variants[variant]} ${glowEffect} ${shadowEffect} ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card
