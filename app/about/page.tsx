import type { Metadata } from 'next'
import { InfoPage } from '@/components/info-page'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <InfoPage title="About">
      <p>
        WiFi Tent Card was built for hosts who are tired of spelling out long passwords. Whether you run a
        short-term rental, a neighborhood cafe, a coworking space, or simply have guests over, a scannable card
        makes getting online effortless.
      </p>
      <p>
        We designed the tool around three principles: it should be fast, it should look great on a table, and it
        should never put your credentials at risk. That&apos;s why everything happens on your device, with no
        accounts and no uploads.
      </p>
    </InfoPage>
  )
}
