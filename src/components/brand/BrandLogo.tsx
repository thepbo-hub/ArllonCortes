import React, { useState } from 'react';
import { cn } from '../../lib/utils';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showHalo?: boolean;
  spinningRing?: boolean;
}

export const OFFICIAL_LOGO_IMAGE = 'https://i.postimg.cc/KjMhxPpV/Logo-ARLLON-FERNANDES-BARBEARIA.png';

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className,
  size = 'md',
  showHalo = true,
  spinningRing = false,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'h-9 w-auto max-w-[130px]',
    md: 'h-12 w-auto max-w-[160px]',
    lg: 'h-20 w-auto max-w-[240px]',
    hero: 'h-28 sm:h-36 md:h-44 w-auto max-w-[320px] sm:max-w-[420px]',
  };

  const badgeSizeClasses = {
    sm: 'w-10 h-10 sm:w-11 sm:h-11',
    md: 'w-14 h-14',
    lg: 'w-22 h-22',
    hero: 'w-32 h-32',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center group select-none', className)}>
      {/* Spinning Ring & Orbit Effect around the logo (Efeito de giro ao redor da logo) */}
      {spinningRing && (
        <div aria-hidden="true" className="absolute -inset-[3px] rounded-full pointer-events-none">
          {/* Luminous rotating outer aura blur */}
          <div
            className="absolute -inset-1 rounded-full opacity-70 blur-[4px] animate-spin-around group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0%, transparent 40%, rgba(22, 136, 255, 0.35) 65%, rgba(53, 167, 255, 0.9) 88%, #ffffff 98%, transparent 100%)',
            }}
          />

          {/* Precision rotating neon laser perimeter ring */}
          <div className="absolute inset-0 rounded-full overflow-hidden p-[1.5px]">
            <div
              className="absolute -inset-[100%] animate-spin-around"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0%, transparent 35%, #082e5a 50%, #1688ff 70%, #35a7ff 88%, #ffffff 98%, transparent 100%)',
              }}
            />
            {/* Inner mask creating a hollow 1.5px laser border */}
            <div className="absolute inset-[1.5px] rounded-full bg-[#020812]" />
          </div>

          {/* Orbiting luminous beacon / spark traveling continuously around the ring */}
          <div className="absolute inset-0 rounded-full animate-spin-around pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_#35a7ff,0_0_12px_#1688ff]" />
          </div>

          {/* Static structural rim with subtle inner glow */}
          <div className="absolute inset-0 rounded-full border border-[#1688ff]/30 pointer-events-none shadow-[inset_0_0_10px_rgba(22,136,255,0.12)]" />
        </div>
      )}

      {/* Ambient Blue Halo Backlight (when not spinning) */}
      {showHalo && !spinningRing && (
        <div
          aria-hidden="true"
          className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#082e5a]/60 via-[#1688ff]/30 to-[#35a7ff]/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none animate-breathe"
        />
      )}

      {/* Raised physical emblem pedestal shadow */}
      {!spinningRing && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl shadow-[0_12px_36px_rgba(4,20,38,0.9),0_0_20px_rgba(22,136,255,0.2)] pointer-events-none"
        />
      )}

      {/* Official Logo Image / Badge */}
      {!imageError ? (
        spinningRing ? (
          <div
            className={cn(
              'relative z-10 flex items-center justify-center rounded-full bg-[#020812]/95 p-1 shadow-[0_4px_16px_rgba(0,0,0,0.85)]',
              badgeSizeClasses[size]
            )}
          >
            <img
              src={OFFICIAL_LOGO_IMAGE}
              alt="Logotipo oficial da Arllon Fernandes Barbearia - Estilo e Tradição"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-contain rounded-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] filter contrast-105 transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        ) : (
          <img
            src={OFFICIAL_LOGO_IMAGE}
            alt="Logotipo oficial da Arllon Fernandes Barbearia - Estilo e Tradição"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className={cn(
              'relative z-10 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)] filter contrast-105 transition-transform duration-500 ease-out group-hover:scale-[1.02]',
              sizeClasses[size]
            )}
          />
        )
      ) : (
        /* Fallback if external image is blocked */
        <div className="relative z-10 flex flex-col items-center justify-center p-3 border border-[#1688ff]/40 bg-[#082e5a]/80 backdrop-blur-md rounded-xl text-center">
          <span className="font-display font-extrabold tracking-wider text-white text-base uppercase">
            Arllon Fernandes
          </span>
          <span className="text-[10px] tracking-widest text-[#35a7ff] uppercase">
            Barbearia Premium
          </span>
        </div>
      )}

      {/* Subtle bottom glass reflection line (only when not spinning) */}
      {!spinningRing && (
        <div
          aria-hidden="true"
          className="absolute -bottom-2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#35a7ff]/40 to-transparent blur-[0.5px] pointer-events-none"
        />
      )}
    </div>
  );
};
