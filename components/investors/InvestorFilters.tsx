'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

type FilterConfig = {
  value: string;
  labelTr: string;
  labelEn: string;
};

type Filters = {
  types: string[];
  sectors: string[];
  stages: string[];
  locations: string[];
};

type Props = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  clearFilters: () => void;
  activeFilterCount: number;
  investorTypes: readonly FilterConfig[];
  sectors: readonly FilterConfig[];
  stages: readonly FilterConfig[];
  locations: readonly FilterConfig[];
  locale: string;
  labels: {
    title: string;
    clear: string;
    type: string;
    sector: string;
    stage: string;
    location: string;
  };
};

function FilterSection({
  title,
  items,
  selectedValues,
  onToggle,
  locale,
}: {
  title: string;
  items: readonly FilterConfig[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  locale: string;
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2.5">
        {title}
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => {
          const isSelected = selectedValues.includes(item.value);
          return (
            <button
              key={item.value}
              onClick={() => onToggle(item.value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                isSelected
                  ? 'bg-primary/10 text-primary-dark border border-primary/20'
                  : 'bg-background-tertiary text-foreground-secondary hover:bg-background-tertiary/80 border border-transparent'
              )}
            >
              {locale === 'en' ? item.labelEn : item.labelTr}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function InvestorFilters({
  filters,
  setFilters,
  clearFilters,
  activeFilterCount,
  investorTypes,
  sectors,
  stages,
  locations,
  locale,
  labels,
}: Props) {
  const toggleFilter = (key: keyof Filters, value: string) => {
    const current = filters[key] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilters({ ...filters, [key]: updated });
  };

  return (
    <div className="w-64 flex-shrink-0 animate-slide-in-left">
      <div className="bg-white rounded-2xl border border-glass-border p-5 space-y-5 sticky top-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground text-sm">{labels.title}</h3>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-primary-dark hover:underline"
            >
              <X size={12} /> {labels.clear}
            </button>
          )}
        </div>

        {/* Filter Sections */}
        <FilterSection
          title={labels.type}
          items={investorTypes}
          selectedValues={filters.types}
          onToggle={(v) => toggleFilter('types', v)}
          locale={locale}
        />

        <FilterSection
          title={labels.sector}
          items={sectors}
          selectedValues={filters.sectors}
          onToggle={(v) => toggleFilter('sectors', v)}
          locale={locale}
        />

        <FilterSection
          title={labels.stage}
          items={stages}
          selectedValues={filters.stages}
          onToggle={(v) => toggleFilter('stages', v)}
          locale={locale}
        />

        <FilterSection
          title={labels.location}
          items={locations}
          selectedValues={filters.locations}
          onToggle={(v) => toggleFilter('locations', v)}
          locale={locale}
        />

        {/* Verified Only (Removed) */}
      </div>
    </div>
  );
}
