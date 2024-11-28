import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {ModuleSlug} from '@/modules/slugs'
import {UserMenuSection} from '@/modules/user/types'

const sections: UserMenuSection[] = [
  {
    title: 'Beveiliging',
    navigationItems: [
      {
        icon: 'accessCode',
        label: 'Wijzig toegangscode',
        moduleSlug: ModuleSlug['access-code'],
        route: AccessCodeRouteName.setAccessCode,
      },
    ],
  },
]

export const UserMenu = () => {
  const {navigate} = useNavigation()

  return sections.map(({title, navigationItems}) => (
    <Column
      gutter="sm"
      key={title}>
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
          onPress={() =>
            navigate(item.moduleSlug ?? ModuleSlug.user, {screen: item.route})
          }
          testID={`NavigationButtonTo${item.route}`}
        />
      ))}
    </Column>
  ))
}
