import { useState, useEffect, useCallback } from 'react';
import { useBudget } from './hooks/useBudget';
import { CATEGORIES } from './data/categories';
import { CategoryId } from './data/services';
import { SiteHeader } from './components/layout/SiteHeader';
import { HeroSection } from './components/layout/HeroSection';
import { CategoryNavigation } from './components/catalog/CategoryNavigation';
import { ServiceCategory } from './components/catalog/ServiceCategory';
import { FloatingBudgetBar } from './components/budget/FloatingBudgetBar';
import { BudgetSummary } from './components/budget/BudgetSummary';
import { SiteFooter } from './components/layout/SiteFooter';
import { LegalModal, LegalDocType } from './components/legal/LegalModal';
import { CookieConsentBanner } from './components/legal/CookieConsentBanner';

export default function App() {
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('cabelo');

  // Controle dos Documentos Legais (LGPD, Termos de Uso, Política de Cookies)
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>('privacy');
  
  // Controle do Banner de Consentimento de Cookies
  const [isCookieForceOpen, setIsCookieForceOpen] = useState(false);

  const {
    selectedServices,
    fixedPriceServices,
    quoteServices,
    subtotalCents,
    totalCount,
    hasQuoteServices,
    isSelected,
    getVariant,
    setVariant,
    toggleService,
    removeService,
    clearSelection,
  } = useBudget();

  // Handle smooth scroll from Hero to first category
  const handleExplore = useCallback(() => {
    const el = document.getElementById('cabelo');
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  const handleOpenLegal = useCallback((doc: LegalDocType) => {
    setActiveLegalDoc(doc);
    setIsLegalOpen(true);
  }, []);

  // Update active category on scroll with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id as CategoryId);
          }
        });
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0,
      }
    );

    CATEGORIES.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#020812] text-white flex flex-col selection:bg-[#1688ff] selection:text-white">
      {/* WCAG 2.1 AA: Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-[#1688ff] focus:text-white focus:font-bold focus:shadow-[0_0_20px_rgba(22,136,255,0.7)] focus:outline-none"
      >
        Pular para o conteúdo principal
      </a>

      {/* Top Navigation Bar */}
      <SiteHeader
        totalCount={totalCount}
        subtotalCents={subtotalCents}
        onOpenBudget={() => setIsBudgetOpen(true)}
      />

      {/* Hero Section */}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <HeroSection onExplore={handleExplore} />

        {/* Category Navigation Bar */}
        <CategoryNavigation
          activeCategory={activeCategory}
          onSelectCategory={(id) => setActiveCategory(id)}
        />

        {/* Catalog Categories Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-28">
          {CATEGORIES.map((category) => (
            <ServiceCategory
              key={category.id}
              category={category}
              isSelected={isSelected}
              getVariant={getVariant}
              onToggleService={toggleService}
              onSelectVariant={setVariant}
            />
          ))}
        </div>
      </main>

      {/* Persistent Floating Budget Bar */}
      <FloatingBudgetBar
        totalCount={totalCount}
        subtotalCents={subtotalCents}
        hasQuoteServices={hasQuoteServices}
        quoteCount={quoteServices.length}
        onOpenBudget={() => setIsBudgetOpen(true)}
      />

      {/* Full Budget Summary Drawer */}
      <BudgetSummary
        isOpen={isBudgetOpen}
        onClose={() => setIsBudgetOpen(false)}
        selectedServices={selectedServices}
        fixedPriceServices={fixedPriceServices}
        quoteServices={quoteServices}
        subtotalCents={subtotalCents}
        totalCount={totalCount}
        hasQuoteServices={hasQuoteServices}
        onRemoveService={removeService}
        onClearSelection={clearSelection}
        onOpenPrivacy={() => handleOpenLegal('privacy')}
      />

      {/* Site Footer with Legal Links & Disclaimers */}
      <SiteFooter
        onOpenLegal={handleOpenLegal}
        onOpenCookiePreferences={() => setIsCookieForceOpen(true)}
      />

      {/* Central Legal & LGPD Modal (Privacy, Terms, Cookies) */}
      <LegalModal
        isOpen={isLegalOpen}
        activeDoc={activeLegalDoc}
        onClose={() => setIsLegalOpen(false)}
        onSelectDoc={(doc) => setActiveLegalDoc(doc)}
        onOpenPreferences={() => setIsCookieForceOpen(true)}
      />

      {/* LGPD Cookie Consent Banner with Prior Blocking */}
      <CookieConsentBanner
        onOpenPolicy={() => handleOpenLegal('cookies')}
        forceOpen={isCookieForceOpen}
        onCloseForceOpen={() => setIsCookieForceOpen(false)}
      />
    </div>
  );
}
