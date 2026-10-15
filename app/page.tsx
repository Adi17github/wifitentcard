import { AdSlot } from '@/components/ad-slot'
import { SeoContent } from '@/components/seo-content'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { TrustBar } from '@/components/trust-bar'
import { WifiTool } from '@/components/wifi-tool'

export default function Page() {
  return (
    <div className="pb-20 lg:pb-0 print:pb-0">
      <SiteHeader />
      <main>
        <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8 lg:pt-20 print:hidden">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card/50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand shadow-xs backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-brand animate-pulse" aria-hidden="true" />
            Free · No sign-up · Private
          </div>
          <h1 className="max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.75rem]">
            WiFi QR Tent Card Generator
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Create a fold-over table card guests can scan to join your WiFi instantly — no app, no typing, no
            hassle. Perfect for Airbnb rentals, cafes, hotels, offices, and parties.
          </p>
          <TrustBar />
        </div>

        <AdSlot variant="leaderboard" slotId="leaderboard-top" className="mx-auto mb-10 px-4" />

        <WifiTool />

        <AdSlot variant="in-feed" slotId="in-feed-mid" className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8" />

        <SeoContent />
      </main>
      <SiteFooter />
    </div>
  )
}
