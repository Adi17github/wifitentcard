import Link from 'next/link'
import { Wifi } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md transition-colors duration-300 print:hidden">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight transition-opacity duration-200 hover:opacity-80">
          <span className="flex size-7 items-center justify-center rounded-md bg-foreground text-background transition-transform duration-200 hover:scale-105">
            <Wifi className="size-4" aria-hidden="true" />
          </span>
          WiFi Tent Card
        </Link>
        <div className="flex items-center gap-5">
          <nav aria-label="Primary" className="hidden items-center gap-5 text-sm text-muted-foreground sm:flex">
            <Link href="/#generator" className="transition-colors hover:text-foreground">
              Generator
            </Link>
            <Link href="/#guide-heading" className="transition-colors hover:text-foreground">
              Guide
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
