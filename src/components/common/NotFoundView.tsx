import React from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { Home, ArrowLeft, MessageCircle } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../../config/whatsapp';

interface NotFoundViewProps {
  onGoHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen bg-[#020812] text-white flex flex-col items-center justify-center p-4 sm:p-6 text-center select-none">
      {/* Ambient Halo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(22, 136, 255, 0.25) 0%, rgba(8, 46, 90, 0.2) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-[#05162d]/95 backdrop-blur-xl border border-[#1688ff]/30 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col items-center">
        <BrandLogo size="md" showHalo={true} spinningRing={true} className="mb-6" />

        <span className="inline-block px-3 py-1 rounded-full bg-[#1688ff]/20 text-[#35a7ff] text-xs font-black tracking-widest uppercase border border-[#1688ff]/30 mb-3">
          Erro 404 · Rota Não Encontrada
        </span>

        <h1 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">
          Página Não Encontrada
        </h1>

        <p className="text-sm text-[#b7c4d3] leading-relaxed max-w-sm mb-8">
          O endereço que você tentou acessar não está disponível. Utilize os links oficiais do catálogo da <strong>Arllon Fernandes Barbearia</strong> para continuar.
        </p>

        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onGoHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#082e5a] to-[#1688ff] hover:to-[#35a7ff] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(22,136,255,0.4)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Voltar ao Catálogo</span>
          </button>

          <a
            href={WHATSAPP_CONFIG.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#030d1a] hover:bg-[#082e5a] border border-[#1688ff]/30 text-white font-semibold text-xs uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
