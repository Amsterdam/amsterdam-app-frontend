import {ClientModule} from '../types'
import {CityOfficesStack} from './Stack'

export const module: ClientModule = {
  linking: {},
  name: 'CityOfficesModule',
  slug: 'city-offices',
  stack: CityOfficesStack,
  state: [],
}
