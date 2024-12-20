import {SvgIconName} from '@/components/ui/media/svgIcons'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'

export type UserMenuSection = {
  navigationItems: UserMenuSectionItem[]
  title: string
}

export type UserMenuSectionItem = {
  icon: SvgIconName
  label: string
  moduleSlug?: ModuleSlug
  route?: AccessCodeRouteName | UserRouteName
}
