import {StackNavigationRoutes} from '../../app/navigation'
import {TemplateScreen} from './screens'

export enum TemplateRouteName {
  template = 'template',
}

type TemplateStackParams = {
  [TemplateRouteName.template]: undefined
}

export const templateRoutes: StackNavigationRoutes<
  TemplateStackParams,
  TemplateRouteName.template
> = {
  [TemplateRouteName.template]: {
    component: TemplateScreen,
    name: TemplateRouteName.template,
    options: {
      headerTitle: 'Template',
    },
  },
}
