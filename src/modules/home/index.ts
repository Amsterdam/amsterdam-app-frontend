import {HomeStack} from '@/modules/home/Stack'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  isCore: true,
  linking: {},
  name: 'HomeModule',
  slug: 'home',
  stack: HomeStack,
  state: [],
}
