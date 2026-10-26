import React, { useState } from 'react';
import { cn } from '../../lib/utils';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showHalo?: boolean;
}

export const OFFICIAL_LOGO_IMAGE = 'https://i.postimg.cc/KjMhxPpV/Logo-ARLLON-FERNANDES-BARBEARIA.png';

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className,
  size = 'md',
  showHalo = true,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'h-9 w-auto max-w-[130px]',
    md: 'h-12 w-auto max-w-[160px]',
    lg: 'h-20 w-auto max-w-[240px]',
    hero: 'h-28 sm:h-36 md:h-44 w-auto max-w-[320px] sm:max-w-[420px]',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center group select-none', className)}>
      {/* Ambient Blue Halo Backlight */}
      {showHalo && (
        <div
          aria-hidden="true"
          className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#082e5a]/60 via-[#1688ff]/30 to-[#35a7ff]/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none animate-breathe"
        />
      )}

      {/* Raised physical emblem pedestal shadow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl shadow-[0_12px_36px_rgba(4,20,38,0.9),0_0_20px_rgba(22,136,255,0.2)] pointer-events-none"
      />

      {/* Official Logo Image */}
      {!imageError ? (
        <img
          src={OFFICIAL_LOGO_IMAGE}
          alt="Arllon Fernandes Barbearia - Logotipo Oficial"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className={cn(
            'relative z-10 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)] filter contrast-105 transition-transform duration-500 ease-out group-hover:scale-[1.02]',
            sizeClasses[size]
          )}
        />
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

      {/* Subtle bottom glass reflection line */}
      <div
        aria-hidden="true"
        className="absolute -bottom-2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#35a7ff]/40 to-transparent blur-[0.5px] pointer-events-none"
      />
    </div>
  );
};
