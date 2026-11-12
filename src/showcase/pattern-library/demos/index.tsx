import { PatternId } from '../catalog'
import { PATTERN_PAGE_CONTENT } from '../page-content'
import { CommonActionsDemo } from './common-actions'
import { ApiKeyDemo } from './community-api-key'
import { ChatbotsDemo } from './community-chatbots'
import { CreateFlowsDemo } from './community-create-flows'
import { EditDemo } from './community-edit'
import { ExportDemoWithProvider } from './community-export'
import { ImportDemo } from './community-import'
import { InAppLearningDemo } from './community-in-app-learning'
import { OrderSummaryDemo } from './community-order-summary'
import { RemoveDemo } from './community-remove'
import { DialogsDemo } from './dialogs'
import { DisabledStatesDemo } from './disabled-states'
import { DisclosuresDemo } from './disclosures'
import { EmptyStatesDemo } from './empty-states'
import { FilteringDemo } from './filtering'
import { FluidStylesDemo } from './fluid-styles'
import { FormsDemo } from './forms'
import { GlobalHeaderDemo } from './global-header'
import { LoadingDemo } from './loading'
import { LoginDemo } from './login'
import { NotificationsDemoWithProvider } from './notifications'
import { OverflowDemo } from './overflow-content'
import { ReadOnlyDemo } from './read-only-states'
import { SearchDemo } from './search'
import { PatternDemoContext } from './shared'
import { StatusIndicatorsDemo } from './status-indicators'
import { TextToolbarDemo } from './text-toolbars'

function renderPatternDemo(patternId: PatternId) {
  switch (patternId) {
    case 'common-actions':
      return <CommonActionsDemo />
    case 'dialogs':
      return <DialogsDemo />
    case 'disabled-states':
      return <DisabledStatesDemo />
    case 'disclosures':
      return <DisclosuresDemo />
    case 'empty-states':
      return <EmptyStatesDemo />
    case 'filtering':
      return <FilteringDemo />
    case 'fluid-styles':
      return <FluidStylesDemo />
    case 'forms':
      return <FormsDemo />
    case 'global-header':
      return <GlobalHeaderDemo />
    case 'loading':
      return <LoadingDemo />
    case 'login':
      return <LoginDemo />
    case 'notifications':
      return <NotificationsDemoWithProvider />
    case 'overflow-content':
      return <OverflowDemo />
    case 'read-only-states':
      return <ReadOnlyDemo />
    case 'search':
      return <SearchDemo />
    case 'status-indicators':
      return <StatusIndicatorsDemo />
    case 'text-toolbars':
      return <TextToolbarDemo />
    case 'community-chatbots':
      return <ChatbotsDemo />
    case 'community-in-app-learning':
      return <InAppLearningDemo />
    case 'community-create-flows':
      return <CreateFlowsDemo />
    case 'community-edit':
      return <EditDemo />
    case 'community-export':
      return <ExportDemoWithProvider />
    case 'community-api-key':
      return <ApiKeyDemo />
    case 'community-import':
      return <ImportDemo />
    case 'community-order-summary':
      return <OrderSummaryDemo />
    case 'community-remove':
      return <RemoveDemo />
  }
}

export function PatternDemo({ patternId }: { patternId: PatternId }) {
  return (
    <PatternDemoContext.Provider value={{ patternId, page: PATTERN_PAGE_CONTENT[patternId] }}>
      {renderPatternDemo(patternId)}
    </PatternDemoContext.Provider>
  )
}
