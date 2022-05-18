import {module as addressModule} from './address'
import {module as cityOfficesModule} from './city-offices'
import {module as constructionWorkModule} from './construction-work'
import {module as contactModule} from './contact'
import {module as homeModule} from './home'
import {module as openWasteContainerModule} from './open-waste-container'
import {module as reportProblemModule} from './report-problem'
import {module as settingsModule} from './settings'
import {module as userModule} from './user'
import {module as wasteGuideModule} from './waste-guide'

const coreModules = [addressModule, homeModule, settingsModule, userModule]

export const clientModules = [
  ...coreModules,
  wasteGuideModule,
  openWasteContainerModule,
  constructionWorkModule,
  reportProblemModule,
  cityOfficesModule,
  contactModule,
]
