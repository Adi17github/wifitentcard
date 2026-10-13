export type SecurityType = 'WPA' | 'WEP' | 'nopass'

export type CardTheme = 'minimal' | 'cozy' | 'cafe'

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
