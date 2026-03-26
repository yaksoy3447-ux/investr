'use client';

import { useDroppable } from '@dnd-kit/core';
import type { InvestorListItem } from '@/lib/types';
import CRMCard from './CRMCard';

type StageConfig = {
  value: string;
  labelTr: string;
  labelEn: string;
  color: string;
};

type Props = {
  stage: StageConfig;
  items: InvestorListItem[];
  count: number;
};

export default function CRMColumn({ stage, items, count }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.value,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-shrink-0 w-[280px] flex flex-col rounded-2xl border transition-all duration-200 ${
        isOver
          ? 'border-primary/40 bg-primary/[0.03] shadow-md'
          : 'border-glass-border bg-background-tertiary/30'
      }`}
    >
      {/* Column Header */}
      <div className="px-4 py-3 border-b border-glass-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: stage.color }}
          />
          <h3 className="text-sm font-semibold text-foreground">{stage.labelTr}</h3>
        </div>
        <span className="w-6 h-6 rounded-full bg-background-tertiary text-foreground-muted text-xs flex items-center justify-center font-medium">
          {count}
        </span>
      </div>

      {/* Column Body */}
      <div className="flex-1 p-2.5 space-y-2 min-h-[200px] overflow-y-auto">
        {items.length === 0 ? (
          <div className={`flex items-center justify-center h-32 rounded-xl border-2 border-dashed transition-colors ${
            isOver ? 'border-primary/30 bg-primary/[0.02]' : 'border-glass-border'
          }`}>
            <span className="text-xs text-foreground-muted">Buraya sürükle</span>
          </div>
        ) : (
          items.map((item) => (
            <CRMCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}
