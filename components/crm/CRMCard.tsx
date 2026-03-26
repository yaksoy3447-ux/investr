'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Clock, StickyNote, GripVertical } from 'lucide-react';
import type { InvestorListItem } from '@/lib/types';
import { formatRelativeTime, cn } from '@/lib/utils';
import { INVESTOR_TYPES } from '@/lib/constants';

function getTypeLabel(value: string) {
  return INVESTOR_TYPES.find((t) => t.value === value)?.labelTr || value;
}

export default function CRMCard({
  item,
  isOverlay = false,
}: {
  item: InvestorListItem;
  isOverlay?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
  });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  const investor = item.investor;

  if (isOverlay) {
    return (
      <div className="bg-white rounded-xl border border-primary/20 p-3.5 shadow-xl w-[260px] cursor-grabbing">
        <div className="flex items-start gap-2.5 mb-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/15 to-primary-dark/15 border border-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary-dark font-bold text-[10px]">
              {investor?.name.split(' ').map((n) => n[0]).join('') || '??'}
            </span>
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-foreground truncate">
              {investor?.name || 'Bilinmeyen'}
            </h4>
            <p className="text-[11px] text-foreground-muted truncate">
              {investor?.company || ''}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-2.5">
          {investor?.investor_type.slice(0, 1).map((type) => (
            <span key={type} className="px-2 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary-dark font-medium">
              {getTypeLabel(type)}
            </span>
          ))}
          {investor?.sectors.slice(0, 1).map((sector) => (
            <span key={sector} className="px-2 py-0.5 text-[10px] rounded-full bg-background-tertiary text-foreground-muted capitalize">
              {sector}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'bg-white rounded-xl border border-glass-border p-3.5 transition-all group',
        isDragging
          ? 'opacity-30 shadow-none'
          : 'hover:shadow-sm hover:border-primary/10'
      )}
    >
      {/* Drag handle + content */}
      <div className="flex items-start gap-2">
        {/* Drag handle */}
        <div
          {...listeners}
          {...attributes}
          className="pt-1 cursor-grab active:cursor-grabbing text-foreground-muted/30 hover:text-foreground-muted transition-colors flex-shrink-0"
        >
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
                {investor?.name || 'Bilinmeyen'}
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
                {getTypeLabel(type)}
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
            {item.last_contacted ? (
              <span className="flex items-center gap-1">
                <Clock size={10} /> {formatRelativeTime(item.last_contacted)}
              </span>
            ) : (
              <span className="text-foreground-muted/50">Henüz iletişim yok</span>
            )}

            {item.notes && (
              <span className="flex items-center gap-1 text-primary-dark">
                <StickyNote size={10} /> Not
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
