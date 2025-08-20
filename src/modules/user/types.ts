import {SvgIconName} from '@/components/ui/media/svgIcons'
import {ApiSlug} from '@/environment'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AddressRouteName} from '@/modules/address/routes'
import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'

export type UserMenuSection = {
  navigationItems: UserMenuSectionItem[]
  title?: string
}

export type UserMenuSectionItem = {
  icon: SvgIconName
  label: string
  moduleSlug?: ModuleSlug
  route?: AccessCodeRouteName | AddressRouteName | UserRouteName
}

export type NotificationModule = {
  description: string
  module: ApiSlug
  types: [
    {
      description: string
      type: string
    },
  ]
}

export type NotificationModulesResponse = NotificationModule[]
