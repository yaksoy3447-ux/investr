'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { CRM_STAGES } from '@/lib/constants';
import type { CRMStage } from '@/lib/types';
import { Clock, StickyNote, GripVertical, AlertTriangle } from 'lucide-react';
import { INVESTOR_TYPES } from '@/lib/constants';
import { formatRelativeTime, cn } from '@/lib/utils';
import { useCRM } from '@/components/providers/CRMProvider';
import { usePlan } from '@/components/providers/PlanProvider';
import { Link } from '@/i18n/routing';

function getTypeLabel(value: string, locale: string) {
  const item = INVESTOR_TYPES.find((t) => t.value === value);
  if (!item) return value;
  return locale === 'en' ? item.labelEn : item.labelTr;
}

export default function CRMPage() {
  const t = useTranslations('dashboard.crm');
  const locale = useLocale();
  const { items: crmItems, updateStage } = useCRM();
  const { limits } = usePlan();
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [overColumn, setOverColumn] = useState<string | null>(null);

  const crmUsed = crmItems.length;
  const crmMax = limits.maxCrmItems;
  const isNearLimit = crmUsed >= crmMax * 0.8;
  const isAtLimit = crmUsed >= crmMax;

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedId(itemId);
    e.dataTransfer.effectAllowed = 'move';
    // Make the drag image semi-transparent
    if (e.currentTarget instanceof HTMLElement) {
      e.dataTransfer.setDragImage(e.currentTarget, 20, 20);
    }
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, stageValue: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setOverColumn(stageValue);
  };

  const handleDragLeave = (e: React.DragEvent, stageValue: string) => {
    // Only clear if we're actually leaving the column (not entering a child)
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    const currentTarget = e.currentTarget as HTMLElement;
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      if (overColumn === stageValue) {
        setOverColumn(null);
      }
    }
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    if (!draggedId) return;

    updateStage(draggedId, targetStage as CRMStage);
    setDraggedId(null);
    setOverColumn(null);
  };

  return (
    <div className="space-y-6 animate-fade-in-up h-full flex flex-col">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-foreground">
          {t('title')}
        </h1>
        <p className="text-foreground-secondary text-sm mt-1">{t('subtitle')}</p>
      </div>

      {/* CRM Limit Banner */}
      {isNearLimit && (
        <div className={cn(
          'flex items-center justify-between px-4 py-3 rounded-xl border text-sm',
          isAtLimit
            ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-amber-50 border-amber-200 text-amber-700'
        )}>
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} />
            <span className="font-medium">
              {locale === 'en'
                ? `${crmUsed}/${crmMax} CRM records used${isAtLimit ? ' — Limit reached!' : ''}`
                : `${crmUsed}/${crmMax} CRM kaydı kullanıldı${isAtLimit ? ' — Limite ulaşıldı!' : ''}`}
            </span>
          </div>
          <Link
            href="/pricing"
            className="text-xs font-bold hover:underline"
          >
            {locale === 'en' ? 'Upgrade' : 'Yükselt'}
          </Link>
        </div>
      )}

      {/* Kanban Board */}
      <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
        {CRM_STAGES.map((stage) => {
          const stageItems = crmItems.filter((i) => i.crm_stage === stage.value);
          const isOver = overColumn === stage.value;

          return (
            <div
              key={stage.value}
              onDragOver={(e) => handleDragOver(e, stage.value)}
              onDragLeave={(e) => handleDragLeave(e, stage.value)}
              onDrop={(e) => handleDrop(e, stage.value)}
              className={cn(
                'flex-shrink-0 w-[280px] flex flex-col rounded-2xl border transition-all duration-200',
                isOver
                  ? 'border-primary/40 bg-primary/[0.04] shadow-md scale-[1.01]'
                  : 'border-glass-border bg-background-tertiary/30'
              )}
            >
              {/* Column Header */}
              <div className="px-4 py-3 border-b border-glass-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <h3 className="text-sm font-semibold text-foreground">{locale === 'en' ? stage.labelEn : stage.labelTr}</h3>
                </div>
                <span className="w-6 h-6 rounded-full bg-background-tertiary text-foreground-muted text-xs flex items-center justify-center font-medium">
                  {stageItems.length}
                </span>
              </div>

              {/* Column Body */}
              <div className="flex-1 p-2.5 space-y-2 min-h-[200px] overflow-y-auto">
                {stageItems.length === 0 ? (
                  <div
                    className={cn(
                      'flex items-center justify-center h-32 rounded-xl border-2 border-dashed transition-all',
                      isOver
                        ? 'border-primary/30 bg-primary/[0.03]'
                        : 'border-glass-border'
                    )}
                  >
                    <span className="text-xs text-foreground-muted">
                      {isOver ? (locale === 'en' ? '↓ Drop' : '↓ Bırak') : (locale === 'en' ? 'Drag here' : 'Buraya sürükle')}
                    </span>
                  </div>
                ) : (
                  stageItems.map((item) => {
                    const investor = item.investor;
                    const isDragging = draggedId === item.id;

                    return (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        onDragEnd={handleDragEnd}
                        className={cn(
                          'bg-white rounded-xl border border-glass-border p-3.5 transition-all cursor-grab active:cursor-grabbing select-none',
                          isDragging
                            ? 'opacity-40 scale-95 shadow-none'
                            : 'hover:shadow-sm hover:border-primary/10'
                        )}
                      >
                        <div className="flex items-start gap-2">
                          {/* Drag handle */}
                          <div className="pt-1 text-foreground-muted/30 hover:text-foreground-muted transition-colors flex-shrink-0">
                            <GripVertical size={14} />
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Name + Company */}
                            <div className="flex items-start gap-2.5 mb-2.5">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/15 to-primary-dark/15 border border-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-primary-dark font-bold text-[10px]">
                                  {investor?.name.split(' ').map((n) => n[0]).join('') || '??'}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-sm font-semibold text-foreground truncate">
                                  {investor?.name || (locale === 'en' ? 'Unknown' : 'Bilinmeyen')}
                                </h4>
                                <p className="text-[11px] text-foreground-muted truncate">
                                  {investor?.company || ''}
                                </p>
                              </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-2.5">
                              {investor?.investor_type.slice(0, 1).map((type) => (
                                <span key={type} className="px-2 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary-dark font-medium">
                                  {getTypeLabel(type, locale)}
                                </span>
                              ))}
                              {investor?.sectors.slice(0, 1).map((sector) => (
                                <span key={sector} className="px-2 py-0.5 text-[10px] rounded-full bg-background-tertiary text-foreground-muted capitalize">
                                  {sector}
                                </span>
                              ))}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between text-[11px] text-foreground-muted">
                              <span className="flex items-center gap-1">
                                <Clock size={10} /> {formatRelativeTime(item.added_at, locale)}
                              </span>
                              {item.notes && (
                                <span className="flex items-center gap-1 text-primary-dark">
                                  <StickyNote size={10} /> {locale === 'en' ? 'Note' : 'Not'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
