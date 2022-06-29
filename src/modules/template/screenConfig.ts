import {StackNavigationRoutes} from '../../app/navigation'
import {TemplateStackParams, TemplateRouteName} from './routes'
import {TemplateScreen} from './screens'

export const templateScreenConfig: StackNavigationRoutes<
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
