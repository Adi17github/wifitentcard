import type { Metadata } from 'next'
import { InfoPage } from '@/components/info-page'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <InfoPage title="Contact">
      <p>Have feedback, a feature request, or found a device that won&apos;t scan? We&apos;d love to hear from you.</p>
      <p>
        Email us at{' '}
        <a href="mailto:hello@example.com" className="font-medium text-foreground underline underline-offset-4">
          hello@example.com
        </a>{' '}
        and we&apos;ll get back to you within a few business days.
      </p>
      <p>Please never include your WiFi password in messages to us.</p>
    </InfoPage>
  )
}
