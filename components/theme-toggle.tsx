'use client'

import { Moon, Sun } from 'lucide-react'
import { useSyncExternalStore } from 'react'

export const THEME_STORAGE_KEY = 'theme'

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

const getIsDark = () => document.documentElement.classList.contains('dark')
const getServerIsDark = () => false

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getIsDark, getServerIsDark)

  function toggle() {
    const next = isDark ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    document.documentElement.style.colorScheme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      className="relative flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all duration-300 hover:-translate-y-px hover:text-foreground hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring print:hidden"
    >
      <Sun
        className="size-4 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0"
        aria-hidden="true"
      />
      <Moon
        className="absolute size-4 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100"
        aria-hidden="true"
      />
      <span className="sr-only">Toggle dark mode</span>
    </button>
  )
}
