import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {TopTaskButton} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
import {IconName} from '@/components/ui/media'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {accessibleText, openWebUrl} from '@/utils'

type RedirectResponse = {
  iconName: IconName
  routeName?: RedirectsRouteName
  text: string
  title: string
  url?: string
}

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
    iconName: 'card',
    text: 'U kunt uw rijbewijs online verlengen via de RDW.',
    title: 'Rijbewijs verlengen',
    url: 'https://www.amsterdam.nl/veelgevraagd/?productid=%7B1783FA78-6E93-4B39-8257-BAABD81D4A54%7D',
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
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, RedirectsRouteName.redirects>
    >()

  return (
    <Column gutter="md">
      {redirects.map(({iconName, routeName, text, title, url}) => (
        <TopTaskButton
          accessibilityLabel={accessibleText(title, text)}
          accessibilityRole="link"
          key={iconName}
          onPress={() =>
            routeName ? navigation.navigate(routeName) : url && openWebUrl(url)
          }
          {...{iconName, text, title}}
        />
      ))}
    </Column>
  )
}