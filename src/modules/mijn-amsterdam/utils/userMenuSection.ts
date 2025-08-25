import {ModuleSlug} from '@/modules/slugs'
import {UserMenuSection} from '@/modules/user/types'

export const mijnAmsterdamUserMenuSection: UserMenuSection = {
  title: 'Mijn Amsterdam',
  navigationItems: [
    {
      iconName: 'mijnAmsterdam',
      label: 'Mijn Amsterdam',
      moduleSlug: ModuleSlug['mijn-amsterdam'],
    },
  ],
}
