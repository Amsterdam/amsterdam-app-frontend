import {ModuleClientConfig} from '../types'
import {CityOfficesStack} from './Stack'

export const module: ModuleClientConfig = {
  linking: {},
  name: 'CityOfficesModule',
  slug: 'city-offices',
  stack: CityOfficesStack,
  state: [],
}
