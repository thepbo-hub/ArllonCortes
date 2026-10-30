import React from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { ArrowUp, MapPin, Clock, Phone, ShieldCheck, Cookie, FileText } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../../config/whatsapp';
import { LegalDocType } from '../legal/LegalModal';

interface SiteFooterProps {
  onOpenLegal: (doc: LegalDocType) => void;
  onOpenCookiePreferences: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onOpenLegal,
  onOpenCookiePreferences,
}) => {
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
            <div className="pt-2 text-xs text-[#8faec7]">
              <span>Ambiente exclusivo, equipamentos esterilizados e produtos selecionados.</span>
            </div>
          </div>

          {/* Col 2: Info & Informational Notice */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold tracking-wider text-[#35a7ff] uppercase">
              Informações do Catálogo
            </h4>
            <div className="space-y-2.5 text-xs text-[#b7c4d3] leading-relaxed">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#1688ff] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex flex-col">
                  <span>Segunda a Sexta: 09h às 20h</span>
                  <span>Sábado: 08h às 18h</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1688ff] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Ambiente exclusivo climatizado</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#1688ff] shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href={WHATSAPP_CONFIG.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#35a7ff] transition-colors underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#35a7ff] rounded"
                >
                  WhatsApp: Fechar Atendimento
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Disclaimer & Back to Top */}
          <div className="flex flex-col items-start md:items-end justify-between space-y-4">
            <div className="md:text-right">
              <span className="text-xs font-semibold text-[#8faec7] uppercase tracking-wider block mb-1">
                Aviso Importante
              </span>
              <p className="text-xs text-[#b7c4d3] max-w-xs leading-relaxed">
                Este biosite é exclusivamente um catálogo demonstrativo e simulador de orçamento. Horários, preços e disponibilidades são puramente informativos e confirmados presencialmente. Não realizamos agendamentos automáticos ou cobranças online.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#05162d] hover:bg-[#082e5a] border border-[#1688ff]/20 text-xs font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
              aria-label="Voltar ao topo da página"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#35a7ff]" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Legal Links (LGPD, Termos de Uso, Política de Cookies e Gerenciador) */}
        <div className="mt-10 pt-6 border-t border-[#1688ff]/15 flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-xs text-[#8faec7]">
          <span className="text-[#35a7ff] font-bold uppercase text-[11px] tracking-wider">
            Transparência &amp; Legal:
          </span>
          <button
            type="button"
            onClick={() => onOpenLegal('privacy')}
            className="hover:text-white transition-colors underline-offset-2 hover:underline flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#35a7ff] rounded py-0.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#1688ff]" aria-hidden="true" />
            <span>Política de Privacidade (LGPD)</span>
          </button>
          <span className="text-[#1688ff]/40" aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => onOpenLegal('terms')}
            className="hover:text-white transition-colors underline-offset-2 hover:underline flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#35a7ff] rounded py-0.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#1688ff]" aria-hidden="true" />
            <span>Termos de Uso</span>
          </button>
          <span className="text-[#1688ff]/40" aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => onOpenLegal('cookies')}
            className="hover:text-white transition-colors underline-offset-2 hover:underline flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#35a7ff] rounded py-0.5"
          >
            <Cookie className="w-3.5 h-3.5 text-[#1688ff]" aria-hidden="true" />
            <span>Política de Cookies</span>
          </button>
          <span className="text-[#1688ff]/40" aria-hidden="true">·</span>
          <button
            type="button"
            onClick={onOpenCookiePreferences}
            className="text-[#35a7ff] hover:text-white transition-colors font-semibold underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#35a7ff] rounded py-0.5"
          >
            Preferências de Cookies
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-6 pt-4 border-t border-[#1688ff]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8faec7] gap-4">
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
