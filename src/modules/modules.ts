import {module as aboutModule} from '@/modules/about'
import {module as addressModule} from '@/modules/address'
import {module as constructionWorkModule} from '@/modules/construction-work'
import {module as constructionWorkEditorModule} from '@/modules/construction-work-editor'
import {module as contactModule} from '@/modules/contact'
import {module as homeModule} from '@/modules/home'
import {module as openWasteContainerModule} from '@/modules/open-waste-container'
import {module as redirectsModule} from '@/modules/redirects'
import {module as reportProblemModule} from '@/modules/report-problem'
import {module as userModule} from '@/modules/user'
import {module as wasteGuideModule} from '@/modules/waste-guide'
import {module as welcomeModule} from '@/modules/welcome'

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
  welcomeModule,
]
