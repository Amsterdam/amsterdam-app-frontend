import {ClientModule} from '../types'
import {TemplateStack} from './Stack'

// TODO Add to `clientModules` in `/src/modules/index`.
export const module: ClientModule = {
  isCore: false,
  linking: {},
  name: 'TemplateModule',
  slug: 'template',
  stack: TemplateStack,
  state: [],
}
