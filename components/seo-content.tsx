import { FaqAccordion } from '@/components/faq-accordion'

export function SeoContent() {
  return (
    <section aria-labelledby="guide-heading" className="border-t bg-muted/40 print:hidden">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand">The guide</p>
        <h2 id="guide-heading" className="text-balance font-serif text-3xl font-medium tracking-tight sm:text-4xl">
          Everything you need to know about WiFi QR codes
        </h2>

        <article className="mt-10 flex flex-col gap-12 text-base leading-relaxed text-muted-foreground">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">How WiFi QR Codes Work</h3>
            <p>
              A WiFi QR code is a small, standardized text string packed into a scannable square. When a phone
              camera reads it, the operating system recognizes the format and offers to join the network
              instantly, with no typing of long, case-sensitive passwords required.
            </p>
            <p>
              The format looks like this:{' '}
              <code className="rounded bg-background px-1.5 py-0.5 font-mono text-sm text-foreground">
                {'WIFI:S:MyNetwork;T:WPA;P:secret123;;'}
              </code>
              . The <strong className="text-foreground">S</strong> field holds the network name (SSID),{' '}
              <strong className="text-foreground">T</strong> declares the security type (WPA, WEP, or nopass for
              open networks), and <strong className="text-foreground">P</strong> stores the password. An optional{' '}
              <strong className="text-foreground">H:true</strong> flag tells devices the network is hidden. Special
              characters such as semicolons, commas, colons, and quotes are escaped with a backslash so they
              don&apos;t break the code.
            </p>
            <p>
              This generator builds that string and renders the QR code entirely in your browser using JavaScript.
              Nothing is uploaded, logged, or stored on a server, which makes it safe to use with your real
              credentials.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Troubleshooting Device Compatibility (iOS &amp; Android)
            </h3>
            <p>
              <strong className="text-foreground">iPhone and iPad:</strong> iOS 11 and later read WiFi QR codes
              directly from the built-in Camera app. Point the camera at the card, wait for the yellow
              &quot;Join Network&quot; banner, and tap it. If nothing appears, open Settings, then Camera, and make
              sure &quot;Scan QR Codes&quot; is enabled.
            </p>
            <p>
              <strong className="text-foreground">Android:</strong> Most phones running Android 10 or later can
              scan from the default camera or from Google Lens. On some Samsung, Xiaomi, and older devices, you may
              need to open the WiFi settings screen and tap the small QR icon next to &quot;Add network.&quot;
            </p>
            <p>
              If a scan connects but fails to authenticate, double-check the password for trailing spaces and
              confirm the security type matches your router. WPA, WPA2, and WPA3 all use the{' '}
              <code className="font-mono text-sm text-foreground">WPA</code> value. Print at a size where the code is
              at least 3 cm wide, avoid glossy paper that causes glare, and keep the card in good lighting.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">Security Tips for Guest Networks</h3>
            <p>
              A printed card is visible to anyone who walks by, so treat it like a key to a side door rather than
              your front door. The safest approach is to create a dedicated guest network that is isolated from
              your personal devices, smart home hubs, and work computers.
            </p>
            <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-brand">
              <li>Enable &quot;client isolation&quot; or &quot;AP isolation&quot; so guests can&apos;t see each other&apos;s devices.</li>
              <li>Use WPA2 or WPA3 encryption. Avoid WEP, which can be cracked in minutes.</li>
              <li>Rotate the guest password periodically, for example between rental bookings, and reprint the card.</li>
              <li>Set bandwidth limits so one heavy user can&apos;t slow the network for everyone else.</li>
              <li>Never print the credentials for your primary or admin network on a public card.</li>
            </ul>
            <p>
              For cafes and retail spaces, consider adding a short acceptable-use notice near the card and
              disabling access to the router&apos;s admin panel from the guest network.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">Frequently Asked Questions</h3>
            <FaqAccordion />
          </div>
        </article>
      </div>
    </section>
  )
}
