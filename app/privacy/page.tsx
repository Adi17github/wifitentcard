import type { Metadata } from 'next'
import { InfoPage } from '@/components/info-page'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <InfoPage title="Privacy Policy">
      <p>
        Your privacy is the foundation of this tool. The WiFi QR Tent Card Generator runs entirely in your browser.
      </p>
      <h2>What we collect</h2>
      <p>
        The network name, password, and headline you enter are processed locally on your device to render the QR
        code and card. They are never transmitted to our servers or any third party.
      </p>
      <h2>Analytics and advertising</h2>
      <p>
        We may use privacy-friendly, aggregate analytics and display advertising to keep this tool free. These
        services may set cookies to measure page views or serve relevant ads, but they never receive the
        information you type into the form.
      </p>
      <h2>Contact</h2>
      <p>Questions about this policy can be sent through our Contact page.</p>
    </InfoPage>
  )
}
