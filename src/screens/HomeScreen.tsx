import AsyncStorage from '@react-native-async-storage/async-storage'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {Address} from '../components/features/address/Address'
import {Box, Button, Gutter} from '../components/ui'
import {getEnvironment} from '../environment'
import {AddressContext, OrientationContext} from '../providers'
import {size} from '../tokens'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

export const HomeScreen = ({navigation}: Props) => {
  const orientationContext = useContext(OrientationContext)
  const addressContext = useContext(AddressContext)

  const clearAddress = async () => {
    try {
      await AsyncStorage.removeItem('address')
      addressContext.changeAddress(undefined)
    } catch (e) {}

    console.log('Adres verwijderd.')
  }

  return (
    <>
      <Box inset="lg">
        <View style={!orientationContext.isPortrait && styles.row}>
          <Address key={addressContext.address?.huisnummer} />
          <Gutter
            height={orientationContext.isPortrait ? size.spacing.xl : undefined}
            width={orientationContext.isPortrait ? undefined : size.spacing.xl}
          />
          <View
            style={[
              styles.grow,
              !orientationContext.isPortrait && styles.alignStart,
            ]}>
            <Button
              onPress={() =>
                navigation.navigate(routes.webView.name, {
                  title: 'Melding',
                  uri: 'https://acc.meldingen.amsterdam.nl/',
                })
              }
              text="Maak een melding"
            />
            <Gutter height={size.spacing.md} />
            <Button
              onPress={() => navigation.navigate(routes.projectOverview.name)}
              text="Bekijk werkzaamheden"
            />
            <Gutter height={size.spacing.md} />
            <Button
              onPress={() => navigation.navigate(routes.wasteGuide.name)}
              text="Raadpleeg afvalinformatie"
            />
            {getEnvironment().allowClearingAddress && (
              <>
                <Gutter height={size.spacing.md} />
                <Button
                  variant="secondary"
                  onPress={clearAddress}
                  text="Verwijder adres"
                />
              </>
            )}
          </View>
        </View>
      </Box>
    </>
  )
}

const styles = StyleSheet.create({
  alignStart: {
    alignItems: 'flex-start',
  },
  grow: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
  },
})
