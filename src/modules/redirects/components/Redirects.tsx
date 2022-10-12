import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {
  Car,
  Card,
  CityPass,
  Collaborate,
  DocumentText,
  Housing,
  Login,
  PersonDesk,
} from '@/assets/icons'
import {IconWithTitleButton} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {Theme, useThemable} from '@/themes'
import {SvgProps} from '@/types'
import {accessibleText, openWebUrl} from '@/utils'

type RedirectResponse = {
  icon:
    | 'car'
    | 'card'
    | 'collaborate'
    | 'document-text'
    | 'housing'
    | 'login'
    | 'person-desk'
    | 'city-pass'
  internalLink?: RedirectsRouteName
  text: string
  title: string
  url?: string
}

const redirects: RedirectResponse[] = [
  {
    icon: 'car',
    text: 'Alles over parkeren en verkeer in de stad.',
    title: 'Parkeren',
    url: 'https://www.amsterdam.nl/parkeren-verkeer/',
  },
  {
    icon: 'login',
    text: 'Bezoekers- of kraskaart-vergunning? Geef hier parkeertijd van uw bezoek door.',
    title: 'Parkeertijd bezoek doorgeven',
    url: 'https://aanmeldenparkeren.amsterdam.nl/',
  },
  {
    icon: 'card',
    text: 'U kunt uw rijbewijs online verlengen via de RDW.',
    title: 'Rijbewijs verlengen',
    url: 'https://www.amsterdam.nl/veelgevraagd/?productid=%7B5D0CD50F-C487-484A-9F6F-FACBD33D6DEF%7D',
  },
  {
    icon: 'document-text',
    text: 'Geboorte-, huwelijks- en andere akten, uittreksel, VOG.',
    title: 'Akten, uittreksels en verklaringen',
    url: 'https://www.amsterdam.nl/burgerzaken/akten-uittreksels/',
  },
  {
    icon: 'housing',
    text: 'Naar en binnen Amsterdam.',
    title: 'Verhuizing doorgeven',
    url: 'https://www.amsterdam.nl/burgerzaken/verhuizing-doorgeven/',
  },
  {
    icon: 'person-desk',
    internalLink: RedirectsRouteName.cityOfficeSelection,
    text: 'Bekijk voor welke onderwerpen u een afspraak kunt maken.',
    title: 'Afspraak maken op Stadsloket',
  },
  {
    icon: 'collaborate',
    text: 'Regelingen bij laag inkomen / Pak je kans.',
    title: 'Hulp bij een laag inkomen',
    url: 'https://www.amsterdam.nl/werk-inkomen/hulp-bij-laag-inkomen/',
  },
  {
    icon: 'city-pass',
    text: 'Voor Amsterdammers met een laag inkomen.',
    title: 'Stadspas',
    url: 'https://www.amsterdam.nl/stadspas/',
  },
]

export const icons: {[i in RedirectResponse['icon']]: React.ElementType} = {
  car: Car,
  card: Card,
  'city-pass': CityPass,
  collaborate: Collaborate,
  'document-text': DocumentText,
  housing: Housing,
  login: Login,
  'person-desk': PersonDesk,
}

export const Redirects = () => {
  const iconProps = useThemable(createIconProps)
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, RedirectsRouteName.redirects>
    >()

  return (
    <Column>
      {redirects.map(({icon, internalLink, text, title, url}) => {
        const Icon = icons[icon]

        return (
          <IconWithTitleButton
            accessibilityLabel={accessibleText(title, text)}
            accessibilityRole="link"
            icon={<Icon {...iconProps} />}
            key={icon}
            onPress={() =>
              internalLink
                ? navigation.navigate(internalLink)
                : url && openWebUrl(url)
            }
            text={text}
            title={title}
          />
        )
      })}
    </Column>
  )
}

const createIconProps = ({color}: Theme): SvgProps => ({
  fill: color.text.link,
})
