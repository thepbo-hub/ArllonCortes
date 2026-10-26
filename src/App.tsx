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

export default function App() {
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('cabelo');

  const {
    selectedServices,
    fixedPriceServices,
    quoteServices,
    subtotalCents,
    totalCount,
    hasQuoteServices,
    isSelected,
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
      {/* Top Navigation Bar */}
      <SiteHeader
        totalCount={totalCount}
        subtotalCents={subtotalCents}
        onOpenBudget={() => setIsBudgetOpen(true)}
      />

      {/* Hero Section */}
      <main className="flex-1">
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
              onToggleService={toggleService}
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
      />

      {/* Site Footer */}
      <SiteFooter />
    </div>
  );
}
