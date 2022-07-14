import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Linking} from 'react-native'
import {RootStackParams} from '@/app/navigation'
import {Box, Text, Title} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {Gutter, Row} from '@/components/ui/layout'
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
            onPress: () =>
              Linking.openURL(
                'https://inzamelkalender.gad.nl/adres/' +
                  [
                    address.postcode,
                    address.huisnummer,
                    address.bag_toevoeging,
                  ].join(':'),
              ),
            label: 'Ga naar GAD.nl',
          },
        }
      : {
          title: 'Niet gevonden',
          text: `We konden geen afvalinformatie vinden voor het adres ${address.adres}, ${address.postcode} ${address.woonplaats}.`,
          button: {
            onPress: () =>
              navigation.navigate(WasteGuideRouteName.wasteGuideFeedback),
            label: 'Hier klopt iets niet',
            secondary: true,
          },
        }

  return (
    <Box>
      <Title level={2} text={content.title} />
      <Text>{content.text}</Text>
      <Gutter height="md" />
      <Row align="start">
        <Button
          label={content.button.label}
          onPress={content.button.onPress}
          variant={content.button.secondary ? 'secondary' : undefined}
        />
      </Row>
    </Box>
  )
}
