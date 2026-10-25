import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const ACCOUNT_FAQ = [
  {
    id: 'account-security',
    question: 'How secure is my financial data?',
    answer: 'Bank-level AES-256 encryption, SOC 2 Type II infrastructure, read-only access tokens.'
  },
  {
    id: 'account-linking',
    question: 'How do I connect my accounts?',
    answer: 'Link any bank or investment account in under a minute with secure OAuth.'
  },
  {
    id: 'account-export',
    question: 'Can I export my data for tax purposes?',
    answer: 'Yes — one-click CSV and PDF exports, grouped by category and quarter.'
  }
]

type AccountFaqAccordionProps = {
  className?: string
  compact?: boolean
  defaultOpen?: boolean
  multiple?: boolean
}

export function AccountFaqAccordion({
  className = 'w-full',
  compact = false,
  defaultOpen = false,
  multiple = false
}: AccountFaqAccordionProps) {
  return (
    <Accordion className={className} defaultValue={defaultOpen ? ['account-security'] : undefined} multiple={multiple}>
      {ACCOUNT_FAQ.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger
            className={
              compact
                ? 'min-h-[34px] gap-2 py-1 text-left text-[11px] font-semibold text-muted-foreground hover:no-underline [&>svg]:size-3'
                : 'gap-2 py-3 text-left text-sm font-medium [&>svg]:size-5'
            }
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent className={compact ? 'pb-3 text-xs text-muted-foreground' : 'pb-3'}>
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
