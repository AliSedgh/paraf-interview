'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'

import { Button } from '@/shared/components/Button'

type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
  onError?: (error: Error, info: ErrorInfo) => void
}

type ErrorBoundaryState = {
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)

    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorBoundary]', error, info)
    }
  }

  reset = () => this.setState({ error: null })

  render() {
    const { error } = this.state
    const { children, fallback } = this.props

    if (!error) return children

    if (typeof fallback === 'function') return fallback(error, this.reset)
    if (fallback) return fallback

    return (
      <div
        role="alert"
        className="flex min-h-[240px] flex-col items-center justify-center gap-3 p-6 text-center"
      >
        <h2 className="text-lg font-semibold">مشکلی پیش آمد</h2>
        <p className="max-w-md text-sm text-muted-foreground">{error.message}</p>
        <Button onClick={this.reset} variant="outline" size="sm">
          تلاش مجدد
        </Button>
      </div>
    )
  }
}
