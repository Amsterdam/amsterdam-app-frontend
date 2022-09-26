import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Linking} from 'react-native'
import {RootStackParams} from '@/app/navigation'
import {Box} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {Column, Row} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {ModuleSlug} from '@/modules/slugs'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {Address} from '@/types'

type Props = {
  address: Address
}

export const WasteGuideByAddressNoDetails = ({address}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof ModuleSlug['waste-guide']>
    >()

  const content =
    address.woonplaats === 'Weesp'
      ? {
          title: 'GAD',
          text:
            'Het afval in Weesp wordt niet opgehaald door Gemeente Amsterdam ' +
            'maar door het GAD. Bekijk hun website voor meer informatie.',
          button: {
            onPress: () => {
              // eslint-disable-next-line no-void
              void Linking.openURL(
                'https://inzamelkalender.gad.nl/adres/' +
                  [
                    address.postcode,
                    address.huisnummer,
                    address.bag_toevoeging,
                  ].join(':'),
              )
            },
            label: 'Ga naar GAD.nl',
          },
        }
      : {
          title: 'Niet gevonden',
          text: `We konden geen afvalinformatie vinden voor het adres ${address.adres}, ${address.postcode} ${address.woonplaats}.`,
          button: {
            onPress: () => {
              navigation.navigate(WasteGuideRouteName.wasteGuideFeedback)
            },
            label: 'Hier klopt iets niet',
            secondary: true,
          },
        }

  return (
    <Box insetHorizontal="md">
      <Column gutter="sm">
        <Title level="h2" text={content.title} />
        <Paragraph>{content.text}</Paragraph>
        <Row align="start">
          <Button
            label={content.button.label}
            onPress={content.button.onPress}
            variant={content.button.secondary ? 'secondary' : undefined}
          />
        </Row>
      </Column>
    </Box>
  )
}
