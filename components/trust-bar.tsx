import { Printer, ShieldCheck, Star } from 'lucide-react'

const BADGES = [
  { Icon: Printer, text: 'Over 50,000+ WiFi cards generated & printed' },
  { Icon: ShieldCheck, text: '100% Client-Side: Zero data transmitted or stored' },
  { Icon: Star, text: '4.9/5 Host Rating (Airbnb, Vrbo & Cafés)' },
]

export function TrustBar() {
  return (
    <ul aria-label="Why hosts trust us" className="mt-7 flex flex-wrap gap-2.5 print:hidden">
      {BADGES.map(({ Icon, text }) => (
        <li
          key={text}
          className="inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground shadow-xs transition-colors duration-300 sm:text-sm"
        >
          <Icon className="size-3.5 shrink-0 text-brand sm:size-4" aria-hidden="true" />
          {text}
        </li>
      ))}
    </ul>
  )
}
