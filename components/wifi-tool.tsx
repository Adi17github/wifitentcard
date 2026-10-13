'use client'

import { useMemo, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { Download, Loader2, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PrintSheet } from '@/components/print-sheet'
import { PrivacyBadge } from '@/components/privacy-badge'
import { TentCardFace } from '@/components/tent-card-face'
import { WifiForm } from '@/components/wifi-form'
import { cn } from '@/lib/utils'
import { buildWifiString, DEFAULT_HEADLINE, type CardTheme, type WifiConfig } from '@/lib/wifi'

const THEME_OPTIONS: { value: CardTheme; label: string; swatch: string }[] = [
  { value: 'minimal', label: 'Minimalist Modern', swatch: 'bg-white ring-neutral-300' },
  { value: 'cozy', label: 'Cozy Airbnb', swatch: 'bg-[#FBF3E8] ring-[#C0573A]' },
  { value: 'cafe', label: 'Cafe & Retail', swatch: 'bg-[#24180F] ring-[#E5B04A]' },
]

export function WifiTool() {
  const [config, setConfig] = useState<WifiConfig>({
    ssid: '',
    password: '',
    security: 'WPA',
    hidden: false,
    headline: DEFAULT_HEADLINE,
    showPassword: true,
  })
  const [theme, setTheme] = useState<CardTheme>('minimal')
  const [downloading, setDownloading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const wifiString = useMemo(() => buildWifiString(config), [config])
  const canExport = config.ssid.trim().length > 0

  const updateConfig = (patch: Partial<WifiConfig>) => setConfig((prev) => ({ ...prev, ...patch }))

  async function handleDownload() {
    if (!cardRef.current) return
    setDownloading(true)
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, cacheBust: true })
      const link = document.createElement('a')
      const safeName = config.ssid.trim().replace(/[^a-z0-9-_]+/gi, '-') || 'wifi'
      link.download = `${safeName}-tent-card.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('PNG export failed', error)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <>
      <section
        id="generator"
        aria-labelledby="generator-heading"
        className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:px-8 print:hidden"
      >
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7">
            <h2 id="generator-heading" className="mb-1 text-lg font-semibold tracking-tight">
              Your network details
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">The preview updates as you type.</p>
            <WifiForm config={config} onChange={updateConfig} />
          </div>
          <PrivacyBadge />
        </div>

        <div className="flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border bg-muted/60 p-4 sm:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Live preview
              </h2>
              <div role="radiogroup" aria-label="Card theme" className="flex flex-wrap gap-1.5">
                {THEME_OPTIONS.map((option) => {
                  const checked = theme === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={checked}
                      onClick={() => setTheme(option.value)}
                      className={cn(
                        'inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                        checked && 'border-foreground text-foreground',
                      )}
                    >
                      <span className={cn('size-3 rounded-full ring-2', option.swatch)} aria-hidden="true" />
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
              <div ref={cardRef} className="overflow-hidden rounded-xl">
                <TentCardFace config={config} wifiString={wifiString} theme={theme} />
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Prints on a single A4 or US Letter sheet. Fold along the center line to stand it up.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button size="lg" className="h-12 text-sm" onClick={() => window.print()} disabled={!canExport}>
              <Printer aria-hidden="true" />
              Print Tent Card
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 bg-background text-sm"
              onClick={handleDownload}
              disabled={!canExport || downloading}
            >
              {downloading ? (
                <Loader2 className="animate-spin" aria-hidden="true" />
              ) : (
                <Download aria-hidden="true" />
              )}
              Download PNG
            </Button>
          </div>
          {!canExport && (
            <p className="-mt-2 text-center text-xs text-muted-foreground" role="status">
              Enter a network name to enable printing and downloads.
            </p>
          )}

          <details className="group rounded-lg border bg-background px-4 py-3 text-xs">
            <summary className="cursor-pointer select-none font-medium text-muted-foreground">
              View encoded QR payload
            </summary>
            <code className="mt-2 block break-all font-mono text-foreground">
              {wifiString.replace(/P:(?:\\.|[^;])*;/, 'P:••••••••;')}
            </code>
          </details>
        </div>
      </section>

      <PrintSheet config={config} wifiString={wifiString} theme={theme} />
    </>
  )
}
