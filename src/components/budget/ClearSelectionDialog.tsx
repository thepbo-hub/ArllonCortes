import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ClearSelectionDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ClearSelectionDialog: React.FC<ClearSelectionDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="clear-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-[#05162d] border border-[#1688ff]/30 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#b7c4d3] hover:text-white hover:bg-[#082e5a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
          aria-label="Fechar confirmação"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h3 id="clear-dialog-title" className="font-display text-lg font-bold text-white">
              Limpar Seleção
            </h3>
            <p className="text-xs text-[#b7c4d3]">
              Reiniciar simulador de orçamento
            </p>
          </div>
        </div>

        <p className="text-sm text-[#b7c4d3] leading-relaxed mb-6">
          Deseja remover todos os procedimentos selecionados e recomeçar a simulação do seu atendimento?
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#b7c4d3] hover:text-white hover:bg-[#082245] border border-[#1688ff]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 border border-rose-500/50 shadow-md transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            Sim, limpar seleção
          </button>
        </div>
      </div>
    </div>
  );
};
