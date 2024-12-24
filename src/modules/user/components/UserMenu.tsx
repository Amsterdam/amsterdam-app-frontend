import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AddressRouteName} from '@/modules/address/routes'
import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'
import {UserMenuSection} from '@/modules/user/types'

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

const sections: UserMenuSection[] = [
  {
    navigationItems: [
      {
        icon: 'housing',
        label: 'Mijn adres',
        moduleSlug: ModuleSlug.address,
        route: AddressRouteName.address,
      },
      {
        icon: 'settings',
        label: 'Onderwerpen in de app',
        route: UserRouteName.moduleSettings,
      },
    ],
  },
]

const MenuSection = ({title, navigationItems}: UserMenuSection) => {
  const {navigate} = useNavigation()
  const {biometricsLabel} = useAccessCodeBiometrics()

  return (
    <Column gutter="sm">
      {!!title && (
        <Title
          level="h5"
          text={title}
        />
      )}
      {navigationItems.map(item =>
        item.route === UserRouteName.userBiometrics &&
        !biometricsLabel ? null : (
          <NavigationButton
            emphasis="default"
            iconSize="md"
            key={item.moduleSlug}
            {...item}
            label={
              item.route === UserRouteName.userBiometrics
                ? `Toegang met ${biometricsLabel}`
                : item.label
            }
            onPress={() =>
              navigate(item.moduleSlug ?? ModuleSlug.user, {screen: item.route})
            }
            testID={`NavigationButtonTo${item.route}`}
          />
        ),
      )}
    </Column>
  )
}

export const UserMenu = () => {
  const {accessCode} = useGetSecureAccessCode()

  return (
    <>
      {!!sections.length &&
        sections.map(section => (
          <MenuSection
            key={section.title}
            {...section}
          />
        ))}
      {!!accessCode && <MenuSection {...accessCodeSection} />}
    </>
  )
}
