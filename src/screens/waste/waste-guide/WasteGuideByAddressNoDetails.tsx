import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../../../App'
import {Box, Button, Gutter, Text} from '../../../components/ui'
import {size} from '../../../tokens'
import {Address} from '../../../types'

type Props = {
  address: Address
}

export const WasteGuideByAddressNoDetails = ({address}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Waste'>>()

  return (
    <Box background="lighter">
      <Text>
        Geen afvalinformatie gevonden voor {address.adres}, {address.postcode}{' '}
        {address.woonplaats}.
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
    </Box>
  )
}

const styles = StyleSheet.create({
  alignLeft: {
    alignItems: 'flex-start',
  },
})
