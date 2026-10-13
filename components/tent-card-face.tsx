import { QRCodeSVG } from 'qrcode.react'
import { Building2, Coffee, Flower2, Gem, PartyPopper, Wifi } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CardTheme, WifiConfig } from '@/lib/wifi'

interface TentCardFaceProps {
  config: WifiConfig
  wifiString: string
  theme: CardTheme
  className?: string
}

interface ThemeStyle {
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

const THEMES: Record<CardTheme, ThemeStyle> = {
  minimal: {
    root: 'bg-white text-neutral-950 font-sans',
    headline: 'font-sans font-bold tracking-tight',
    accent: 'text-neutral-950',
    label: 'text-neutral-500 uppercase tracking-[0.18em]',
    value: 'font-mono font-semibold text-neutral-950',
    qrWrap: 'bg-white ring-[0.35cqw] ring-neutral-950 rounded-none',
    fg: '#000000',
    Icon: Wifi,
    tagline: 'Point your camera at the code',
  },
  cozy: {
    root: 'bg-[#FBF3E8] text-[#3B2A20] font-sans',
    headline: 'font-serif font-medium italic',
    accent: 'text-[#C0573A]',
    label: 'text-[#9A6F55] uppercase tracking-[0.18em]',
    value: 'font-mono font-medium text-[#3B2A20]',
    qrWrap: 'bg-white ring-1 ring-[#EAD9C4] rounded-[2.4cqw]',
    fg: '#3B2A20',
    Icon: Flower2,
    tagline: 'Make yourself at home',
  },
  cafe: {
    root: 'bg-[#2A1B12] text-[#F6EBDC] font-sans',
    headline: 'font-serif font-semibold',
    accent: 'text-[#E5B04A]',
    label: 'text-[#C9B69C] uppercase tracking-[0.18em]',
    value: 'font-mono font-medium text-[#F6EBDC]',
    qrWrap: 'bg-[#F6EBDC] rounded-[2.4cqw]',
    fg: '#2A1B12',
    Icon: Coffee,
    tagline: 'Free WiFi for our guests',
  },
  luxury: {
    root: 'bg-[#14213D] text-[#F5EFE3] font-sans',
    headline: 'font-serif font-normal tracking-wide',
    accent: 'text-[#C9A66B]',
    label: 'text-[#C9A66B]/85 uppercase tracking-[0.28em]',
    value: 'font-serif text-[#F5EFE3] tracking-wide',
    qrWrap: 'bg-[#F5EFE3] ring-[0.3cqw] ring-[#C9A66B] ring-offset-[0.8cqw] ring-offset-[#14213D] rounded-none',
    fg: '#14213D',
    Icon: Gem,
    tagline: 'Guest Services',
  },
  office: {
    root: 'bg-[#F4F7FB] text-[#0F172A] font-sans',
    headline: 'font-sans font-extrabold tracking-tight',
    accent: 'text-[#2563EB]',
    label: 'text-[#64748B] uppercase tracking-[0.16em]',
    value: 'font-mono font-semibold text-[#0F172A]',
    qrWrap: 'bg-white ring-1 ring-[#CBD5E1] rounded-[1.6cqw] shadow-sm',
    fg: '#0F172A',
    Icon: Building2,
    tagline: 'Visitor Network',
  },
  party: {
    root: 'bg-[#FFF4E6] text-[#2B1B4A] font-sans',
    headline: 'font-sans font-extrabold tracking-tight',
    accent: 'text-[#FF4D8D]',
    label: 'text-[#7C3AED] uppercase tracking-[0.16em]',
    value: 'font-mono font-bold text-[#2B1B4A]',
    qrWrap: 'bg-white ring-[0.5cqw] ring-[#FFC53D] rounded-[3.5cqw]',
    fg: '#2B1B4A',
    Icon: PartyPopper,
    tagline: 'The party has WiFi',
  },
}

const CONFETTI = [
  { className: 'left-[4%] top-[8%] size-[2.2cqw] rounded-full bg-[#FF4D8D]' },
  { className: 'left-[44%] top-[6%] size-[1.6cqw] rotate-12 rounded-[0.3cqw] bg-[#22C3A6]' },
  { className: 'right-[5%] top-[9%] size-[1.8cqw] rounded-full bg-[#7C3AED]' },
  { className: 'left-[7%] bottom-[9%] size-[1.6cqw] rotate-45 rounded-[0.3cqw] bg-[#FFC53D]' },
  { className: 'left-[52%] bottom-[7%] size-[2cqw] rounded-full bg-[#FFC53D]' },
  { className: 'right-[4%] bottom-[12%] size-[1.4cqw] rotate-12 rounded-[0.3cqw] bg-[#FF4D8D]' },
]

function ThemeDecor({ theme }: { theme: CardTheme }) {
  switch (theme) {
    case 'minimal':
      return <div aria-hidden="true" className="absolute inset-[2.5cqw] border-[0.45cqw] border-neutral-950" />
    case 'cozy':
      return (
        <div
          aria-hidden="true"
          className="absolute inset-[2.5cqw] rounded-[2cqw] border-[0.35cqw] border-dashed border-[#E2C9AC]"
        />
      )
    case 'cafe':
      return (
        <>
          <div aria-hidden="true" className="absolute inset-[2.5cqw] border-[0.25cqw] border-[#E5B04A]/60" />
          <div
            aria-hidden="true"
            className="absolute -right-[8cqw] -top-[8cqw] size-[24cqw] rounded-full bg-[#4A3022]/60"
          />
        </>
      )
    case 'luxury':
      return (
        <>
          <div aria-hidden="true" className="absolute inset-[2.2cqw] border-[0.3cqw] border-[#C9A66B]" />
          <div aria-hidden="true" className="absolute inset-[3.4cqw] border-[0.12cqw] border-[#C9A66B]/60" />
        </>
      )
    case 'office':
      return <div aria-hidden="true" className="absolute inset-y-0 left-0 w-[2cqw] bg-[#2563EB]" />
    case 'party':
      return (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-[2.5cqw] rounded-[4cqw] border-[0.6cqw] border-[#FF4D8D]"
          />
          {CONFETTI.map((dot, index) => (
            <span key={index} aria-hidden="true" className={cn('absolute', dot.className)} />
          ))}
        </>
      )
  }
}

export function TentCardFace({ config, wifiString, theme, className }: TentCardFaceProps) {
  const t = THEMES[theme]
  const { Icon } = t
  const hasSsid = config.ssid.trim().length > 0
  const isOpen = config.security === 'nopass'
  const showPassword = config.showPassword && !isOpen
  const isOffice = theme === 'office'

  return (
    <div className={cn('@container relative aspect-[190/127] w-full overflow-hidden', t.root, className)}>
      <ThemeDecor theme={theme} />

      <div className="relative flex h-full items-center gap-[6cqw] px-[8cqw] py-[7cqw]">
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className={cn('mb-[2.5cqw] flex items-center gap-[1.5cqw]', t.accent)}>
            <Icon className="size-[4cqw]" strokeWidth={2} aria-hidden="true" />
            <span className="text-[2.1cqw] font-semibold uppercase tracking-[0.2em]">{t.tagline}</span>
          </div>

          <h2 className={cn('text-balance text-[5.6cqw] leading-[1.08]', t.headline)}>
            {config.headline || '\u00A0'}
          </h2>

          <dl className={cn('mt-[4.5cqw] flex flex-col gap-[2.6cqw]', isOffice && 'mt-[3.5cqw] gap-[1.8cqw]')}>
            <CardField theme={t} isOffice={isOffice} label="Network">
              {hasSsid ? config.ssid : 'Your Network'}
            </CardField>
            {showPassword && (
              <CardField theme={t} isOffice={isOffice} label="Password">
                {config.password || '••••••••'}
              </CardField>
            )}
            {isOpen && (
              <CardField theme={t} isOffice={isOffice} label="Password">
                None needed
              </CardField>
            )}
          </dl>

          {isOffice && (
            <ol className="mt-[3cqw] flex gap-[2.4cqw] text-[1.8cqw] font-medium text-[#334155]">
              {['Open camera', 'Scan code', 'Tap Join'].map((step, index) => (
                <li key={step} className="flex items-center gap-[0.8cqw]">
                  <span className="flex size-[2.8cqw] items-center justify-center rounded-full bg-[#2563EB] text-[1.5cqw] font-bold text-white">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-center">
          <div className={cn('p-[2.4cqw]', t.qrWrap)}>
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
          <p className={cn('mt-[2.2cqw] text-[1.9cqw] font-semibold uppercase tracking-[0.18em]', t.label)}>
            Scan to connect
          </p>
        </div>
      </div>
    </div>
  )
}

function CardField({
  theme,
  isOffice,
  label,
  children,
}: {
  theme: ThemeStyle
  isOffice: boolean
  label: string
  children: React.ReactNode
}) {
  if (isOffice) {
    return (
      <div className="rounded-[1.2cqw] border-[0.2cqw] border-[#CBD5E1] bg-white px-[2cqw] py-[1.3cqw]">
        <dt className={cn('text-[1.6cqw] font-bold', theme.label)}>{label}</dt>
        <dd className={cn('mt-[0.3cqw] break-all text-[3cqw] leading-tight', theme.value)}>{children}</dd>
      </div>
    )
  }
  return (
    <div>
      <dt className={cn('text-[1.9cqw] font-semibold', theme.label)}>{label}</dt>
      <dd className={cn('mt-[0.6cqw] break-all text-[3.4cqw] leading-tight', theme.value)}>{children}</dd>
    </div>
  )
}
