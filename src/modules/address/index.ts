import {ClientModule} from '../types'
import {AddressStack} from './Stack'
import {addressSlice} from './addressSlice'

export const module: ClientModule = {
  isCore: true,
  linking: {},
  name: 'AddressModule',
  slug: 'address',
  stack: AddressStack,
  state: [addressSlice],
}
