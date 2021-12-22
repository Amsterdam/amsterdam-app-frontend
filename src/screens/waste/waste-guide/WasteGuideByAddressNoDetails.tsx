import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Linking} from 'react-native'
import {menuScreenOptions} from '../../../App/navigation/screenOptions'
import {MenuStackParamList} from '../../../App/navigation/types'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Text,
  Title,
} from '../../../components/ui'
import {Gutter, Row} from '../../../components/ui/layout'
import {size} from '../../../tokens'
import {Address} from '../../../types'

type Props = {
  address: Address
}

export const WasteGuideByAddressNoDetails = ({address}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<MenuStackParamList, 'Waste'>>()

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
              navigation.navigate(menuScreenOptions.webView.name, {
                sliceFromTop: {portrait: 161, landscape: 207},
                title: 'Melden afvalinformatie',
                url: 'https://formulier.amsterdam.nl/thema/afval-grondstoffen/klopt-afvalwijzer/Reactie/',
              }),
            label: 'Hier klopt iets niet',
            secondary: true,
          },
        }

  return (
    <Card>
      <CardHeader>
        <Title level={4} text={content.title} />
      </CardHeader>
      <CardBody>
        <Text>{content.text}</Text>
        <Gutter height={size.spacing.md} />
        <Row align="start">
          <Button
            onPress={content.button.onPress}
            text={content.button.label}
            variant={content.button.secondary ? 'secondary' : undefined}
          />
        </Row>
      </CardBody>
    </Card>
  )
}
