import React from 'react'
import {PressableProps} from 'react-native'
import {
  Car,
  Card,
  Collaborate,
  DocumentText,
  Housing,
  Login,
  PersonDesk,
  Stadspas,
} from '@/assets/icons'
import {IconWithTitleButton} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
import {Theme, useThemable} from '@/themes'
import {SvgProps} from '@/types'
import {accessibleText, openWebUrl} from '@/utils'

type Redirect = {
  key: string
  icon: React.ReactNode
  text: string
  title: string
} & Partial<Pick<PressableProps, 'accessibilityRole' | 'onPress'>>

const createRedirects = (iconProps: SvgProps): Redirect[] => [
  {
    accessibilityRole: 'link',
    icon: <Car {...iconProps} />,
    key: 'car',
    onPress: () => openWebUrl('https://www.amsterdam.nl/parkeren-verkeer/'),
    text: 'Alles over parkeren en verkeer in de stad.',
    title: 'Parkeren',
  },
  {
    accessibilityRole: 'link',
    icon: <Login {...iconProps} />,
    key: 'login',
    onPress: () => openWebUrl('https://aanmeldenparkeren.amsterdam.nl/'),
    text: 'Bezoekers- of kraskaart-vergunning? Geef hier parkeertijd van uw bezoek door.',
    title: 'Parkeertijd bezoek doorgeven',
  },
  {
    accessibilityRole: 'link',
    icon: <Card {...iconProps} />,
    key: 'card',
    onPress: () =>
      openWebUrl(
        'https://www.amsterdam.nl/veelgevraagd/?productid=%7B5D0CD50F-C487-484A-9F6F-FACBD33D6DEF%7D',
      ),
    text: 'U kunt uw rijbewijs online verlengen via de RDW.',
    title: 'Rijbewijs verlengen',
  },
  {
    accessibilityRole: 'link',
    icon: <DocumentText {...iconProps} />,
    key: 'document-text',
    onPress: () =>
      openWebUrl('https://www.amsterdam.nl/burgerzaken/akten-uittreksels/'),
    text: 'Geboorte-, huwelijks- en andere akten, uittreksel, VOG.',
    title: 'Akten, uittreksels en verklaringen',
  },
  {
    accessibilityRole: 'link',
    icon: <Housing {...iconProps} />,
    key: 'housing',
    onPress: () =>
      openWebUrl('https://www.amsterdam.nl/burgerzaken/verhuizing-doorgeven/'),
    text: 'Naar en binnen Amsterdam.',
    title: 'Verhuizing doorgeven',
  },
  {
    accessibilityRole: 'link',
    icon: <PersonDesk {...iconProps} />,
    key: 'persondesk',
    onPress: () =>
      openWebUrl('https://www.amsterdam.nl/contact/afspraak-maken-stadsloket/'),
    text: 'Bekijk voor welke onderwerpen u een afspraak kunt maken.',
    title: 'Afspraak maken op Stadsloket',
  },
  {
    accessibilityRole: 'link',
    icon: <Collaborate {...iconProps} />,
    key: 'collaborate',
    onPress: () =>
      openWebUrl(
        'https://www.amsterdam.nl/werk-inkomen/hulp-bij-laag-inkomen/',
      ),
    text: 'Regelingen bij laag inkomen / Pak je kans.',
    title: 'Hulp bij een laag inkomen',
  },
  {
    accessibilityRole: 'link',
    icon: <Stadspas {...iconProps} />,
    key: 'stadspas',
    onPress: () => openWebUrl('https://www.amsterdam.nl/stadspas/'),
    text: 'Voor Amsterdammers met een laag inkomen.',
    title: 'Stadspas',
  },
]

export const Redirects = () => {
  const iconProps = useThemable(createIconProps)
  const redirects = createRedirects(iconProps)

  return (
    <Column gutter="sm">
      {redirects.map(redirect => (
        <IconWithTitleButton
          accessibilityLabel={accessibleText(redirect.title, redirect.text)}
          {...redirect}
        />
      ))}
    </Column>
  )
}

const createIconProps = ({color}: Theme): SvgProps => ({
  fill: color.text.link,
})
