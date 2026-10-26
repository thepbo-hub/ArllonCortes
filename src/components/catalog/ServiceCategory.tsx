import React from 'react';
import { CategoryInfo } from '../../data/categories';
import { SERVICES_BY_ID, ServiceItem } from '../../data/services';
import { ServiceCard } from './ServiceCard';

interface ServiceCategoryProps {
  category: CategoryInfo;
  isSelected: (id: string) => boolean;
  onToggleService: (id: string) => void;
}

export const ServiceCategory: React.FC<ServiceCategoryProps> = ({
  category,
  isSelected,
  onToggleService,
}) => {
  const services: ServiceItem[] = category.serviceIds
    .map((id) => SERVICES_BY_ID.get(id))
    .filter((s): s is ServiceItem => Boolean(s));

  return (
    <section
      id={category.id}
      aria-labelledby={`heading-${category.id}`}
      className="scroll-mt-28 py-10 sm:py-14 border-b border-[#1688ff]/10 last:border-b-0"
    >
      {/* Category Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#35a7ff] uppercase tracking-wider mb-1.5">
            <span>{category.tagline}</span>
            <span aria-hidden="true">·</span>
            <span>{services.length} opções</span>
          </div>

          <h2
            id={`heading-${category.id}`}
            className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white"
          >
            {category.name}
          </h2>

          <p className="mt-1 text-sm text-[#b7c4d3] max-w-xl">
            {category.description}
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {services.map((service) => (
          <ServiceCard
            key={`${category.id}-${service.id}`}
            service={service}
            isSelected={isSelected(service.id)}
            onToggle={onToggleService}
          />
        ))}
      </div>
    </section>
  );
};
