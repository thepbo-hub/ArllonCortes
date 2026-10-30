import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Pause, Play, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onExplore: () => void;
}

const CINEMATIC_VIDEO_URL = 'https://yourimageshare.com/ib/CufIM3MjZf.mp4';

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Respeita prefers-reduced-motion do sistema operacional (WCAG 2.1 AA)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsPlaying(false);
        videoRef.current?.pause();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      aria-label="Apresentação da Arllon Fernandes Barbearia"
      className="relative w-full min-h-[72vh] sm:min-h-[82vh] md:min-h-[88vh] flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Edge-to-Edge Full-Width Video Background (Zero Margins) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#020812]">
        {!videoError ? (
          <video
            ref={videoRef}
            src={CINEMATIC_VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-90 contrast-110"
          />
        ) : (
          /* High-End Ambient Fallback if video is unavailable */
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#082e5a] via-[#041426] to-[#020812]" />
        )}

        {/* Aesthetic Blue Color Gradient Overlays to make the biosite clean, modern and seamless */}
        {/* 1. Deep blue atmospheric tint */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#020812]/80 via-[#082e5a]/35 to-[#020812] pointer-events-none"
        />

        {/* 2. Top soft vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020812] to-transparent pointer-events-none"
        />

        {/* 3. Bottom seamless blend into page background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-48 sm:h-64 bg-gradient-to-t from-[#020812] via-[#020812]/85 to-transparent pointer-events-none"
        />

        {/* 4. Radial Vignette for clean focus and contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 25%, rgba(4, 20, 38, 0.45) 65%, #020812 100%)',
          }}
        />

        {/* 5. Interactive Cursor Spotlight */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle 500px at ${mousePos.x}% ${mousePos.y}%, rgba(22, 136, 255, 0.15), transparent 75%)`,
          }}
        />
      </div>

      {/* Accessible Video Pause/Play Control (WCAG 2.1 AA 2.2.2) */}
      {!videoError && (
        <div className="absolute top-4 right-4 z-30">
          <button
            type="button"
            onClick={toggleVideoPlayback}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#020812]/85 hover:bg-[#082e5a] border border-[#1688ff]/30 text-white text-xs font-semibold backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
            aria-label={isPlaying ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'}
            title={isPlaying ? 'Pausar animação de fundo' : 'Reproduzir animação de fundo'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#35a7ff]" aria-hidden="true" />
                <span className="hidden sm:inline">Pausar Vídeo</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#35a7ff]" aria-hidden="true" />
                <span className="hidden sm:inline">Reproduzir Vídeo</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Editorial Content Over Full-Width Video Banner */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 flex flex-col items-center">
        {/* Quiet Kicker Label (Zero-Pill Discipline) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#35a7ff] uppercase mb-4 drop-shadow-[0_2px_10px_rgba(22,136,255,0.5)]"
        >
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>CATÁLOGO DE SERVIÇOS</span>
        </motion.div>

        {/* Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.05] mb-6 max-w-3xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
          style={{ textWrap: 'balance' }}
        >
          SEU ESTILO.{' '}
          <span className="bg-gradient-to-r from-white via-[#b7c4d3] to-[#35a7ff] bg-clip-text text-transparent">
            SUAS ESCOLHAS.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-base sm:text-lg md:text-xl text-[#b7c4d3] max-w-2xl font-normal leading-relaxed mb-8 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]"
          style={{ textWrap: 'balance' }}
        >
          Explore nossos serviços, monte sua combinação e descubra o valor do seu atendimento.
        </motion.p>

        {/* Primary Action Button with Diagonal Light Glint */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col items-center gap-3"
        >
          <button
            onClick={onExplore}
            className="animate-shine group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#082e5a] via-[#0b4278] to-[#1688ff] text-white font-display font-semibold text-sm tracking-wider uppercase border border-[#35a7ff]/50 shadow-[0_4px_24px_rgba(22,136,255,0.45)] hover:shadow-[0_6px_36px_rgba(22,136,255,0.7)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
          >
            <span>EXPLORAR SERVIÇOS</span>
            <ArrowDown className="w-4 h-4 text-[#35a7ff] transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>

          {/* Informative notice requirement */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#8faec7]">
            <Info className="w-3.5 h-3.5 text-[#35a7ff] shrink-0" aria-hidden="true" />
            <span>Valores e estimativas de duração informativos, confirmados presencialmente.</span>
          </div>
        </motion.div>
      </div>

      {/* Subtle Metallic Divider Line at the bottom edge */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1688ff]/30 to-transparent z-20"
      />
    </section>
  );
};
