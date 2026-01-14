import {electionsSvgIcons} from '@/modules/elections/constants/icons'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const electionsModule = createClientModule({
  name: 'ElectionsModule',
  slug: ModuleSlug.elections,
  icons: electionsSvgIcons,
})
