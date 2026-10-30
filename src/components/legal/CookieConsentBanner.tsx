import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Check, X, Settings2 } from 'lucide-react';
import {
  getStoredConsent,
  saveStoredConsent,
  CookieConsentSettings,
} from '../../lib/cookieConsent';

interface CookieConsentBannerProps {
  onOpenPolicy: () => void;
  forceOpen?: boolean;
  onCloseForceOpen?: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPolicy,
  forceOpen = false,
  onCloseForceOpen,
}) => {
  const [hasConsentChoice, setHasConsentChoice] = useState(true);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      setHasConsentChoice(false);
    } else {
      setHasConsentChoice(true);
      setAnalyticsAllowed(existing.analytics);
    }
  }, []);

  const handleAcceptAll = () => {
    saveStoredConsent({ analytics: true, marketing: false });
    setHasConsentChoice(true);
    setShowCustomize(false);
    onCloseForceOpen?.();
  };

  const handleEssentialOnly = () => {
    saveStoredConsent({ analytics: false, marketing: false });
    setHasConsentChoice(true);
    setShowCustomize(false);
    onCloseForceOpen?.();
  };

  const handleSaveCustom = () => {
    saveStoredConsent({ analytics: analyticsAllowed, marketing: false });
    setHasConsentChoice(true);
    setShowCustomize(false);
    onCloseForceOpen?.();
  };

  const isVisible = !hasConsentChoice || forceOpen;
  if (!isVisible) return null;

  return (
    <aside
      role="region"
      aria-label="Aviso de privacidade e consentimento de cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-50 animate-fadeIn"
    >
      <div className="rounded-2xl bg-[#041426]/98 backdrop-blur-2xl border border-[#35a7ff]/40 p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(22,136,255,0.25)] text-left">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#082e5a] border border-[#1688ff]/40 text-[#35a7ff]">
            <Cookie className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-tight">
                Privacidade &amp; Cookies (LGPD)
              </h3>
              <span className="text-[10px] font-bold text-[#35a7ff] bg-[#082e5a] px-1.5 py-0.5 rounded border border-[#1688ff]/30">
                100% Seguro
              </span>
            </div>
            <p className="mt-1 text-xs text-[#b7c4d3] leading-relaxed">
              Utilizamos apenas armazenamento estritamente necessário para o funcionamento do catálogo e simulação de orçamento. 
              Nenhum dado pessoal sensível é coletado e nenhum rastreador de terceiros é executado sem sua prévia autorização.
            </p>
          </div>
        </div>

        {/* Detailed customizer drawer if toggled */}
        {showCustomize && (
          <div className="mt-4 pt-3 border-t border-[#1688ff]/20 space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#05162d] border border-[#1688ff]/15">
              <div>
                <span className="font-bold text-white block">Cookies Necessários</span>
                <span className="text-[11px] text-[#8faec7]">Indispensáveis para a simulação e escolhas da sessão.</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded">
                Sempre Ativo
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#05162d] border border-[#1688ff]/15">
              <div>
                <span className="font-bold text-white block">Métricas e Desempenho</span>
                <span className="text-[11px] text-[#8faec7]">Atualmente desativados por padrão (zero rastreadores).</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsAllowed}
                  onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                  className="sr-only peer"
                  aria-label="Autorizar cookies de métricas e desempenho"
                />
                <div className="w-9 h-5 bg-[#020812] border border-[#1688ff]/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1688ff]" />
              </label>
            </div>
          </div>
        )}

        {/* Links and Actions */}
        <div className="mt-4 pt-3 border-t border-[#1688ff]/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={onOpenPolicy}
              className="text-[#35a7ff] hover:text-white underline underline-offset-2 transition-colors font-semibold"
            >
              Ler Políticas
            </button>
            <span className="text-[#1688ff]/40" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setShowCustomize(!showCustomize)}
              className="text-[#8faec7] hover:text-white transition-colors flex items-center gap-1 font-semibold"
            >
              <Settings2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{showCustomize ? 'Ocultar' : 'Personalizar'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {showCustomize ? (
              <button
                type="button"
                onClick={handleSaveCustom}
                className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl bg-[#1688ff] hover:bg-[#35a7ff] text-white text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
              >
                Salvar Escolha
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-[#082245] hover:bg-[#0b2c58] text-[#b7c4d3] hover:text-white border border-[#1688ff]/25 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
                >
                  Apenas Necessários
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#082e5a] to-[#1688ff] hover:to-[#35a7ff] text-white text-xs font-bold border border-[#35a7ff]/40 shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
                >
                  Aceitar Todos
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
