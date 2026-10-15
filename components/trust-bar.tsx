import { Printer, ShieldCheck, Star } from 'lucide-react'

const BADGES = [
  { Icon: Printer, text: '50,000+ cards generated & printed' },
  { Icon: ShieldCheck, text: '100% client-side: zero data stored' },
  { Icon: Star, text: '4.9/5 host rating (Airbnb, Vrbo & cafés)' },
]

export function TrustBar() {
  return (
    <ul aria-label="Why hosts trust us" className="mt-8 flex flex-wrap gap-2.5 print:hidden">
      {BADGES.map(({ Icon, text }) => (
        <li
          key={text}
          className="inline-flex items-center gap-2 rounded-full border bg-card/80 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-xs backdrop-blur-sm transition-all duration-300 hover:shadow-sm sm:text-sm"
        >
          <Icon className="size-3.5 shrink-0 text-brand sm:size-4" aria-hidden="true" />
          {text}
        </li>
      ))}
    </ul>
  )
}
