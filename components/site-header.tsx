import Link from 'next/link'
import { Wifi } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="border-b print:hidden">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
          <span className="flex size-7 items-center justify-center rounded-md bg-foreground text-background">
            <Wifi className="size-4" aria-hidden="true" />
          </span>
          WiFi Tent Card
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link href="/#generator" className="transition-colors hover:text-foreground">
            Generator
          </Link>
          <Link href="/#guide-heading" className="transition-colors hover:text-foreground">
            Guide
          </Link>
        </nav>
      </div>
    </header>
  )
}
