import { SeoContent } from '@/components/seo-content'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { WifiTool } from '@/components/wifi-tool'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8 lg:pt-16 print:hidden">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand">
            Free printable generator
          </p>
          <h1 className="max-w-3xl text-balance font-serif text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            WiFi QR Tent Card Generator
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Create a fold-over table card guests can scan to join your WiFi instantly. Perfect for rentals, cafes,
            offices, and events.
          </p>
        </div>
        <WifiTool />
        <SeoContent />
      </main>
      <SiteFooter />
    </>
  )
}
