import React, { useState, useEffect } from 'react';
import { ServiceItem } from '../../data/services';
import { formatCurrency } from '../../lib/currency';
import { buildWhatsAppQuoteUrl, generateBudgetMessage } from '../../config/whatsapp';
import {
  X,
  Trash2,
  AlertCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { ClearSelectionDialog } from './ClearSelectionDialog';

interface BudgetSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: ServiceItem[];
  fixedPriceServices: ServiceItem[];
  quoteServices: ServiceItem[];
  subtotalCents: number;
  totalCount: number;
  hasQuoteServices: boolean;
  onRemoveService: (id: string) => void;
  onClearSelection: () => void;
}

// Ícone oficial e reconhecível do WhatsApp
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
  </svg>
);

export const BudgetSummary: React.FC<BudgetSummaryProps> = ({
  isOpen,
  onClose,
  selectedServices,
  fixedPriceServices,
  quoteServices,
  subtotalCents,
  totalCount,
  hasQuoteServices,
  onRemoveService,
  onClearSelection,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Fecha com a tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showClearConfirm) {
          setShowClearConfirm(false);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showClearConfirm, onClose]);

  // Bloqueia a rolagem do body quando aberto
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

  // Abertura segura do WhatsApp com mensagem dinâmica pré-preenchida
  const handleSendWhatsAppBudget = () => {
    if (totalCount === 0) return;

    const message = generateBudgetMessage({
      fixedPriceServices,
      quoteServices,
      subtotalCents,
    });

    try {
      navigator.clipboard.writeText(message);
    } catch {
      // ignore
    }

    const url = buildWhatsAppQuoteUrl({
      fixedPriceServices,
      quoteServices,
      subtotalCents,
    });
    window.open(url, '_blank', 'noopener,noreferrer');

    // Ao fechar/enviar o orçamento, o simulador fica vazio imediatamente
    onClearSelection();
    onClose();
  };

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="summary-drawer-title"
        className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      >
        <div
          className="relative flex h-full w-full max-w-xl flex-col bg-[#041426] border-l border-[#1688ff]/30 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1688ff]/20 px-6 py-5 bg-[#05162d]/90">
            <div>
              <div className="flex items-center gap-2.5">
                <h2
                  id="summary-drawer-title"
                  className="font-display text-xl sm:text-2xl font-black tracking-tight text-white uppercase"
                >
                  Meu Orçamento
                </h2>
                <span className="inline-flex items-center rounded-full bg-[#1688ff]/20 px-2.5 py-0.5 text-xs font-bold text-[#35a7ff] border border-[#1688ff]/40 tabular-nums">
                  {totalCount} {totalCount === 1 ? 'item' : 'itens'}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#b7c4d3]">
                Simulador interativo de procedimentos e valores
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-[#b7c4d3] hover:text-white hover:bg-[#082e5a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
              aria-label="Fechar resumo de orçamento"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {totalCount === 0 ? (
              /* Empty State */
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center p-6 rounded-2xl bg-[#05162d]/60 border border-dashed border-[#1688ff]/20">
                <div className="h-14 w-14 rounded-2xl bg-[#082e5a]/60 border border-[#1688ff]/30 flex items-center justify-center text-[#35a7ff] mb-4">
                  <Sparkles className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">
                  Nenhum serviço selecionado.
                </h3>
                <p className="text-sm text-[#b7c4d3] max-w-sm leading-relaxed">
                  Escolha os serviços desejados para calcular o valor do seu atendimento.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#082e5a] hover:bg-[#1688ff] text-white text-xs font-bold tracking-wide uppercase transition-colors"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <>
                {/* Fixed Price Services List */}
                {fixedPriceServices.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold tracking-wider text-[#35a7ff] uppercase mb-3 flex items-center justify-between">
                      <span>Procedimentos ({fixedPriceServices.length})</span>
                      <span className="text-[11px] text-[#627d98]">Valor unitário</span>
                    </h3>

                    <div className="space-y-2.5">
                      {fixedPriceServices.map((service) => (
                        <div
                          key={`fixed-${service.id}`}
                          className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#05162d] border border-[#1688ff]/15 hover:border-[#1688ff]/30 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={service.image}
                              alt=""
                              aria-hidden="true"
                              className="h-11 w-11 rounded-lg object-cover shrink-0 bg-[#030d1a] border border-[#1688ff]/20"
                            />
                            <div className="min-w-0">
                              <h4 className="font-display text-sm font-semibold text-white truncate">
                                {service.name}
                              </h4>
                              {service.durationApprox && (
                                <p className="text-[11px] text-[#627d98]">
                                  {service.durationApprox}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-display text-sm font-bold text-white tabular-nums">
                              {formatCurrency(service.priceCents)}
                            </span>
                            <button
                              onClick={() => onRemoveService(service.id)}
                              className="p-1.5 rounded-lg text-rose-400/80 hover:text-rose-300 hover:bg-rose-950/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500"
                              aria-label={`Remover ${service.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quote Services Section */}
                {quoteServices.length > 0 && (
                  <div className="pt-2">
                    <h3 className="text-xs font-bold tracking-wider text-amber-300 uppercase mb-3 flex items-center justify-between">
                      <span>Serviços sob Consulta ({quoteServices.length})</span>
                      <span className="text-[11px] text-amber-400/80">Avaliação presencial</span>
                    </h3>

                    <div className="space-y-2.5">
                      {quoteServices.map((service) => (
                        <div
                          key={`quote-${service.id}`}
                          className="flex items-center justify-between gap-3 p-3 rounded-xl bg-amber-950/15 border border-amber-500/30 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={service.image}
                              alt=""
                              aria-hidden="true"
                              className="h-11 w-11 rounded-lg object-cover shrink-0 bg-[#030d1a] border border-amber-500/20"
                            />
                            <div className="min-w-0">
                              <h4 className="font-display text-sm font-semibold text-white truncate">
                                {service.name}
                              </h4>
                              <p className="text-[11px] text-amber-300/80">
                                Valor a ser avaliado pelo barbeiro
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span
                              translate="no"
                              className="notranslate inline-flex rounded-md bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/40 uppercase"
                            >
                              CONSULTAR
                            </span>
                            <button
                              onClick={() => onRemoveService(service.id)}
                              className="p-1.5 rounded-lg text-rose-400/80 hover:text-rose-300 hover:bg-rose-950/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500"
                              aria-label={`Remover ${service.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Notice for Quote Items */}
                    <div className="mt-3.5 flex items-start gap-2.5 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Aviso:</strong> O subtotal não inclui os serviços com valor sob consulta.
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Drawer Footer: Total & Actions */}
          {totalCount > 0 && (
            <div className="border-t border-[#1688ff]/20 bg-[#05162d] px-6 py-5 space-y-4">
              {/* Subtotal Calculation */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-[#35a7ff]">
                    Subtotal Estimado
                  </span>
                  <p className="text-[11px] text-[#627d98]">
                    {fixedPriceServices.length} {fixedPriceServices.length === 1 ? 'item calculado' : 'itens calculados'}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-display text-3xl font-black text-white tabular-nums tracking-tight">
                    {formatCurrency(subtotalCents)}
                  </span>
                </div>
              </div>

              {/* Botão Principal: ENVIAR MEU ORÇAMENTO PELO WHATSAPP */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSendWhatsAppBudget}
                  disabled={totalCount === 0}
                  className="animate-shine group relative w-full flex items-center justify-center gap-3 px-5 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#128C7E] hover:from-[#22c35e] hover:to-[#0f7a6e] text-white font-display text-xs sm:text-sm font-black tracking-wider uppercase border border-emerald-300/40 ring-1 ring-white/20 shadow-[0_8px_25px_rgba(37,211,102,0.35),0_0_15px_rgba(18,140,126,0.25)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-[1.015] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  aria-label="Enviar meu orçamento pelo WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
                  <span className="truncate">ENVIAR MEU ORÇAMENTO PELO WHATSAPP</span>
                </button>
              </div>

              {/* Ações Secundárias: Limpar seleção & Continuar escolhendo */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 py-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Limpar seleção</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-semibold text-[#b7c4d3] hover:text-white py-1 transition-colors"
                >
                  Continuar escolhendo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ClearSelectionDialog
        isOpen={showClearConfirm}
        onConfirm={() => {
          onClearSelection();
          setShowClearConfirm(false);
        }}
        onCancel={() => setShowClearConfirm(false)}
      />
    </>
  );
};
