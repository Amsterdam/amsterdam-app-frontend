import type {ModuleClientConfig, CoreModuleConfig} from '@/modules/types'
import {aboutModule} from '@/modules/about'
import {accessCodeModule} from '@/modules/access-code'
import {addressModule} from '@/modules/address'
import {chatModule} from '@/modules/chat'
import {cityPassModule} from '@/modules/city-pass'
import {constructionWorkModule} from '@/modules/construction-work'
import {constructionWorkEditorModule} from '@/modules/construction-work-editor'
import {contactModule} from '@/modules/contact'
import {homeModule} from '@/modules/home'
import {mijnAmsterdamModule} from '@/modules/mijn-amsterdam'
import {notificationHistoryModule} from '@/modules/notification-history'
import {onboardingModule} from '@/modules/onboarding'
import {parkingModule} from '@/modules/parking'
import {redirectsModule} from '@/modules/redirects'
import {reportProblemModule} from '@/modules/report-problem'
import {userModule} from '@/modules/user'
import {wasteContainerModule} from '@/modules/waste-container'
import {wasteGuideModule} from '@/modules/waste-guide'

/**
 * Core Modules don't have a server part and are always loaded.
 */
export const coreModules = [
  accessCodeModule,
  addressModule,
  homeModule,
  onboardingModule,
  userModule,
]

/**
 * Client Modules have a server part and can be turned on/off per release.
 */
export const clientModules = [
  aboutModule,
  chatModule,
  cityPassModule,
  constructionWorkEditorModule,
  constructionWorkModule,
  contactModule,
  mijnAmsterdamModule,
  notificationHistoryModule,
  parkingModule,
  redirectsModule,
  reportProblemModule,
  wasteContainerModule,
  wasteGuideModule,
]

export const allModules: Array<ModuleClientConfig | CoreModuleConfig> = [
  ...coreModules,
  ...clientModules,
]
