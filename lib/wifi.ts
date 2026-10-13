export type SecurityType = 'WPA' | 'WEP' | 'nopass'

export type CardTheme = 'minimal' | 'cozy' | 'cafe' | 'luxury' | 'office' | 'party'

export interface WifiConfig {
  ssid: string
  password: string
  security: SecurityType
  hidden: boolean
  headline: string
  showPassword: boolean
}

export const DEFAULT_HEADLINE = 'Welcome! Connect to our WiFi'

export const SECURITY_OPTIONS: { value: SecurityType; label: string }[] = [
  { value: 'WPA', label: 'WPA/WPA2/WPA3' },
  { value: 'WEP', label: 'WEP' },
  { value: 'nopass', label: 'Open' },
]

export interface CardPreset {
  value: CardTheme
  label: string
  description: string
  headline: string
  swatch: { bg: string; accent: string; ink: string }
}

export const CARD_PRESETS: CardPreset[] = [
  {
    value: 'minimal',
    label: 'Modern Minimalist',
    description: 'Sharp borders, high contrast',
    headline: DEFAULT_HEADLINE,
    swatch: { bg: '#FFFFFF', accent: '#0A0A0A', ink: '#0A0A0A' },
  },
  {
    value: 'cozy',
    label: 'Cozy Airbnb',
    description: 'Warm serif, home accents',
    headline: 'Welcome to our Home',
    swatch: { bg: '#FBF3E8', accent: '#C0573A', ink: '#3B2A20' },
  },
  {
    value: 'cafe',
    label: 'Café & Coffee',
    description: 'Espresso & latte tones',
    headline: 'Enjoy your brew & free WiFi',
    swatch: { bg: '#2A1B12', accent: '#E5B04A', ink: '#F6EBDC' },
  },
  {
    value: 'luxury',
    label: 'Boutique Hotel',
    description: 'Navy & gold, upscale serif',
    headline: 'Complimentary WiFi for Our Guests',
    swatch: { bg: '#14213D', accent: '#C9A66B', ink: '#F5EFE3' },
  },
  {
    value: 'office',
    label: 'Office & Co-Working',
    description: 'Corporate, step-by-step',
    headline: 'Guest WiFi Access',
    swatch: { bg: '#F4F7FB', accent: '#2563EB', ink: '#0F172A' },
  },
  {
    value: 'party',
    label: 'Playful Party',
    description: 'Rounded, vibrant, festive',
    headline: "Let's Party! Hop on the WiFi",
    swatch: { bg: '#FFF4E6', accent: '#FF4D8D', ink: '#2B1B4A' },
  },
]

const PRESET_HEADLINES = new Set(CARD_PRESETS.map((preset) => preset.headline))

export function isPresetHeadline(headline: string) {
  return PRESET_HEADLINES.has(headline.trim()) || headline.trim().length === 0
}

// Per the ZXing WiFi spec, these characters must be backslash-escaped.
function escapeWifiValue(value: string) {
  return value.replace(/([\\;,:"])/g, '\\$1')
}

export function buildWifiString({ ssid, password, security, hidden }: WifiConfig) {
  let result = `WIFI:S:${escapeWifiValue(ssid)};T:${security};`
  if (security !== 'nopass') {
    result += `P:${escapeWifiValue(password)};`
  }
  if (hidden) {
    result += 'H:true;'
  }
  return `${result};`
}
