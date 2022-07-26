import {StackNavigationRoutes} from '@/app/navigation'
import {TemplateStackParams, TemplateRouteName} from '@/modules/template/routes'
import {TemplateScreen} from '@/modules/template/screens'

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
