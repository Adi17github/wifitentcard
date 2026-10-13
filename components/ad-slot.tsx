import { cn } from '@/lib/utils'

type AdVariant = 'leaderboard' | 'in-feed' | 'rectangle'

const VARIANT_STYLES: Record<AdVariant, { box: string; size: string }> = {
  leaderboard: {
    box: 'h-[100px] w-full max-w-[320px] md:h-[90px] md:max-w-[728px]',
    size: '728 × 90 / 320 × 100',
  },
  'in-feed': {
    box: 'h-[250px] w-full max-w-[336px] sm:h-[120px] sm:max-w-[970px]',
    size: 'Responsive in-feed',
  },
  rectangle: {
    box: 'h-[250px] w-[300px]',
    size: '300 × 250',
  },
}

interface AdSlotProps {
  variant: AdVariant
  slotId: string
  className?: string
}

// Replace the inner placeholder with your <ins class="adsbygoogle" data-ad-slot={slotId} /> unit.
export function AdSlot({ variant, slotId, className }: AdSlotProps) {
  const styles = VARIANT_STYLES[variant]
  return (
    <aside aria-label="Advertisement" className={cn('flex flex-col items-center print:hidden', className)}>
      <span className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
        Sponsored / Advertisement
      </span>
      <div
        data-ad-slot={slotId}
        className={cn(
          'flex items-center justify-center rounded-lg border border-dashed bg-muted/50 text-xs text-muted-foreground/70 transition-colors duration-300',
          styles.box,
        )}
      >
        Ad space · {styles.size}
      </div>
    </aside>
  )
}
