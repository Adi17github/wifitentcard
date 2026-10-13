import { QRCodeSVG } from 'qrcode.react'
import { Coffee, Home, Wifi } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CardTheme, WifiConfig } from '@/lib/wifi'

interface TentCardFaceProps {
  config: WifiConfig
  wifiString: string
  theme: CardTheme
  className?: string
}

const THEMES: Record<
  CardTheme,
  {
    root: string
    headline: string
    accent: string
    label: string
    value: string
    qrWrap: string
    fg: string
    Icon: typeof Wifi
    tagline: string
  }
> = {
  minimal: {
    root: 'bg-white text-neutral-950 font-sans',
    headline: 'font-sans font-semibold tracking-tight',
    accent: 'text-neutral-950',
    label: 'text-neutral-500 uppercase tracking-[0.18em]',
    value: 'font-mono font-medium text-neutral-950',
    qrWrap: 'bg-white ring-1 ring-neutral-200',
    fg: '#0a0a0a',
    Icon: Wifi,
    tagline: 'Point your camera at the code',
  },
  cozy: {
    root: 'bg-[#FBF3E8] text-[#3B2A20] font-sans',
    headline: 'font-serif font-medium italic',
    accent: 'text-[#C0573A]',
    label: 'text-[#9A6F55] uppercase tracking-[0.18em]',
    value: 'font-mono font-medium text-[#3B2A20]',
    qrWrap: 'bg-white ring-1 ring-[#EAD9C4]',
    fg: '#3B2A20',
    Icon: Home,
    tagline: 'Make yourself at home',
  },
  cafe: {
    root: 'bg-[#24180F] text-[#F6EBDC] font-sans',
    headline: 'font-serif font-semibold',
    accent: 'text-[#E5B04A]',
    label: 'text-[#C9B69C] uppercase tracking-[0.18em]',
    value: 'font-mono font-medium text-[#F6EBDC]',
    qrWrap: 'bg-[#F6EBDC]',
    fg: '#24180F',
    Icon: Coffee,
    tagline: 'Free WiFi for our guests',
  },
}

export function TentCardFace({ config, wifiString, theme, className }: TentCardFaceProps) {
  const t = THEMES[theme]
  const { Icon } = t
  const hasSsid = config.ssid.trim().length > 0
  const showPassword = config.showPassword && config.security !== 'nopass'

  return (
    <div
      className={cn('@container relative aspect-[190/127] w-full overflow-hidden', t.root, className)}
    >
      {theme === 'cozy' && (
        <div
          aria-hidden="true"
          className="absolute inset-[2.5cqw] rounded-[2cqw] border-[0.35cqw] border-dashed border-[#E2C9AC]"
        />
      )}
      {theme === 'cafe' && (
        <div
          aria-hidden="true"
          className="absolute inset-[2.5cqw] border-[0.25cqw] border-[#E5B04A]/60"
        />
      )}
      {theme === 'minimal' && (
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[1.2cqw] bg-neutral-950" />
      )}

      <div className="relative flex h-full items-center gap-[6cqw] px-[8cqw] py-[7cqw]">
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className={cn('mb-[2.5cqw] flex items-center gap-[1.5cqw]', t.accent)}>
            <Icon className="size-[4cqw]" strokeWidth={2} aria-hidden="true" />
            <span className="text-[2.1cqw] font-semibold uppercase tracking-[0.2em]">{t.tagline}</span>
          </div>

          <h2 className={cn('text-balance text-[5.6cqw] leading-[1.08]', t.headline)}>
            {config.headline || '\u00A0'}
          </h2>

          <dl className="mt-[4.5cqw] flex flex-col gap-[2.6cqw]">
            <div>
              <dt className={cn('text-[1.9cqw] font-semibold', t.label)}>Network</dt>
              <dd className={cn('mt-[0.6cqw] break-all text-[3.4cqw] leading-tight', t.value)}>
                {hasSsid ? config.ssid : 'Your Network'}
              </dd>
            </div>
            {showPassword && (
              <div>
                <dt className={cn('text-[1.9cqw] font-semibold', t.label)}>Password</dt>
                <dd className={cn('mt-[0.6cqw] break-all text-[3.4cqw] leading-tight', t.value)}>
                  {config.password || '••••••••'}
                </dd>
              </div>
            )}
            {config.security === 'nopass' && (
              <div>
                <dt className={cn('text-[1.9cqw] font-semibold', t.label)}>Password</dt>
                <dd className={cn('mt-[0.6cqw] text-[3.4cqw] leading-tight', t.value)}>None needed</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="flex shrink-0 flex-col items-center">
          <div className={cn('rounded-[2.4cqw] p-[2.4cqw]', t.qrWrap)}>
            <QRCodeSVG
              value={wifiString}
              size={512}
              level="M"
              marginSize={0}
              fgColor={t.fg}
              bgColor="transparent"
              className="block size-[30cqw]"
              title={hasSsid ? `WiFi QR code for ${config.ssid}` : 'WiFi QR code'}
            />
          </div>
          <p className={cn('mt-[2cqw] text-[1.9cqw] font-semibold uppercase tracking-[0.18em]', t.label)}>
            Scan to connect
          </p>
        </div>
      </div>
    </div>
  )
}
