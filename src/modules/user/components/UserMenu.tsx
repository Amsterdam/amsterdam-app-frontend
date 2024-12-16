import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {ModuleSlug} from '@/modules/slugs'
import {UserMenuSection} from '@/modules/user/types'

const accessCodeSection: UserMenuSection = {
  title: 'Beveiliging',
  navigationItems: [
    {
      icon: 'accessCode',
      label: 'Wijzig toegangscode',
      moduleSlug: ModuleSlug['access-code'],
      route: AccessCodeRouteName.setAccessCode,
    },
  ],
}

const sections: UserMenuSection[] = []

const MenuSection = ({title, navigationItems}: UserMenuSection) => {
  const {navigate} = useNavigation()

  return (
    <Column gutter="sm">
      <Title
        level="h5"
        text={title}
      />
      {navigationItems.map(item => (
        <NavigationButton
          emphasis="default"
          iconSize="md"
          key={item.route}
          {...item}
          onPress={() => navigate(item.moduleSlug ?? ModuleSlug.user)}
          testID={`NavigationButtonTo${item.route}`}
        />
      ))}
    </Column>
  )
}

export const UserMenu = () => {
  const {accessCode} = useGetSecureAccessCode()

  return (
    <>
      {!!accessCode && <MenuSection {...accessCodeSection} />}
      {!!sections.length &&
        sections.map(section => (
          <MenuSection
            key={section.title}
            {...section}
          />
        ))}
    </>
  )
}
