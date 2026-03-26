'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { INVESTOR_TYPES, SECTORS, INVESTMENT_STAGES, LOCATIONS } from '@/lib/constants';
import { getInvestors } from '@/lib/db/investors';
import InvestorCard from '@/components/investors/InvestorCard';
import InvestorFilters from '@/components/investors/InvestorFilters';
import { cn } from '@/lib/utils';
import type { Investor } from '@/lib/types';

export default function InvestorsPage() {
  const t = useTranslations('dashboard.investors');
  const tFilters = useTranslations('investors.filters');
  const locale = useLocale();
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    types: [] as string[],
    sectors: [] as string[],
    stages: [] as string[],
    locations: [] as string[],
  });

  // Fetch investors from Supabase
  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      setLoading(true);
      const data = await getInvestors({
        types: filters.types.length > 0 ? filters.types : undefined,
        sectors: filters.sectors.length > 0 ? filters.sectors : undefined,
        stages: filters.stages.length > 0 ? filters.stages : undefined,
        locations: filters.locations.length > 0 ? filters.locations : undefined,
      });
      if (!cancelled) {
        setInvestors(data);
        setLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, [filters]);

  const activeFilterCount =
    filters.types.length +
    filters.sectors.length +
    filters.stages.length +
    filters.locations.length;

  // Client-side search for instant feedback
  const filteredInvestors = useMemo(() => {
    if (!search) return investors;
    const q = search.toLowerCase();
    return investors.filter((inv) =>
      inv.name.toLowerCase().includes(q) ||
      (inv.company && inv.company.toLowerCase().includes(q)) ||
      inv.sectors.some((s) => s.toLowerCase().includes(q))
    );
  }, [search, investors]);

  const clearFilters = () => {
    setFilters({
      types: [],
      sectors: [],
      stages: [],
      locations: [],
    });
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-foreground">
            {t('title')}
          </h1>
          <p className="text-foreground-secondary text-sm mt-1">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('subtitle').substring(0, 40) + '...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-white text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all',
              showFilters
                ? 'border-primary/30 bg-primary/5 text-primary-dark'
                : 'border-glass-border bg-white text-foreground-secondary hover:bg-background-tertiary'
            )}
          >
            <SlidersHorizontal size={16} />
            {locale === 'en' ? 'Filters' : 'Filtreler'}
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Filter Sidebar */}
        {showFilters && (
          <InvestorFilters
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
            activeFilterCount={activeFilterCount}
            investorTypes={INVESTOR_TYPES}
            sectors={SECTORS}
            stages={INVESTMENT_STAGES}
            locations={LOCATIONS}
            locale={locale}
            labels={{
              title: tFilters('type') ? locale === 'en' ? 'Filters' : 'Filtreler' : 'Filtreler',
              clear: locale === 'en' ? 'Clear' : 'Temizle',
              type: tFilters('type'),
              sector: tFilters('sector'),
              stage: tFilters('stage'),
              location: tFilters('location'),
            }}
          />
        )}

        {/* Investor Grid */}
        <div className="flex-1">
          {filteredInvestors.length === 0 ? (
            <div className="bg-white rounded-2xl border border-glass-border p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-background-tertiary flex items-center justify-center">
                <Search size={24} className="text-foreground-muted" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{locale === 'en' ? 'No results found' : 'Sonuç bulunamadı'}</h3>
              <p className="text-foreground-secondary text-sm">
                {locale === 'en' ? 'Try changing your filters.' : 'Filtreleri değiştirerek tekrar deneyin.'}
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-sm text-primary-dark font-medium hover:underline"
              >
                {locale === 'en' ? 'Clear filters' : 'Filtreleri temizle'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredInvestors.map((investor, index) => (
                <InvestorCard key={investor.id} investor={investor} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
