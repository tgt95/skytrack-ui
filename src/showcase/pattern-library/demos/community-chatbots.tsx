import { useState } from 'react'
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DemoFrame, UseCaseSection } from './shared'

export function ChatbotsDemo() {
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([])
  const [navigationPreviewOpen, setNavigationPreviewOpen] = useState(false)
  const [connectionError, setConnectionError] = useState(false)
  const [retryResult, setRetryResult] = useState('No message has been retried.')
  const [humanHandoff, setHumanHandoff] = useState(false)
  const sendMessage = (value: string) => {
    const question = value.trim()
    if (!question) return
    const normalized = question.toLowerCase()
    const answer = normalized.includes('weather')
      ? 'This local sample has no authorized weather policy, so it cannot provide flight guidance.'
      : normalized.includes('route') || normalized.includes('mission')
        ? 'Open Missions to review the route, assigned aircraft, and schedule.'
        : 'I can help you find mission records. I cannot provide flight or weather guidance; open Missions or contact your flight operations team.'
    setSent((items) => [...items, { role: 'user', text: question }, { role: 'assistant', text: answer }])
    setMessage('')
  }
  return (
    <DemoFrame>
      <UseCaseSection
        title='Ask for help with mission planning'
        scenario='A pilot asks how to find route details; the scripted helper explains its limits and points to the mission record.'
      >
        <div role='log' aria-live='polite' className='space-y-2'>
          <p>
            <strong>Mission helper:</strong> I can help you find mission information. I cannot provide flight or weather
            guidance. Choose a prompt or type a question.
          </p>
          {sent.map((item, index) => (
            <p key={`${item.role}-${index}`}>
              <strong>{item.role === 'user' ? 'You' : 'Mission helper'}:</strong> {item.text}
            </p>
          ))}
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button size='sm' variant='outline' onClick={() => sendMessage('How do I review a mission route?')}>
            Review route
          </Button>
          <Button size='sm' variant='outline' onClick={() => sendMessage('What should I check about weather?')}>
            Check weather
          </Button>
        </div>
        <form
          className='flex flex-col gap-2 sm:flex-row'
          onSubmit={(event) => {
            event.preventDefault()
            sendMessage(message)
          }}
        >
          <Input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            aria-label='Message the local demo'
            placeholder='Ask about mission planning'
          />
          <Button type='submit' disabled={!message.trim()}>
            Send
          </Button>
        </form>
        <Button size='sm' variant='ghost' disabled={!sent.length} onClick={() => setSent([])}>
          Clear conversation
        </Button>
      </UseCaseSection>
      <UseCaseSection
        title='Continue through standard navigation'
        scenario='When a question is outside the helper’s scope, direct the user back to the Missions workspace.'
      >
        <Button variant='outline' onClick={() => setNavigationPreviewOpen(true)}>
          Preview Missions workspace
        </Button>
        {navigationPreviewOpen && (
          <section
            role='region'
            aria-label='Missions workspace preview'
            className='max-w-xl space-y-2 rounded-(--radius) border border-border p-4'
          >
            <h4 className='font-medium'>Missions</h4>
            <p>North coast survey · Ready for review</p>
            <p className='text-sm text-muted-foreground'>
              Local destination preview only; product navigation did not occur.
            </p>
          </section>
        )}
        <p className='text-muted-foreground'>
          Scripted local responses only; unknown questions get a scope clarification. No chatbot service is connected.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Recover when a message cannot be sent'
        scenario='Show a clear failed state and preview retry recovery; this local example does not send a real message.'
      >
        {connectionError ? (
          <Alert variant='destructive'>
            <AlertTitle>Message not sent</AlertTitle>
            <AlertDescription>
              “How can I review my route?” was not sent. Check the connection, then retry the message.
            </AlertDescription>
            <AlertAction>
              <Button
                size='sm'
                variant='outline'
                onClick={() => {
                  setConnectionError(false)
                  setRetryResult(
                    'Retry preview complete: this message would be sent after reconnect. The sample did not send it.'
                  )
                }}
              >
                Preview retry
              </Button>
            </AlertAction>
          </Alert>
        ) : (
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              setRetryResult('No message has been retried.')
              setConnectionError(true)
            }}
          >
            Simulate connection error
          </Button>
        )}
        <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
          {retryResult}
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Hand off a complex request to a person'
        scenario='Preview a support handoff and preserve a return path; this example does not contact a support teammate.'
      >
        {humanHandoff ? (
          <Alert>
            <AlertTitle>Support handoff preview</AlertTitle>
            <AlertDescription>
              No teammate was contacted and no conversation was sent. In a product, explain what context would be shared
              and whether support is available.
            </AlertDescription>
          </Alert>
        ) : (
          <Button size='sm' variant='outline' onClick={() => setHumanHandoff(true)}>
            Preview support handoff
          </Button>
        )}
        <Button size='sm' variant='ghost' disabled={!humanHandoff} onClick={() => setHumanHandoff(false)}>
          Return to mission helper
        </Button>
      </UseCaseSection>
    </DemoFrame>
  )
}
