import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  useHighlightedCode
} from '@/components/ui/code-block'
import type { DesignerPracticeRegistry } from '../practice-types'

const recommendedCode = `function getStatusLabel(status: Status) {
  if (status === 'done') return 'Done'
  return 'In progress'
}`

const discouragedCode = `const x = a ? b : c`

function CodeBlockBehaviorExample({ recommended }: { recommended: boolean }) {
  const code = recommended ? recommendedCode : discouragedCode
  const lines = useHighlightedCode(code, 'typescript')

  return (
    <CodeBlock className='w-full max-w-lg'>
      {recommended ? (
        <CodeBlockHeader>
          <CodeBlockTitle>mission-status.ts</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={code} />
          </CodeBlockActions>
        </CodeBlockHeader>
      ) : (
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} />
        </CodeBlockActions>
      )}
      <CodeBlockContent lineNumbers={recommended}>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}

export const designerPracticeRegistry: DesignerPracticeRegistry = {
  'code-block': {
    Behavior: [
      {
        recommended: <CodeBlockBehaviorExample recommended />,
        discouraged: <CodeBlockBehaviorExample recommended={false} />
      }
    ]
  }
}
