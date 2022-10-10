import {StackNavigationRoutes} from '@/app/navigation'
import {
  TemplateModalName,
  TemplateModalParams,
  TemplateRouteName,
  TemplateStackParams,
} from '@/modules/template/routes'
import {TemplateScreen} from '@/modules/template/screens'

export const screenConfig: StackNavigationRoutes<
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

export const templateModals: StackNavigationRoutes<
  TemplateModalParams,
  TemplateModalName
> = {
  [TemplateModalName.modal]: {
    component: TemplateScreen,
    name: TemplateModalName.modal,
  },
}
