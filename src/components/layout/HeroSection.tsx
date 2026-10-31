import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Pause, Play, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_VIDEO_CONFIG } from '../../config/heroVideo';

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Inicializa e força atributos de autoplay silencioso para garantir compatibilidade móvel (iOS / Android)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        console.info('Tentativa de autoplay bloqueada pelo navegador, acionando fallback silencioso:', err);
        video.muted = true;
        try {
          await video.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }
    };

    playVideo();

    // Desbloqueio alternativo na primeira interação do usuário (toque ou clique) em navegadores com restrições
    const handleFirstInteraction = () => {
      if (video && video.paused) {
        video.muted = true;
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('click', handleFirstInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

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
      className="relative w-full min-h-[75vh] sm:min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Edge-to-Edge Full-Width Video Background (Zero Margins) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#020812]">
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={HERO_VIDEO_CONFIG.posterSrc}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              console.warn('Vídeo não pôde ser carregado, exibindo poster institucional.');
              setVideoError(true);
            }}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            title={HERO_VIDEO_CONFIG.title}
          >
            <source src={HERO_VIDEO_CONFIG.videoSrc} type="video/mp4" />
          </video>
        ) : (
          /* High-End Ambient Fallback com o poster estático da barbearia se o vídeo falhar */
          <img
            src={HERO_VIDEO_CONFIG.posterSrc}
            alt="Logo da Arllon Fernandes Barbearia"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}

        {/* Aesthetic Color Gradient Overlays: preenchem o vídeo com profundidade e transição de tela limpa */}
        {/* 1. Ambient depth overlay - garante contraste perfeito para o texto e os botões sobre o vídeo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#020812]/50 via-[#020812]/65 to-[#020812] pointer-events-none"
        />

        {/* 2. Top soft vignette - transição suave com a barra de navegação superior */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-[#020812]/90 to-transparent pointer-events-none"
        />

        {/* 3. Bottom Seamless Color Gradient: degradê na parte inferior para uma transição suave e limpa para o catálogo */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-48 sm:h-72 bg-gradient-to-t from-[#020812] via-[#020812]/90 to-transparent pointer-events-none z-10"
        />

        {/* 4. Radial Vignette for clean focus and contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 25%, rgba(2, 8, 18, 0.45) 65%, #020812 100%)',
          }}
        />

        {/* 5. Interactive Cursor Spotlight (desktop) */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-0 pointer-events-none transition-opacity duration-700"
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
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-28 flex flex-col items-center">
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
