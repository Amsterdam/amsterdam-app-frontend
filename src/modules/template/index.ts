import {ClientModule} from '../types'
import {TemplateStack} from './Stack'

export const module: ClientModule = {
  isCore: true,
  linking: {},
  name: 'TemplateModule',
  slug: 'template',
  stack: TemplateStack,
  state: [],
}
