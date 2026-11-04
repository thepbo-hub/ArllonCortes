import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      showDetails: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log estruturado no console para diagnóstico sem expor dados sensíveis
    if (typeof console !== 'undefined' && console.error) {
      console.error('ErrorBoundary capturou uma exceção de renderização:', {
        message: error?.message,
        name: error?.name,
        componentStack: errorInfo?.componentStack?.slice(0, 500),
      });
    }
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleReset = (): void => {
    try {
      localStorage.removeItem('arllon_barbearia_budget_selection_v1');
      sessionStorage.clear();
    } catch {
      // Ignore
    }
    window.location.href = '/';
  };

  toggleDetails = (): void => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen bg-[#020812] text-white flex flex-col items-center justify-center p-4 sm:p-6 text-center select-none"
        >
          {/* Subtle Ambient Backlight */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background:
                'radial-gradient(ellipse at 50% 30%, rgba(22, 136, 255, 0.25) 0%, rgba(8, 46, 90, 0.2) 40%, transparent 70%)',
            }}
          />

          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-[#05162d]/95 backdrop-blur-xl border border-[#1688ff]/30 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#082e5a] border border-[#1688ff]/40 text-[#35a7ff] mb-5 shadow-[0_0_20px_rgba(22,136,255,0.3)]">
              <ShieldAlert className="h-8 w-8" aria-hidden="true" />
            </div>

            <h1 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">
              Instabilidade Temporária
            </h1>

            <p className="text-sm text-[#b7c4d3] leading-relaxed mb-6">
              O catálogo digital da Barbearia Arllon Fernandes encontrou um imprevisto na renderização. Seus dados estão seguros e você pode restabelecer a página imediatamente.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#082e5a] to-[#1688ff] hover:to-[#35a7ff] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
                <span>Recarregar Página</span>
              </button>

              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#030d1a] hover:bg-[#082e5a] border border-[#1688ff]/30 text-white font-semibold text-xs uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
              >
                <Home className="w-4 h-4 text-[#35a7ff]" aria-hidden="true" />
                <span>Reiniciar Catálogo</span>
              </button>
            </div>

            {/* Diagnóstico técnico opcional */}
            {this.state.error && (
              <div className="mt-6 pt-4 border-t border-[#1688ff]/15">
                <button
                  type="button"
                  onClick={this.toggleDetails}
                  className="text-[11px] text-[#8faec7] hover:text-[#35a7ff] underline underline-offset-2 transition-colors font-medium"
                >
                  {this.state.showDetails ? 'Ocultar detalhes técnicos' : 'Ver detalhes técnicos'}
                </button>

                {this.state.showDetails && (
                  <pre className="mt-2 p-3 rounded-lg bg-[#020812] border border-[#1688ff]/20 text-left text-[11px] text-rose-300 font-mono overflow-x-auto max-h-36 leading-snug">
                    {this.state.error.name}: {this.state.error.message}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
