import {View} from 'react-native'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useModules} from '@/hooks/useModules'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AddressRouteName} from '@/modules/address/routes'
import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'
import {UserMenuSection, UserMenuSectionItem} from '@/modules/user/types'

const accessCodeSection: UserMenuSection = {
  title: 'Beveiliging',
  navigationItems: [
    {
      icon: 'accessCode',
      label: 'Wijzig toegangscode',
      moduleSlug: ModuleSlug['access-code'],
    },
    {
      icon: 'lock',
      label: 'Toegang met biometrische gevens',
      route: UserRouteName.userBiometrics,
    },
  ],
}

const getSections = (
  moduleSections: UserMenuSectionItem[],
): UserMenuSection[] => [
  {
    navigationItems: [
      {
        icon: 'housing',
        label: 'Mijn adres',
        moduleSlug: ModuleSlug.address,
        route: AddressRouteName.address,
      },
      {
        iconName: 'alarm',
        label: 'Pushmeldingen',
        route: UserRouteName.notificationSettings,
      },
      ...moduleSections,
      {
        icon: 'settings',
        label: 'Onderwerpen in de app',
        route: UserRouteName.moduleSettings,
      },
    ],
  },
]

const MenuSection = ({title, navigationItems}: UserMenuSection) => {
  const {biometricsLabel, isEnrolled} = useAccessCodeBiometrics()
  const {navigate} = useNavigation()

  return (
    <Column gutter="sm">
      {!!title && (
        <Title
          level="h5"
          text={title}
        />
      )}
      <Column gutter="xxs">
        {navigationItems.map(item =>
          item.route === UserRouteName.userBiometrics &&
          (!biometricsLabel || !isEnrolled) ? null : (
            <NavigationButton
              emphasis="default"
              iconSize="md"
              key={item.icon}
              {...item}
              onPress={() =>
                navigate(item.moduleSlug ?? ModuleSlug.user, {
                  screen: item.route,
                })
              }
              testID={`UserNavigationTo${item.route}Button`}
              title={
                item.route === UserRouteName.userBiometrics
                  ? `Toegang met ${biometricsLabel}`
                  : item.label
              }
            />
          ),
        )}
      </Column>
    </Column>
  )
}

export const UserMenu = () => {
  const {accessCode} = useGetSecureAccessCode()
  const {enabledModules, modulesLoading} = useModules()
  const moduleMenuSections = enabledModules
    ? enabledModules.flatMap(m => m.userMenuSection?.navigationItems || [])
    : []
  const sections = getSections(moduleMenuSections)

  if (modulesLoading) {
    return <PleaseWait testID="UserMenuPleaseWait" />
  }

  return (
    <View testID="UserMenu">
      <Column gutter="lg">
        {!!sections.length &&
          sections.map(section => (
            <MenuSection
              key={section.navigationItems[0].icon}
              {...section}
            />
          ))}
        {!!accessCode && <MenuSection {...accessCodeSection} />}
      </Column>
    </View>
  )
}
