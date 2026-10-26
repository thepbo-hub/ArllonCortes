import React from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { ArrowUp, MapPin, Clock, Phone } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../../config/whatsapp';

export const SiteFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 border-t border-[#1688ff]/15 bg-[#020812] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 items-start">
          
          {/* Col 1: Brand & Official Logo */}
          <div className="flex flex-col items-start space-y-4">
            <BrandLogo size="md" showHalo={true} />
            <p className="text-sm text-[#b7c4d3] max-w-sm leading-relaxed">
              Arllon Fernandes Barbearia. A tradição do corte e barbear com técnicas contemporâneas e atendimento refinado.
            </p>
          </div>

          {/* Col 2: Info & Informational Notice */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold tracking-wider text-[#35a7ff] uppercase">
              Informações do Catálogo
            </h4>
            <div className="space-y-2.5 text-xs text-[#b7c4d3] leading-relaxed">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#1688ff] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span>Segunda a Sexta: 09h às 20h</span>
                  <span>Sábado: 08h às 18h</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1688ff] shrink-0 mt-0.5" />
                <span>Ambiente exclusivo climatizado</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#1688ff] shrink-0 mt-0.5" />
                <a
                  href={WHATSAPP_CONFIG.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#35a7ff] transition-colors underline-offset-2 hover:underline"
                >
                  WhatsApp: Fechar Atendimento
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Disclaimer & Back to Top */}
          <div className="flex flex-col items-start md:items-end justify-between space-y-4">
            <div className="md:text-right">
              <span className="text-xs font-semibold text-[#627d98] uppercase tracking-wider block mb-1">
                Aviso Importante
              </span>
              <p className="text-xs text-[#b7c4d3] max-w-xs leading-relaxed">
                Este biosite é exclusivamente um catálogo demonstrativo e simulador de orçamento. Não realiza agendamentos automáticos ou cobranças online.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#05162d] hover:bg-[#082e5a] border border-[#1688ff]/20 text-xs font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#35a7ff]" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-[#1688ff]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#627d98] gap-4">
          <p>© {new Date().getFullYear()} Arllon Fernandes Barbearia. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Experiência Digital Premium</span>
            <span aria-hidden="true">·</span>
            <span>Alta Precisão &amp; Estilo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
