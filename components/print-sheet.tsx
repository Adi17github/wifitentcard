import { TentCardFace } from '@/components/tent-card-face'
import type { CardTheme, WifiConfig } from '@/lib/wifi'

interface PrintSheetProps {
  config: WifiConfig
  wifiString: string
  theme: CardTheme
}

// The top panel is rotated 180° so both faces read upright once the sheet is folded into a tent.
export function PrintSheet({ config, wifiString, theme }: PrintSheetProps) {
  return (
    <div className="print-sheet hidden" aria-hidden="true">
      <div className="print-panel rotate-180">
        <TentCardFace config={config} wifiString={wifiString} theme={theme} className="h-full" />
      </div>
      <div className="print-fold">
        <span>Fold here</span>
      </div>
      <div className="print-panel">
        <TentCardFace config={config} wifiString={wifiString} theme={theme} className="h-full" />
      </div>
    </div>
  )
}
