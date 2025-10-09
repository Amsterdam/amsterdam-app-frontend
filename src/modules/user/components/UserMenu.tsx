import {View} from 'react-native'
import {CopyButton} from '@/components/ui/buttons/CopyButton'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useModules} from '@/hooks/useModules'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AddressRouteName} from '@/modules/address/routes'
import {OnboardingRouteName} from '@/modules/onboarding/routes'
import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'
import {UserMenuSection, UserMenuSectionItem} from '@/modules/user/types'
import {SHA256EncryptedDeviceId} from '@/utils/encryption'
import {VERSION_NUMBER_WITH_BUILD} from '@/utils/version'

const accessCodeSection: UserMenuSection = {
  title: 'Beveiliging',
  navigationItems: [
    {
      iconName: 'accessCode',
      label: 'Wijzig toegangscode',
      moduleSlug: ModuleSlug['access-code'],
    },
    {
      iconName: 'lock',
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
        iconName: 'housing',
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
        iconName: 'settings',
        label: 'Onderwerpen in de app',
        route: UserRouteName.moduleSettings,
      },
    ],
  },
]

const getAboutSections = (): UserMenuSection[] => [
  {
    title: 'Hulp en informatie',
    navigationItems: [
      {
        label: 'Over deze app',
        route: UserRouteName.appSummary,
      },
      {
        label: 'About this app',
        route: UserRouteName.aboutEnglish,
      },
      {
        label: 'Zo werkt de app',
        route: OnboardingRouteName.onboarding,
        moduleSlug: ModuleSlug.onboarding,
      },
      {
        label: 'Geef uw mening over de app',
        route: UserRouteName.feedback,
      },
      {
        label: 'Privacy verklaring',
        route: UserRouteName.privacyStatement,
      },
      {
        label: 'Toegankelijkheidsverklaring',
        route: UserRouteName.accessibilityStatement,
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
        <Box insetLeft="md">
          <Title
            level="h5"
            text={title}
          />
        </Box>
      )}
      <Column gutter="xxs">
        {navigationItems.map(item =>
          item.route === UserRouteName.userBiometrics &&
          (!biometricsLabel || !isEnrolled) ? null : (
            <NavigationButton
              emphasis="default"
              iconSize="md"
              key={item.label}
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
  const aboutSections = getAboutSections()

  if (modulesLoading) {
    return <PleaseWait testID="UserMenuPleaseWait" />
  }

  return (
    <View testID="UserMenu">
      <Column gutter="lg">
        {!!sections.length &&
          sections.map(section => (
            <MenuSection
              key={section.navigationItems[0].iconName}
              {...section}
            />
          ))}

        {!accessCode && <MenuSection {...accessCodeSection} />}

        {!!aboutSections.length &&
          aboutSections.map(section => (
            <MenuSection
              key={section.title}
              {...section}
            />
          ))}
      </Column>

      <Gutter height="md" />

      <Column>
        <CopyButton
          insetHorizontal="no"
          label={`Versie ${VERSION_NUMBER_WITH_BUILD}`}
          testID="AboutVersionNumberText"
          textToCopy={VERSION_NUMBER_WITH_BUILD}
          variant="tertiary"
        />
        <CopyButton
          ellipsizeMode="tail"
          insetHorizontal="no"
          label={`Installatie-id ${SHA256EncryptedDeviceId}`}
          numberOfLines={1}
          testID="AboutInstallationIdText"
          textToCopy={SHA256EncryptedDeviceId}
          variant="tertiary"
        />
      </Column>
    </View>
  )
}
