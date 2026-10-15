'use client'

import { useMemo, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { Download, Eye, Loader2, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PresetPicker } from '@/components/preset-picker'
import { PrintSheet } from '@/components/print-sheet'
import { PrivacyBadge } from '@/components/privacy-badge'
import { TentCardFace } from '@/components/tent-card-face'
import { WifiForm } from '@/components/wifi-form'
import {
  buildWifiString,
  CARD_PRESETS,
  DEFAULT_HEADLINE,
  isPresetHeadline,
  type CardTheme,
  type WifiConfig,
} from '@/lib/wifi'

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
  const previewRef = useRef<HTMLDivElement>(null)

  const wifiString = useMemo(() => buildWifiString(config), [config])
  const canExport = config.ssid.trim().length > 0

  const updateConfig = (patch: Partial<WifiConfig>) => setConfig((prev) => ({ ...prev, ...patch }))

  function handlePresetChange(next: CardTheme) {
    setTheme(next)
    const preset = CARD_PRESETS.find((p) => p.value === next)
    if (preset && isPresetHeadline(config.headline)) {
      updateConfig({ headline: preset.headline })
    }
  }

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

  function scrollToPreview() {
    previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section
        id="generator"
        aria-labelledby="generator-heading"
        className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-12 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:px-8 print:hidden"
      >
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 sm:p-7">
            <h2 id="generator-heading" className="mb-1 text-lg font-bold tracking-tight">
              Your network details
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">The preview updates as you type — everything stays on your device.</p>
            <WifiForm config={config} onChange={updateConfig} />
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 sm:p-7">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight">Card design</h2>
              <span className="text-xs font-medium text-muted-foreground">{CARD_PRESETS.length} templates</span>
            </div>
            <p className="mb-5 text-sm text-muted-foreground">Pick a template to match your space, then customize the text.</p>
            <PresetPicker value={theme} onChange={handlePresetChange} />
          </div>

          <PrivacyBadge />
        </div>

        <div
          ref={previewRef}
          id="preview"
          className="flex scroll-mt-20 flex-col gap-5 lg:sticky lg:top-20 lg:self-start"
        >
          <div className="rounded-2xl border bg-muted/60 p-4 transition-colors duration-300 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Live preview
              </h2>
              <span className="rounded-full border bg-background px-2.5 py-1 text-xs font-medium text-foreground shadow-xs">
                {CARD_PRESETS.find((p) => p.value === theme)?.label}
              </span>
            </div>

            <div className="rounded-xl bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_28px_70px_-20px_rgba(0,0,0,0.5)] dark:ring-white/10">
              <div ref={cardRef} className="overflow-hidden rounded-xl">
                <TentCardFace config={config} wifiString={wifiString} theme={theme} />
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Prints on a single A4 or US Letter sheet. Fold along the dashed line to stand it on a table.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              size="lg"
              className="h-12 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              onClick={() => window.print()}
              disabled={!canExport}
            >
              <Printer aria-hidden="true" />
              Print Tent Card
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 bg-background text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
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

          <details className="group rounded-lg border bg-background px-4 py-3 text-xs transition-colors duration-200 hover:border-foreground/20">
            <summary className="cursor-pointer select-none font-medium text-muted-foreground transition-colors hover:text-foreground">
              View encoded QR payload
            </summary>
            <code className="mt-2 block break-all font-mono text-foreground">
              {wifiString.replace(/P:(?:\\.|[^;])*;/, 'P:••••••••;')}
            </code>
          </details>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/90 px-4 py-3 backdrop-blur-md lg:hidden print:hidden">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
          <Button variant="outline" className="h-11 bg-background" onClick={scrollToPreview}>
            <Eye aria-hidden="true" />
            Preview Card
          </Button>
          <Button className="h-11" onClick={() => window.print()} disabled={!canExport}>
            <Printer aria-hidden="true" />
            Print Card
          </Button>
        </div>
      </div>

      <PrintSheet config={config} wifiString={wifiString} theme={theme} />
    </>
  )
}
