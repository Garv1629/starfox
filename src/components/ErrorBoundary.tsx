import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Star Fox Interior error boundary captured exception:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-ivory text-charcoal px-6 text-center select-none">
          <div className="max-w-md p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-champagne/40 shadow-card">
            <h1 className="font-display text-2xl text-charcoal mb-3 tracking-wide">
              STAR FOX INTERIOR
            </h1>
            <div className="w-12 h-[1px] bg-bronze mx-auto mb-4" />
            <p className="font-serif italic text-lg text-bronze mb-2">
              Bespoke Luxury Architecture
            </p>
            <p className="text-sm text-charcoal-muted mb-6 leading-relaxed">
              We encountered a slight rendering hiccup. Refresh to reload the complete architectural portfolio.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-charcoal text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-bronze transition-colors duration-200"
            >
              Reload Website
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
