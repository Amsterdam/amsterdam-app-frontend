import {module as aboutModule} from './about'
import {module as addressModule} from './address'
import {module as constructionWorkModule} from './construction-work'
import {module as constructionWorkEditorModule} from './construction-work-editor'
import {module as contactModule} from './contact'
import {module as homeModule} from './home'
import {module as openWasteContainerModule} from './open-waste-container'
import {module as redirectsModule} from './redirects'
import {module as reportProblemModule} from './report-problem'
import {module as userModule} from './user'
import {module as wasteGuideModule} from './waste-guide'

const coreModules = [addressModule, homeModule, userModule]

export const clientModules = [
  ...coreModules,
  aboutModule,
  constructionWorkEditorModule,
  constructionWorkModule,
  contactModule,
  openWasteContainerModule,
  redirectsModule,
  reportProblemModule,
  wasteGuideModule,
]
