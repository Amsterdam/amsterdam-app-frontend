import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Linking, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../../../App'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Gutter,
  Text,
  Title,
} from '../../../components/ui'
import {size} from '../../../tokens'
import {Address} from '../../../types'

type Props = {
  address: Address
}

export const WasteGuideByAddressNoDetails = ({address}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Waste'>>()

  return (
    <Card>
      {address.woonplaats === 'Weesp' ? (
        <>
          <CardHeader>
            <Title level={4} text="GAD" />
          </CardHeader>
          <CardBody>
            <Text>
              Het afval in Weesp wordt niet opgehaald door Gemeente Amsterdam
              maar door het GAD. Bekijk hun website voor meer informatie.
            </Text>
            <Gutter height={size.spacing.md} />
            <View style={styles.alignLeft}>
              <Button
                onPress={() =>
                  Linking.openURL(
                    'https://inzamelkalender.gad.nl/adres/' +
                      [
                        address.postcode,
                        address.huisnummer,
                        address.bag_toevoeging,
                      ].join(':'),
                  )
                }
                text="Ga naar GAD.nl"
              />
            </View>
          </CardBody>
        </>
      ) : (
        <>
          <CardHeader>
            <Title level={4} text="Niet gevonden" />
          </CardHeader>
          <CardBody>
            <Text>
              Geen afvalinformatie gevonden voor {address.adres},{' '}
              {address.postcode} {address.woonplaats}.
            </Text>
            <Gutter height={size.spacing.md} />
            <View style={styles.alignLeft}>
              <Button
                onPress={() =>
                  navigation.navigate(routes.webView.name, {
                    sliceFromTop: {portrait: 161, landscape: 207},
                    title: 'Melding afvalinformatie',
                    uri: 'https://formulier.amsterdam.nl/thema/afval-grondstoffen/klopt-afvalwijzer/Reactie/',
                  })
                }
                text="Hier klopt iets niet"
                variant="secondary"
              />
            </View>
          </CardBody>
        </>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  alignLeft: {
    alignItems: 'flex-start',
  },
})
