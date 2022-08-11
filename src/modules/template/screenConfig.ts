import {StackNavigationRoutes} from '@/app/navigation'
import {
  TemplateStackParams,
  TemplateRouteName,
  TemplateModalName,
  TemplateModalParams,
} from '@/modules/template/routes'
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
export const addressModals: StackNavigationRoutes<
  TemplateModalParams,
  TemplateModalName
> = {
  [TemplateModalName.modal]: {
    component: TemplateScreen,
    name: TemplateModalName.modal,
    options: {
      headerTitle: 'Template modal',
    },
  },
}
