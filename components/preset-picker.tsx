'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CARD_PRESETS, type CardTheme } from '@/lib/wifi'

interface PresetPickerProps {
  value: CardTheme
  onChange: (theme: CardTheme) => void
}

export function PresetPicker({ value, onChange }: PresetPickerProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Card design template"
      className="grid max-h-[360px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3"
    >
      {CARD_PRESETS.map((preset) => {
        const checked = value === preset.value
        return (
          <button
            key={preset.value}
            type="button"
            role="radio"
            aria-checked={checked}
            onClick={() => onChange(preset.value)}
            className={cn(
              'group relative flex flex-col overflow-hidden rounded-xl border bg-background text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              checked ? 'border-foreground ring-1 ring-foreground shadow-sm' : 'border-border',
            )}
          >
            <span
              aria-hidden="true"
              className="relative flex h-16 items-center gap-2 px-3"
              style={{ backgroundColor: preset.swatch.bg }}
            >
              <span className="flex flex-1 flex-col gap-1">
                <span className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: preset.swatch.ink }} />
                <span className="h-1 w-1/2 rounded-full opacity-60" style={{ backgroundColor: preset.swatch.ink }} />
                <span className="h-1 w-2/5 rounded-full" style={{ backgroundColor: preset.swatch.accent }} />
              </span>
              <span
                className="grid size-9 grid-cols-3 gap-px rounded-sm bg-white p-1"
                style={{ boxShadow: `0 0 0 1.5px ${preset.swatch.accent}` }}
              >
                {[1, 0, 1, 0, 1, 0, 1, 1, 0].map((on, index) => (
                  <span key={index} style={{ backgroundColor: on ? preset.swatch.ink : 'transparent' }} />
                ))}
              </span>
            </span>
            <span className="flex flex-col gap-0.5 border-t px-3 py-2">
              <span className="text-xs font-semibold text-foreground">{preset.label}</span>
              <span className="text-[11px] leading-snug text-muted-foreground">{preset.description}</span>
            </span>
            {checked && (
              <span className="absolute right-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-foreground text-background shadow-sm">
                <Check className="size-3" aria-hidden="true" />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
