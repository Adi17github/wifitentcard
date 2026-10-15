'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const FAQS = [
  {
    q: 'Is it safe to type my real WiFi password here?',
    a: 'Yes. The QR code is generated locally by JavaScript running in your browser. Your network name and password are never sent to a server, saved in a database, or tracked by analytics. You can even disconnect from the internet after the page loads and the tool will keep working.',
  },
  {
    q: 'How do I fold the printed tent card?',
    a: 'Print on a single A4 or US Letter sheet at 100% scale. Fold along the dashed center line so both printed faces point outward, then stand the card on a table. The top panel is printed upside down on purpose so it reads correctly once folded.',
  },
  {
    q: 'Will the QR code still work if I change my WiFi password?',
    a: 'No. The password is embedded in the code itself, so any change to your SSID, password, or security type requires a new card. Simply enter the new details and print again.',
  },
  {
    q: 'Why does my phone say "Unable to join the network"?',
    a: 'This usually means the password or security type doesn\u2019t match the router. Check for typos, extra spaces, and letter case. If your router uses WPA3-only mode, some older devices may not support it; switching to WPA2/WPA3 mixed mode often helps.',
  },
  {
    q: 'Can I use this for a hidden network?',
    a: 'Yes. Turn on the "Hidden network" toggle and the code will include the H:true flag, telling devices to look for a network that doesn\u2019t broadcast its name.',
  },
  {
    q: 'What paper should I use for printing?',
    a: 'A matte cardstock between 160 and 250 gsm works best. It stands up well when folded and avoids the glare that glossy paper creates, which can make QR codes harder to scan.',
  },
  {
    q: 'Can I customize the headline and text on each template?',
    a: 'Absolutely. Every template lets you set your own headline, toggle whether the password is printed on the card, and choose your security type. The live preview updates instantly so you see changes as you make them.',
  },
  {
    q: 'Do I need an account or any software installed?',
    a: 'No. There are no accounts, no downloads, and no installations. The entire tool runs in your web browser. Just open the page, type your details, pick a template, and print or download.',
  },
]

export function FaqAccordion() {
  return (
    <Accordion className="rounded-xl border bg-background px-5">
      {FAQS.map((faq) => (
        <AccordionItem key={faq.q} value={faq.q}>
          <AccordionTrigger className="py-4 text-base font-medium text-foreground hover:no-underline">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="pb-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>{faq.a}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
