import React, { useRef, useState, useCallback } from 'react';
import { ServiceItem } from '../../data/services';
import { formatCurrency } from '../../lib/currency';
import { Check, Plus, Minus, Scissors } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ServiceCardProps {
  service: ServiceItem;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isSelected,
  onToggle,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, spotX: 50, spotY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt: max ~5 degrees
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = -((y - centerY) / centerY) * 5;

    setTilt({
      rotateX,
      rotateY,
      spotX: (x / rect.width) * 100,
      spotY: (y / rect.height) * 100,
    });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, spotX: 50, spotY: 50 });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle(service.id);
    }
  };

  const isQuote = service.priceType === 'quote' || service.priceCents === null;
  const isPigmentacaoBarba = service.id === 'pigmentacao-barba';
  const isHidratacao = service.id === 'hidratacao-cabelo-barba';
  const hasFluidGradient = isPigmentacaoBarba || isHidratacao;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onToggle(service.id)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${service.name}. Preço: ${isQuote ? 'Sob Consulta' : formatCurrency(service.priceCents)}. ${isSelected ? 'Selecionado, clique para remover' : 'Clique para adicionar ao orçamento'}`}
      style={{
        transform: isHovered
          ? `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-3px)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.4s ease-out, border-color 0.25s, box-shadow 0.25s',
      }}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#05162d] border cursor-pointer select-none text-left',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]',
        isSelected
          ? 'border-[#35a7ff] shadow-[0_10px_30px_rgba(22,136,255,0.35),0_0_15px_rgba(53,167,255,0.25)] bg-gradient-to-b from-[#082e5a]/90 to-[#041426]'
          : 'border-[#1688ff]/15 hover:border-[#1688ff]/50 shadow-[0_6px_20px_rgba(2,8,18,0.7)] hover:shadow-[0_12px_28px_rgba(4,20,38,0.9)]'
      )}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      {isHovered && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle 240px at ${tilt.spotX}% ${tilt.spotY}%, rgba(53, 167, 255, 0.15), transparent 70%)`,
          }}
        />
      )}

      {/* Card Content Top: Image Container */}
      <div
        className={cn(
          'relative aspect-[4/3] w-full overflow-hidden flex items-center justify-center',
          hasFluidGradient
            ? 'bg-gradient-to-b from-[#082e5a] via-[#051a36] to-[#020812]'
            : 'bg-[#030d1a]'
        )}
        style={{
          background: hasFluidGradient
            ? 'radial-gradient(circle at 50% 38%, rgba(53, 167, 255, 0.45) 0%, rgba(11, 66, 120, 0.65) 32%, rgba(8, 46, 90, 0.85) 60%, #020812 100%)'
            : undefined,
        }}
      >
        {/* Atmospheric Depth Backlight for Fluid Perspective */}
        {hasFluidGradient && (
          <div
            aria-hidden="true"
            className="absolute inset-2 sm:inset-4 rounded-full bg-gradient-to-tr from-[#1688ff]/30 via-[#35a7ff]/20 to-transparent blur-xl pointer-events-none"
          />
        )}

        {!imageFailed ? (
          <img
            src={service.image}
            alt={service.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className={cn(
              'transition-transform duration-700 ease-out',
              (isPigmentacaoBarba || isHidratacao) &&
                'h-full w-full object-contain p-1 sm:p-1.5 scale-100 max-h-full max-w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] filter contrast-105 group-hover:scale-[1.03]',
              !isPigmentacaoBarba && !isHidratacao && 'h-full w-full object-cover group-hover:scale-105'
            )}
          />
        ) : (
          /* Styled Fallback Container */
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#082e5a] to-[#041426] p-4 text-center">
            <Scissors className="h-8 w-8 text-[#35a7ff]/60 mb-2" aria-hidden="true" />
            <span className="font-display text-xs font-semibold text-[#b7c4d3]">
              {service.name}
            </span>
          </div>
        )}

        {/* Contrast Scrim Gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#05162d] via-transparent to-black/30 pointer-events-none"
        />

        {/* Selected Status Corner Badge */}
        {isSelected && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-[#1688ff] px-2.5 py-1 text-[11px] font-bold text-white shadow-[0_0_12px_rgba(22,136,255,0.7)] animate-fadeIn">
            <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
            <span>Adicionado</span>
          </div>
        )}

        {/* Price Tag Pill Overlay */}
        <div className="absolute bottom-3 left-3 z-20">
          {isQuote ? (
            <span
              translate="no"
              className="notranslate inline-flex items-center rounded-md bg-[#082e5a]/95 backdrop-blur-md px-2.5 py-1 text-xs font-bold tracking-wider text-[#35a7ff] border border-[#1688ff]/50 shadow-md uppercase select-none"
            >
              CONSULTAR
            </span>
          ) : (
            <span
              translate="no"
              className="notranslate inline-flex items-center rounded-md bg-[#041426]/95 backdrop-blur-md px-2.5 py-1 text-xs sm:text-sm font-extrabold tracking-tight text-white border border-[#1688ff]/30 shadow-md tabular-nums select-none"
            >
              {formatCurrency(service.priceCents)}
            </span>
          )}
        </div>
      </div>

      {/* Card Body: Details & Action */}
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-5">
        <div>
          <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-[#35a7ff] transition-colors duration-200">
            {service.name}
          </h3>

          {service.description && (
            <p className="mt-1.5 text-xs sm:text-sm text-[#b7c4d3] leading-relaxed line-clamp-2">
              {service.description}
            </p>
          )}

          {service.durationApprox && (
            <div className="mt-2.5 flex items-center gap-2 text-[11px] text-[#627d98]">
              <span>Duração:</span>
              <span className="text-[#b7c4d3] font-medium">{service.durationApprox}</span>
            </div>
          )}
        </div>

        {/* Bottom Interactive Action Button (Full Width on mobile for maximum visibility and touch target) */}
        <div className="mt-3.5 pt-2.5 border-t border-[#1688ff]/15">
          <button
            type="button"
            translate="no"
            onClick={(e) => {
              e.stopPropagation();
              onToggle(service.id);
            }}
            className={cn(
              'notranslate w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-200 active:scale-[0.98] select-none',
              isSelected
                ? 'bg-rose-950/85 hover:bg-rose-900 text-rose-300 border border-rose-700/60 shadow-[0_2px_10px_rgba(225,29,72,0.25)]'
                : 'bg-gradient-to-r from-[#082e5a] to-[#0b4278] hover:to-[#1688ff] text-white border border-[#1688ff]/50 shadow-[0_2px_10px_rgba(22,136,255,0.25)]'
            )}
            aria-label={isSelected ? `Remover ${service.name} do orçamento` : `Adicionar ${service.name} ao orçamento`}
          >
            {isSelected ? (
              <>
                <Minus className="h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
                <span className="whitespace-nowrap font-extrabold">Remover</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 shrink-0 text-[#35a7ff]" aria-hidden="true" />
                <span className="whitespace-nowrap font-extrabold">Selecionar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
