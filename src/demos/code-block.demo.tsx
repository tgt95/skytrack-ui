import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  useHighlightedCode
} from '@/components/ui/code-block'
import { Button } from '@/components/ui/button'
import type { DemoMeta } from '@/showcase/demo'

const routeCode = `export function estimateRouteDistance(points: Point[]) {
  return points.reduce((total, point, index) => {
    if (index === 0) return total
    return total + distanceBetween(points[index - 1], point)
  }, 0)
}`

const terminalOutput = `$ npm run typecheck
> skytrack-ui@0.1.5 typecheck
> tsc -p tsconfig.json

✓ No type errors found`

const highlightedCode = `type Mission = {
  id: string
  status: 'planned' | 'active' | 'complete'
}

const isReady = (mission: Mission) => mission.status === 'planned'`

function HighlightedCodeExample({
  code,
  title,
  lineNumbers = false,
  startLine = 1,
  size = 'default'
}: {
  code: string
  title: string
  lineNumbers?: boolean
  startLine?: number
  size?: 'default' | 'sm'
}) {
  const lines = useHighlightedCode(code, 'typescript')

  return (
    <CodeBlock className='w-full max-w-3xl' size={size}>
      <CodeBlockHeader>
        <CodeBlockTitle>{title}</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers={lineNumbers} startLine={startLine}>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}

export const demo: DemoMeta = {
  id: 'code-block',
  title: 'Code Block',
  description: 'Display code, terminal output, and diffs with optional copy, line numbers, and syntax highlighting.',
  group: 'Data Display',
  variants: [
    {
      name: 'Default',
      render: () => <HighlightedCodeExample code={routeCode} title='route-distance.ts' />
    },
    {
      name: 'Line numbers',
      render: () => (
        <HighlightedCodeExample code={routeCode} title='route-distance.ts · lines 12–17' lineNumbers startLine={12} />
      )
    },
    {
      name: 'Diff',
      render: () => (
        <CodeBlock className='w-full max-w-3xl'>
          <CodeBlockHeader>
            <CodeBlockTitle>mission-status.diff</CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton value={'- status = "draft"\n+ status = "planned"'} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent>
            <CodeBlockLine variant='removed'>status = &quot;draft&quot;</CodeBlockLine>
            <CodeBlockLine variant='added'>status = &quot;planned&quot;</CodeBlockLine>
            <CodeBlockLine variant='highlighted'> notify dispatch team</CodeBlockLine>
          </CodeBlockContent>
        </CodeBlock>
      )
    },
    {
      name: 'Small terminal output',
      render: () => (
        <CodeBlock size='sm' variant='destructive' className='w-full max-w-3xl'>
          <CodeBlockHeader>
            <CodeBlockTitle>Terminal · command failed</CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton value={terminalOutput} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent wrap className='max-h-52 overflow-y-auto'>
            {terminalOutput.split('\n').map((line, index) => (
              <CodeBlockLine key={index}>{line || '\u00a0'}</CodeBlockLine>
            ))}
          </CodeBlockContent>
          <CodeBlockFooter className='justify-end'>
            <Button size='xs' variant='ghost'>
              Retry command
            </Button>
          </CodeBlockFooter>
        </CodeBlock>
      )
    },
    {
      name: 'Syntax highlighting',
      render: () => <HighlightedCodeExample code={highlightedCode} title='mission.ts' lineNumbers />
    }
  ]
}
