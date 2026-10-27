import { useState, useMemo, useEffect, useCallback } from 'react';
import { SERVICES_BY_ID, ServiceItem } from '../data/services';

const STORAGE_KEY = 'arllon_barbearia_budget_selection_v1';

export interface BudgetState {
  selectedIds: string[];
  selectedServices: ServiceItem[];
  fixedPriceServices: ServiceItem[];
  quoteServices: ServiceItem[];
  subtotalCents: number;
  totalCount: number;
  hasQuoteServices: boolean;
  selectedVariants: Record<string, string>;
  setVariant: (serviceId: string, variantId: string) => void;
  getVariant: (serviceId: string) => string;
  isSelected: (id: string) => boolean;
  toggleService: (id: string) => void;
  addService: (id: string) => void;
  removeService: (id: string) => void;
  clearSelection: () => void;
}

export function useBudget(): BudgetState {
  // Inicializa sempre como vazio; não salva nem restaura seleções anteriores ao fechar o biosite
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Estado para variantes selecionadas (ex: 'hidratacao-cabelo-barba' -> 'cabelo' | 'barba' | 'ambos')
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    'hidratacao-cabelo-barba': 'ambos',
  });

  // Limpa qualquer dado residual de versões anteriores no localStorage
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const setVariant = useCallback((serviceId: string, variantId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [serviceId]: variantId,
    }));
  }, []);

  const getVariant = useCallback(
    (serviceId: string) => {
      return selectedVariants[serviceId] || 'ambos';
    },
    [selectedVariants]
  );

  const toggleService = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  }, []);

  const addService = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  const removeService = useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const isSelected = useCallback(
    (id: string) => selectedIds.includes(id),
    [selectedIds]
  );

  const selectedServices = useMemo(() => {
    return selectedIds
      .map((id) => SERVICES_BY_ID.get(id))
      .filter((s): s is ServiceItem => Boolean(s))
      .map((service) => {
        if (service.variants && service.variants.length > 0) {
          const currentVariantId = selectedVariants[service.id] || 'ambos';
          const activeVariant =
            service.variants.find((v) => v.id === currentVariantId) ||
            service.variants[0];
          if (activeVariant) {
            return {
              ...service,
              name: activeVariant.name,
              priceCents: activeVariant.priceCents,
            };
          }
        }
        return service;
      });
  }, [selectedIds, selectedVariants]);

  const fixedPriceServices = useMemo(() => {
    return selectedServices.filter(
      (s) => s.priceType === 'fixed' && s.priceCents !== null
    );
  }, [selectedServices]);

  const quoteServices = useMemo(() => {
    return selectedServices.filter(
      (s) => s.priceType === 'quote' || s.priceCents === null
    );
  }, [selectedServices]);

  const subtotalCents = useMemo(() => {
    return fixedPriceServices.reduce(
      (sum, s) => sum + (s.priceCents ?? 0),
      0
    );
  }, [fixedPriceServices]);

  const totalCount = selectedServices.length;
  const hasQuoteServices = quoteServices.length > 0;

  return {
    selectedIds,
    selectedServices,
    fixedPriceServices,
    quoteServices,
    subtotalCents,
    totalCount,
    hasQuoteServices,
    selectedVariants,
    setVariant,
    getVariant,
    isSelected,
    toggleService,
    addService,
    removeService,
    clearSelection,
  };
}
