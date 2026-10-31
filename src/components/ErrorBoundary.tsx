import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-8 my-8 max-w-xl mx-auto bg-[#14151b] border border-white/10 text-center">
          <h3 className="text-lg font-bold text-white mb-2">Display Preview Notice</h3>
          <p className="text-xs text-neutral-400 mb-4">
            A visual subcomponent encountered an environment rendering conflict. The rest of the showroom remains fully accessible.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#d50000] text-white"
          >
            Reload Component
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
