import {TurboModuleRegistry} from 'react-native'
import type {NativeSalesforceMessagingInApp} from './types'
import type {TurboModule} from 'react-native'

export type Spec = TurboModule & NativeSalesforceMessagingInApp

export default TurboModuleRegistry.getEnforcing<Spec>(
  'SalesforceMessagingInApp',
)
