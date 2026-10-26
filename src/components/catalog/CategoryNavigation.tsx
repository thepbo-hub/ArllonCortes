import React, { useRef } from 'react';
import { CATEGORIES } from '../../data/categories';
import { CategoryId } from '../../data/services';
import {
  Scissors,
  Flame,
  Eye,
  Droplets,
  Palette,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface CategoryNavigationProps {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

const CATEGORY_ICONS: Record<CategoryId, React.ElementType> = {
  cabelo: Scissors,
  barba: Flame,
  'sobrancelha-acabamento': Eye,
  'limpeza-cuidados': Droplets,
  'coloracao-transformacao': Palette,
  'tratamentos-especiais': Sparkles,
};

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleClick = (id: CategoryId) => {
    onSelectCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for sticky navigation
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Filtro rápido por categorias de procedimentos"
      className="sticky top-16 z-30 w-full bg-[#020812]/92 backdrop-blur-xl border-b border-[#1688ff]/15 py-3 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id];
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleClick(cat.id)}
                className={cn(
                  'group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap shrink-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]',
                  isActive
                    ? 'bg-gradient-to-r from-[#082e5a] to-[#0b4278] text-white shadow-[0_0_16px_rgba(22,136,255,0.4)] border border-[#35a7ff]/60 scale-[1.02]'
                    : 'bg-[#05162d]/70 text-[#b7c4d3] hover:text-white hover:bg-[#082245] border border-[#1688ff]/15'
                )}
                aria-current={isActive ? 'true' : undefined}
              >
                <Icon
                  className={cn(
                    'w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-200',
                    isActive ? 'text-[#35a7ff]' : 'text-[#627d98] group-hover:text-[#b7c4d3]'
                  )}
                  aria-hidden="true"
                />
                <span>{cat.name}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#35a7ff] rounded-full shadow-[0_0_6px_#35a7ff]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
