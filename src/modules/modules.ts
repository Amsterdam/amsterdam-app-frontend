import {aboutModule} from '@/modules/about'
import {addressModule} from '@/modules/address'
import {constructionWorkModule} from '@/modules/construction-work'
import {constructionWorkEditorModule} from '@/modules/construction-work-editor'
import {contactModule} from '@/modules/contact'
import {homeModule} from '@/modules/home'
import {onboardingModule} from '@/modules/onboarding'
import {openWasteContainerModule} from '@/modules/open-waste-container'
import {redirectsModule} from '@/modules/redirects'
import {reportProblemModule} from '@/modules/report-problem'
import {userModule} from '@/modules/user'
import {wasteGuideModule} from '@/modules/waste-guide'

export const coreModules = [addressModule, homeModule, userModule]

export const clientModules = [
  aboutModule,
  constructionWorkEditorModule,
  constructionWorkModule,
  contactModule,
  openWasteContainerModule,
  redirectsModule,
  reportProblemModule,
  wasteGuideModule,
  onboardingModule,
]
