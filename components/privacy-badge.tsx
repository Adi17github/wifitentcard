import { ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PrivacyBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-flex items-start gap-2.5 rounded-xl border border-brand/25 bg-brand/8 px-3.5 py-2.5 text-sm text-foreground transition-all duration-300 hover:shadow-sm',
        className,
      )}
    >
      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
      <p className="text-pretty">
        <span className="font-semibold">100% Client-Side.</span>{' '}
        <span className="text-muted-foreground">Your WiFi credentials never leave your browser — no accounts, no uploads, no tracking.</span>
      </p>
    </div>
  )
}
