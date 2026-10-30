import React, { useEffect } from 'react';
import { X, ShieldCheck, BookOpen, Cookie, Printer } from 'lucide-react';
import { PrivacyPolicyContent } from './PrivacyPolicyContent';
import { TermsOfUseContent } from './TermsOfUseContent';
import { CookiePolicyContent } from './CookiePolicyContent';
import { cn } from '../../lib/utils';

export type LegalDocType = 'privacy' | 'terms' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  activeDoc: LegalDocType;
  onClose: () => void;
  onSelectDoc: (doc: LegalDocType) => void;
  onOpenPreferences?: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeDoc,
  onClose,
  onSelectDoc,
  onOpenPreferences,
}) => {
  // Fecha com tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Bloqueia rolagem do body quando aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-3xl max-h-[90vh] rounded-2xl bg-[#041426] border border-[#1688ff]/30 shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#1688ff]/20 bg-[#05162d]">
          <div className="flex items-center gap-2.5">
            <h2 id="legal-modal-title" className="font-display text-lg sm:text-xl font-black text-white uppercase tracking-tight">
              Central Jurídica &amp; Privacidade
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="p-2 rounded-xl text-[#8faec7] hover:text-white hover:bg-[#082e5a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
              aria-label="Imprimir documento legal"
              title="Imprimir documento"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-[#8faec7] hover:text-white hover:bg-[#082e5a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
              aria-label="Fechar janela"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation between the 3 policies */}
        <nav
          aria-label="Navegação entre documentos legais"
          className="flex border-b border-[#1688ff]/15 bg-[#020812]/90 px-4 sm:px-6 overflow-x-auto no-scrollbar"
        >
          <button
            type="button"
            onClick={() => onSelectDoc('privacy')}
            className={cn(
              'flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]',
              activeDoc === 'privacy'
                ? 'border-[#35a7ff] text-[#35a7ff]'
                : 'border-transparent text-[#8faec7] hover:text-white'
            )}
            aria-current={activeDoc === 'privacy' ? 'page' : undefined}
          >
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>Política de Privacidade</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectDoc('terms')}
            className={cn(
              'flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]',
              activeDoc === 'terms'
                ? 'border-[#35a7ff] text-[#35a7ff]'
                : 'border-transparent text-[#8faec7] hover:text-white'
            )}
            aria-current={activeDoc === 'terms' ? 'page' : undefined}
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>Termos de Uso</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectDoc('cookies')}
            className={cn(
              'flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]',
              activeDoc === 'cookies'
                ? 'border-[#35a7ff] text-[#35a7ff]'
                : 'border-transparent text-[#8faec7] hover:text-white'
            )}
            aria-current={activeDoc === 'cookies' ? 'page' : undefined}
          >
            <Cookie className="w-4 h-4" aria-hidden="true" />
            <span>Política de Cookies</span>
          </button>
        </nav>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 max-h-[calc(90vh-140px)]">
          {activeDoc === 'privacy' && <PrivacyPolicyContent />}
          {activeDoc === 'terms' && <TermsOfUseContent />}
          {activeDoc === 'cookies' && (
            <CookiePolicyContent
              onOpenPreferences={() => {
                onClose();
                onOpenPreferences?.();
              }}
            />
          )}
        </div>

        {/* Modal Footer with quick close */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-t border-[#1688ff]/15 bg-[#05162d] text-xs text-[#8faec7]">
          <span>Arllon Fernandes Barbearia · LGPD &amp; Boas Práticas</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#082e5a] hover:bg-[#1688ff] text-white font-bold text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
