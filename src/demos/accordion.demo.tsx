import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { AccountFaqAccordion } from '@/showcase/accordion-faq'
import type { DemoMeta } from '@/showcase/demo'

const FAQ = [
  {
    q: 'What is Base UI?',
    a: 'Base UI is a library of high-quality unstyled React components for design systems and web apps.'
  },
  {
    q: 'How do I get started?',
    a: 'Head to the “Quick start” guide in the docs. If you’ve used unstyled libraries before, you’ll feel at home.'
  },
  {
    q: 'Can I use it for my project?',
    a: 'Of course! Base UI is free and open source.'
  }
]

const SHIPPING = [
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 3–5 business days. Express delivery arrives in 1–2 business days.'
  },
  {
    q: 'What is your return policy?',
    a: 'You can return any item within 30 days of delivery. Opened items may be subject to a 10% restocking fee.'
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, we ship to over 40 countries. International orders typically arrive within 7–14 business days.'
  },
  {
    q: 'How can I track my order?',
    a: 'Once your order ships, you’ll receive a tracking link by email. Tracking updates can take up to 24 hours to appear.'
  }
]

export const demo: DemoMeta = {
  id: 'accordion',
  title: 'Accordion',
  description: 'A set of collapsible panels with headings.',
  group: 'Layout',
  variants: [
    {
      name: 'Demo',
      render: () => (
        <Accordion className='w-full max-w-sm'>
          {FAQ.map((item) => (
            <AccordionItem key={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>
                <div className='pb-4'>{item.a}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )
    },
    {
      name: 'SkyTrack account FAQ',
      render: () => <AccountFaqAccordion className='w-full max-w-sm' />
    },
    {
      name: 'Open multiple panels',
      render: () => (
        <Accordion multiple className='w-full max-w-sm'>
          {FAQ.map((item) => (
            <AccordionItem key={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>
                <div className="pb-4">{item.a}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )
    },
    // {
    //   name: 'Compact disclosure',
    //   render: () => (
    //     <Accordion multiple className='w-full max-w-sm'>
    //       {FAQ.map((item) => (
    //         <AccordionItem key={item.q} className='border-b-0'>
    //           <AccordionTrigger className='gap-2 py-1 text-base font-semibold text-muted-foreground hover:no-underline [&>svg]:size-5'>
    //             {item.q}
    //           </AccordionTrigger>
    //           <AccordionContent>
    //             <div className='pb-3 text-xs text-muted-foreground'>{item.a}</div>
    //           </AccordionContent>
    //         </AccordionItem>
    //       ))}
    //     </Accordion>
    //   )
    // },
    {
      name: 'Hidden until found',
      render: () => (
        <Accordion hiddenUntilFound className='w-full max-w-sm'>
          {SHIPPING.map((item) => (
            <AccordionItem key={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>
                <div className="pb-4">{item.a}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )
    },
    {
      name: 'Disabled item',
      render: () => (
        <Accordion className='w-full max-w-sm'>
          {FAQ.map((item, index) => (
            <AccordionItem key={item.q} disabled={index === 1}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>
                <div className="pb-4">{item.a}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )
    }
  ]
}
