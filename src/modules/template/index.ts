import {ModuleClientConfig} from '../types'
import {TemplateStack} from './Stack'

// TODO Add to `clientModules` in `/src/modules/index`.
export const module: ModuleClientConfig = {
  isCore: false,
  linking: {},
  name: 'TemplateModule',
  slug: 'template',
  stack: TemplateStack,
  state: [],
}
