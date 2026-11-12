import type { PatternId } from '../catalog'
import type { PatternPageDraft } from './types'
import { PAGE_COMMON_ACTIONS } from './common-actions'
import { PAGE_DIALOGS } from './dialogs'
import { PAGE_DISABLED_STATES } from './disabled-states'
import { PAGE_DISCLOSURES } from './disclosures'
import { PAGE_EMPTY_STATES } from './empty-states'
import { PAGE_FILTERING } from './filtering'
import { PAGE_FLUID_STYLES } from './fluid-styles'
import { PAGE_FORMS } from './forms'
import { PAGE_GLOBAL_HEADER } from './global-header'
import { PAGE_LOADING } from './loading'
import { PAGE_LOGIN } from './login'
import { PAGE_NOTIFICATIONS } from './notifications'
import { PAGE_OVERFLOW_CONTENT } from './overflow-content'
import { PAGE_READ_ONLY_STATES } from './read-only-states'
import { PAGE_SEARCH } from './search'
import { PAGE_STATUS_INDICATORS } from './status-indicators'
import { PAGE_TEXT_TOOLBARS } from './text-toolbars'
import { PAGE_COMMUNITY_CHATBOTS } from './community-chatbots'
import { PAGE_COMMUNITY_IN_APP_LEARNING } from './community-in-app-learning'
import { PAGE_COMMUNITY_CREATE_FLOWS } from './community-create-flows'
import { PAGE_COMMUNITY_EDIT } from './community-edit'
import { PAGE_COMMUNITY_EXPORT } from './community-export'
import { PAGE_COMMUNITY_API_KEY } from './community-api-key'
import { PAGE_COMMUNITY_IMPORT } from './community-import'
import { PAGE_COMMUNITY_ORDER_SUMMARY } from './community-order-summary'
import { PAGE_COMMUNITY_REMOVE } from './community-remove'

export * from './types'
export { PAGE_COMMON_ACTIONS } from './common-actions'
export { PAGE_DIALOGS } from './dialogs'
export { PAGE_DISABLED_STATES } from './disabled-states'
export { PAGE_DISCLOSURES } from './disclosures'
export { PAGE_EMPTY_STATES } from './empty-states'
export { PAGE_FILTERING } from './filtering'
export { PAGE_FLUID_STYLES } from './fluid-styles'
export { PAGE_FORMS } from './forms'
export { PAGE_GLOBAL_HEADER } from './global-header'
export { PAGE_LOADING } from './loading'
export { PAGE_LOGIN } from './login'
export { PAGE_NOTIFICATIONS } from './notifications'
export { PAGE_OVERFLOW_CONTENT } from './overflow-content'
export { PAGE_READ_ONLY_STATES } from './read-only-states'
export { PAGE_SEARCH } from './search'
export { PAGE_STATUS_INDICATORS } from './status-indicators'
export { PAGE_TEXT_TOOLBARS } from './text-toolbars'
export { PAGE_COMMUNITY_CHATBOTS } from './community-chatbots'
export { PAGE_COMMUNITY_IN_APP_LEARNING } from './community-in-app-learning'
export { PAGE_COMMUNITY_CREATE_FLOWS } from './community-create-flows'
export { PAGE_COMMUNITY_EDIT } from './community-edit'
export { PAGE_COMMUNITY_EXPORT } from './community-export'
export { PAGE_COMMUNITY_API_KEY } from './community-api-key'
export { PAGE_COMMUNITY_IMPORT } from './community-import'
export { PAGE_COMMUNITY_ORDER_SUMMARY } from './community-order-summary'
export { PAGE_COMMUNITY_REMOVE } from './community-remove'

export const PATTERN_PAGE_CONTENT: Record<PatternId, PatternPageDraft> = {
  'common-actions': PAGE_COMMON_ACTIONS,

  dialogs: PAGE_DIALOGS,

  'disabled-states': PAGE_DISABLED_STATES,

  disclosures: PAGE_DISCLOSURES,

  'empty-states': PAGE_EMPTY_STATES,

  filtering: PAGE_FILTERING,

  'fluid-styles': PAGE_FLUID_STYLES,

  forms: PAGE_FORMS,

  'global-header': PAGE_GLOBAL_HEADER,

  loading: PAGE_LOADING,

  login: PAGE_LOGIN,

  notifications: PAGE_NOTIFICATIONS,

  'overflow-content': PAGE_OVERFLOW_CONTENT,

  'read-only-states': PAGE_READ_ONLY_STATES,

  search: PAGE_SEARCH,

  'status-indicators': PAGE_STATUS_INDICATORS,

  'text-toolbars': PAGE_TEXT_TOOLBARS,

  'community-chatbots': PAGE_COMMUNITY_CHATBOTS,

  'community-in-app-learning': PAGE_COMMUNITY_IN_APP_LEARNING,

  'community-create-flows': PAGE_COMMUNITY_CREATE_FLOWS,

  'community-edit': PAGE_COMMUNITY_EDIT,

  'community-export': PAGE_COMMUNITY_EXPORT,

  'community-api-key': PAGE_COMMUNITY_API_KEY,

  'community-import': PAGE_COMMUNITY_IMPORT,

  'community-order-summary': PAGE_COMMUNITY_ORDER_SUMMARY,

  'community-remove': PAGE_COMMUNITY_REMOVE
}
