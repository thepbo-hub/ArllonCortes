import React from 'react';
import { formatCurrency } from '../../lib/currency';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FloatingBudgetBarProps {
  totalCount: number;
  subtotalCents: number;
  hasQuoteServices: boolean;
  quoteCount: number;
  onOpenBudget: () => void;
}

export const FloatingBudgetBar: React.FC<FloatingBudgetBarProps> = ({
  totalCount,
  subtotalCents,
  hasQuoteServices,
  quoteCount,
  onOpenBudget,
}) => {
  if (totalCount === 0) {
    return null;
  }

  return (
    <aside
      aria-label="Barra de resumo de orçamento"
      className="fixed bottom-0 left-0 right-0 z-40 p-2.5 sm:p-4 bg-gradient-to-t from-[#020812] via-[#020812]/95 to-transparent pointer-events-none"
    >
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <div className="flex items-center justify-between gap-2 sm:gap-6 px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl bg-[#05162d]/98 backdrop-blur-2xl border border-[#35a7ff]/50 shadow-[0_12px_40px_rgba(4,20,38,0.98),0_0_25px_rgba(22,136,255,0.3)] transition-all duration-300">
          
          {/* Left: Unclippable Summary Details & Clear Count Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Luminous Numeric Count Badge */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center rounded-md bg-[#1688ff] text-white text-[11px] sm:text-xs font-black px-2 py-0.5 shadow-[0_0_12px_rgba(22,136,255,0.6)] tabular-nums shrink-0">
                  {totalCount}
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap">
                  {totalCount === 1 ? 'item' : 'itens'}
                </span>
              </div>

              {/* Subtotal Display */}
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-display text-base sm:text-2xl font-black text-white tabular-nums tracking-tight whitespace-nowrap">
                  {formatCurrency(subtotalCents)}
                </span>
                {hasQuoteServices && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-amber-300 whitespace-nowrap">
                    <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
                    +{quoteCount} sob consulta
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Responsive CTA Button */}
          <button
            onClick={onOpenBudget}
            className={cn(
              'animate-shine relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl',
              'bg-gradient-to-r from-[#082e5a] via-[#0b4278] to-[#1688ff] text-white font-display text-xs sm:text-sm font-bold tracking-wide uppercase',
              'border border-[#35a7ff]/60 shadow-[0_2px_16px_rgba(22,136,255,0.45)] hover:shadow-[0_4px_24px_rgba(22,136,255,0.65)]',
              'hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]'
            )}
            aria-label={`Ver meu orçamento detalhado com ${totalCount} itens selecionados. Subtotal ${formatCurrency(subtotalCents)}`}
          >
            <span className="hidden min-[420px]:inline">VER MEU ORÇAMENTO</span>
            <span className="min-[420px]:hidden">VER ORÇAMENTO</span>
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#35a7ff] shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
};
