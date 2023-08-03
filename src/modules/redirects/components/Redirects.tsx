import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParams} from '@/app/navigation/types'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {Column} from '@/components/ui/layout/Column'
import {IconName} from '@/components/ui/media/iconPaths'
import {TestProps} from '@/components/ui/types'
import {useOpenWebUrl} from '@/hooks/useOpenWebUrl'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type RedirectResponse = {
  iconName: IconName
  routeName?: RedirectsRouteName
  text: string
  title: string
  url?: string
} & TestProps

const redirects: RedirectResponse[] = [
  {
    iconName: 'car',
    text: 'Alles over parkeren en verkeer in de stad.',
    title: 'Parkeren',
    url: 'https://www.amsterdam.nl/parkeren-verkeer/',
  },
  {
    iconName: 'login',
    text: 'Bezoekers- of kraskaart-vergunning? Geef hier parkeertijd van uw bezoek door.',
    title: 'Parkeertijd bezoek doorgeven',
    url: 'https://aanmeldenparkeren.amsterdam.nl/',
  },
  {
    iconName: 'document-text',
    text: 'Geboorte-, huwelijks- en andere akten, uittreksel, VOG.',
    title: 'Akten, uittreksels en verklaringen',
    url: 'https://www.amsterdam.nl/burgerzaken/akten-uittreksels/',
  },
  {
    iconName: 'housing',
    text: 'Naar en binnen Amsterdam.',
    title: 'Verhuizing doorgeven',
    url: 'https://www.amsterdam.nl/burgerzaken/verhuizing-doorgeven/',
  },
  {
    iconName: 'person-desk',
    routeName: RedirectsRouteName.selectCity,
    testID: 'RedirectsMakeAppointmentButton',
    text: 'Bekijk voor welke onderwerpen u een afspraak kunt maken.',
    title: 'Afspraak maken op Stadsloket',
  },
  {
    iconName: 'collaborate',
    text: 'Regelingen bij laag inkomen / Pak je kans.',
    title: 'Hulp bij een laag inkomen',
    url: 'https://www.amsterdam.nl/werk-inkomen/hulp-bij-laag-inkomen/',
  },
  {
    iconName: 'city-pass',
    text: 'Voor Amsterdammers met een laag inkomen.',
    title: 'Stadspas',
    url: 'https://www.amsterdam.nl/stadspas/',
  },
]

export const Redirects = () => {
  const openWebUrl = useOpenWebUrl()
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, RedirectsRouteName.redirects>
    >()

  return (
    <Column gutter="md">
      {redirects.map(({iconName, routeName, text, title, url}) => (
        <TopTaskButton
          accessibilityLabel={accessibleText(title, text)}
          accessibilityRole={routeName ? 'button' : 'link'}
          iconName={iconName}
          key={iconName}
          onPress={() =>
            routeName ? navigation.navigate(routeName) : url && openWebUrl(url)
          }
          text={text}
          title={title}
        />
      ))}
    </Column>
  )
}
