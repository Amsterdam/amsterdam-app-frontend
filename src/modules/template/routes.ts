import {StackNavigationRoutes} from '../../app/navigation'
import {TemplateScreen} from './screens'

export enum TemplateRouteName {
  home = 'Home',
}

export type TemplateStackParams = {
  [TemplateRouteName.home]: undefined
}

export const templateRoutes: StackNavigationRoutes<
  TemplateStackParams,
  TemplateRouteName
> = {
  [TemplateRouteName.home]: {
    component: TemplateScreen,
    name: TemplateRouteName.home,
    options: {
      headerTitle: 'Template',
    },
  },
}
