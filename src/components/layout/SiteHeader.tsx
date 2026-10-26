import React from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { Calculator } from 'lucide-react';
import { formatCurrency } from '../../lib/currency';

interface SiteHeaderProps {
  totalCount: number;
  subtotalCents: number;
  onOpenBudget: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  totalCount,
  subtotalCents,
  onOpenBudget,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1688ff]/15 bg-[#020812]/90 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Zone */}
        <a
          href="#"
          className="group flex items-center gap-3 whitespace-nowrap shrink-0 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1688ff]"
          aria-label="Arllon Fernandes Barbearia - Página Inicial"
        >
          <BrandLogo size="sm" showHalo={false} />
          <span className="font-display text-sm sm:text-base font-bold tracking-tight text-white uppercase hidden min-[360px]:inline">
            Arllon Fernandes
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          aria-label="Categorias de serviços"
          className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-medium text-[#b7c4d3]"
        >
          <a
            href="#cabelo"
            className="whitespace-nowrap shrink-0 hover:text-white transition-colors duration-200"
          >
            Cabelo
          </a>
          <a
            href="#barba"
            className="whitespace-nowrap shrink-0 hover:text-white transition-colors duration-200"
          >
            Barba
          </a>
          <a
            href="#sobrancelha-acabamento"
            className="whitespace-nowrap shrink-0 hover:text-white transition-colors duration-200"
          >
            Sobrancelha
          </a>
          <a
            href="#limpeza-cuidados"
            className="whitespace-nowrap shrink-0 hover:text-white transition-colors duration-200"
          >
            Cuidados
          </a>
          <a
            href="#tratamentos-especiais"
            className="whitespace-nowrap shrink-0 hover:text-white transition-colors duration-200"
          >
            Tratamentos
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBudget}
            className="relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#082e5a] to-[#0b4278] hover:from-[#0b4278] hover:to-[#1688ff] px-3.5 py-2 text-xs font-semibold text-white shadow-[0_0_15px_rgba(22,136,255,0.25)] border border-[#1688ff]/40 transition-all duration-200 hover:shadow-[0_0_20px_rgba(22,136,255,0.45)] active:scale-95 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
            aria-label={`Ver orçamento com ${totalCount} serviços selecionados. Subtotal ${formatCurrency(subtotalCents)}`}
          >
            <Calculator className="h-4 w-4 text-[#35a7ff]" aria-hidden="true" />
            <span className="hidden sm:inline">Meu Orçamento</span>
            <span className="sm:hidden">Orçamento</span>
            {totalCount > 0 && (
              <span className="inline-flex items-center justify-center rounded-full bg-[#1688ff] text-white text-[11px] font-bold px-1.5 py-0.2 min-w-4 tabular-nums shadow-sm">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
