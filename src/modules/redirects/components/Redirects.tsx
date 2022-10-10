import React from 'react'
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

type RedirectResponse = {
  icon:
    | 'car'
    | 'card'
    | 'collaborate'
    | 'document-text'
    | 'housing'
    | 'login'
    | 'person-desk'
    | 'stadspas'
  link: string
  text: string
  title: string
}

const mockJSON: RedirectResponse[] = [
  {
    icon: 'car',
    link: 'https://www.amsterdam.nl/parkeren-verkeer/',
    text: 'Alles over parkeren en verkeer in de stad.',
    title: 'Parkeren',
  },
  {
    icon: 'login',
    link: 'https://aanmeldenparkeren.amsterdam.nl/',
    text: 'Bezoekers- of kraskaart-vergunning? Geef hier parkeertijd van uw bezoek door.',
    title: 'Parkeertijd bezoek doorgeven',
  },
  {
    icon: 'card',
    link: 'https://www.amsterdam.nl/veelgevraagd/?productid=%7B5D0CD50F-C487-484A-9F6F-FACBD33D6DEF%7D',
    text: 'U kunt uw rijbewijs online verlengen via de RDW.',
    title: 'Rijbewijs verlengen',
  },
  {
    icon: 'document-text',
    link: 'https://www.amsterdam.nl/burgerzaken/akten-uittreksels/',
    text: 'Geboorte-, huwelijks- en andere akten, uittreksel, VOG.',
    title: 'Akten, uittreksels en verklaringen',
  },
  {
    icon: 'housing',
    link: 'https://www.amsterdam.nl/burgerzaken/verhuizing-doorgeven/',
    text: 'Naar en binnen Amsterdam.',
    title: 'Verhuizing doorgeven',
  },
  {
    icon: 'person-desk',
    link: 'https://www.amsterdam.nl/contact/afspraak-maken-stadsloket/',
    text: 'Bekijk voor welke onderwerpen u een afspraak kunt maken.',
    title: 'Afspraak maken op Stadsloket',
  },
  {
    icon: 'collaborate',
    link: 'https://www.amsterdam.nl/werk-inkomen/hulp-bij-laag-inkomen/',
    text: 'Regelingen bij laag inkomen / Pak je kans.',
    title: 'Hulp bij een laag inkomen',
  },
  {
    icon: 'stadspas',
    link: 'https://www.amsterdam.nl/stadspas/',
    text: 'Voor Amsterdammers met een laag inkomen.',
    title: 'Stadspas',
  },
]

export const icons: {[i in RedirectResponse['icon']]: React.ElementType} = {
  car: Car,
  card: Card,
  collaborate: Collaborate,
  'document-text': DocumentText,
  housing: Housing,
  login: Login,
  'person-desk': PersonDesk,
  stadspas: Stadspas,
}

export const Redirects = () => {
  const iconProps = useThemable(createIconProps)
  return (
    <Column gutter="sm">
      {mockJSON.map(redirect => {
        const {icon, link, text, title} = redirect
        const Icon = icons[icon]
        return (
          <IconWithTitleButton
            {...redirect}
            accessibilityLabel={accessibleText(title, text)}
            accessibilityRole="link"
            icon={<Icon {...iconProps} />}
            key={icon}
            onPress={() => openWebUrl(link)}
          />
        )
      })}
    </Column>
  )
}

const createIconProps = ({color}: Theme): SvgProps => ({
  fill: color.text.link,
})
