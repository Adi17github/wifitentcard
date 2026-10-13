'use client'

import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { SECURITY_OPTIONS, type WifiConfig } from '@/lib/wifi'

interface WifiFormProps {
  config: WifiConfig
  onChange: (patch: Partial<WifiConfig>) => void
}

export function WifiForm({ config, onChange }: WifiFormProps) {
  const id = useId()
  const [revealed, setRevealed] = useState(false)
  const isOpen = config.security === 'nopass'

  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()} aria-label="WiFi details">
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-ssid`}>Network name (SSID)</Label>
        <Input
          id={`${id}-ssid`}
          value={config.ssid}
          onChange={(e) => onChange({ ssid: e.target.value })}
          placeholder="e.g. Sunset_Guest"
          autoComplete="off"
          spellCheck={false}
          maxLength={32}
          className="h-11"
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-medium">Security type</legend>
        <div role="radiogroup" className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1">
          {SECURITY_OPTIONS.map((option) => {
            const checked = config.security === option.value
            return (
              <label
                key={option.value}
                className={cn(
                  'flex cursor-pointer items-center justify-center rounded-md px-2 py-2 text-center text-xs font-medium text-muted-foreground transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring sm:text-sm',
                  checked && 'bg-background text-foreground shadow-sm',
                )}
              >
                <input
                  type="radio"
                  name={`${id}-security`}
                  value={option.value}
                  checked={checked}
                  onChange={() => onChange({ security: option.value })}
                  className="sr-only"
                />
                {option.label}
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-password`} className={cn(isOpen && 'text-muted-foreground')}>
          Password
        </Label>
        <div className="relative">
          <Input
            id={`${id}-password`}
            type={revealed ? 'text' : 'password'}
            value={isOpen ? '' : config.password}
            onChange={(e) => onChange({ password: e.target.value })}
            placeholder={isOpen ? 'No password for open networks' : 'Enter WiFi password'}
            disabled={isOpen}
            autoComplete="off"
            spellCheck={false}
            maxLength={63}
            className="h-11 pr-11"
          />
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            disabled={isOpen}
            aria-label={revealed ? 'Hide password' : 'Show password'}
            aria-pressed={revealed}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-40"
          >
            {revealed ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-headline`}>Card headline</Label>
        <Input
          id={`${id}-headline`}
          value={config.headline}
          onChange={(e) => onChange({ headline: e.target.value })}
          maxLength={60}
          className="h-11"
        />
      </div>

      <div className="flex flex-col divide-y rounded-lg border">
        <ToggleRow
          id={`${id}-hidden`}
          label="Hidden network"
          description="Turn on if your SSID isn't broadcast."
          checked={config.hidden}
          onCheckedChange={(hidden) => onChange({ hidden })}
        />
        <ToggleRow
          id={`${id}-show-pass`}
          label="Print password on card"
          description="Helpful for devices that can't scan QR codes."
          checked={config.showPassword}
          disabled={isOpen}
          onCheckedChange={(showPassword) => onChange({ showPassword })}
        />
      </div>
    </form>
  )
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  disabled,
  onCheckedChange,
}: {
  id: string
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className={cn('flex items-center justify-between gap-4 px-4 py-3', disabled && 'opacity-50')}>
      <div className="flex flex-col gap-0.5">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} checked={checked} disabled={disabled} onCheckedChange={onCheckedChange} />
    </div>
  )
}
