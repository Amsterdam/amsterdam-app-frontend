import {SvgIconName} from '@/components/ui/media/svgIcons'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AddressRouteName} from '@/modules/address/routes'
import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'

export type UserMenuSection = {
  navigationItems: UserMenuSectionItem[]
  title?: string
}

export type UserMenuSectionItem = {
  iconName: SvgIconName
  label: string
  moduleSlug?: ModuleSlug
  route?: AccessCodeRouteName | AddressRouteName | UserRouteName
}
