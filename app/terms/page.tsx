import type { Metadata } from 'next'
import { InfoPage } from '@/components/info-page'

export const metadata: Metadata = { title: 'Terms of Use' }

export default function TermsPage() {
  return (
    <InfoPage title="Terms of Use">
      <p>By using this website you agree to the following terms.</p>
      <h2>Use of the tool</h2>
      <p>
        The generator is provided free of charge for personal and commercial use. You may print, share, and
        distribute the cards you create.
      </p>
      <h2>No warranty</h2>
      <p>
        The service is provided &quot;as is&quot; without warranties of any kind. We are not responsible for
        network access granted through printed cards, so please follow the guest network security tips on our
        homepage.
      </p>
      <h2>Changes</h2>
      <p>We may update these terms from time to time. Continued use of the site means you accept the changes.</p>
    </InfoPage>
  )
}
