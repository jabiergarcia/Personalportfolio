import React, { Component, ReactNode } from 'react';
import { Button } from './ui/button';
import { useLanguage } from '../hooks/use-language';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// Componente funcional para acceder al hook de idioma
function ErrorFallback({ error }: { error?: Error }) {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/70 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t.errorBoundary.title}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t.errorBoundary.description}
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            {t.errorBoundary.reloadButton}
          </Button>
          <Button 
            onClick={() => window.location.href = '/'}
          >
            {t.errorBoundary.homeButton}
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground mb-2">
              {t.errorBoundary.technicalDetails}
            </summary>
            <pre className="text-xs bg-muted p-3 rounded overflow-auto">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}