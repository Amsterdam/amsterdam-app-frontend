import AsyncStorage from '@react-native-async-storage/async-storage'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {Address} from '../components/features/address'
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
    <ScrollView>
      <Box>
        <View
          style={
            !orientationContext.isPortrait && [styles.row, styles.alignStart]
          }>
          <Address />
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
                  sliceFromTop: {portrait: 53, landscape: 159},
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
    </ScrollView>
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
