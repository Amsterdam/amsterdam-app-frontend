import AsyncStorage from '@react-native-async-storage/async-storage'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {ProjectSubscriptions} from '../components/features/ProjectSubscriptions'
import {Address} from '../components/features/address'
import {Box, Button} from '../components/ui'
import {Column, Gutter} from '../components/ui/layout'
import {getEnvironment} from '../environment'
import {AddressContext, DeviceContext} from '../providers'
import {size} from '../tokens'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

const testProjectId = 'ba8d667038f8efd9d5b0a4866f660d54'

export const HomeScreen = ({navigation}: Props) => {
  const deviceContext = useContext(DeviceContext)
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
          style={deviceContext.isLandscape && [styles.row, styles.alignStart]}>
          <View style={deviceContext.isLandscape && styles.halfWidth}>
            <Address />
          </View>
          <Gutter
            height={deviceContext.isPortrait ? size.spacing.xl : undefined}
            width={deviceContext.isPortrait ? undefined : size.spacing.xl}
          />
          <View
            style={[
              styles.halfWidth,
              deviceContext.isLandscape && styles.alignStart,
            ]}>
            <Column gutter="md">
              <Button
                onPress={() =>
                  navigation.navigate(routes.webView.name, {
                    title: 'Melding',
                    url: 'https://app.meldingen.amsterdam.nl/incident/beschrijf',
                    urlParams: {
                      lat: addressContext.address?.centroid[1],
                      lng: addressContext.address?.centroid[0],
                    },
                  })
                }
                text="Maak een melding"
              />
              <Button
                onPress={() => navigation.navigate(routes.projectOverview.name)}
                text="Bekijk werkzaamheden"
              />
              <Button
                onPress={() => navigation.navigate(routes.wasteGuide.name)}
                text="Raadpleeg afvalinformatie"
              />
              <Button
                onPress={() =>
                  navigation.navigate(routes.notificationOverview.name)
                }
                text="Controleer notificaties"
              />
              <Button
                onPress={() => navigation.navigate(routes.settings.name)}
                text="Stel instellingen in"
              />
              <ProjectSubscriptions projectId={testProjectId} />
              {getEnvironment().allowClearingAddress && (
                <Button
                  variant="secondary"
                  onPress={clearAddress}
                  text="Verwijder adres"
                />
              )}
            </Column>
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
  halfWidth: {
    flexBasis: '50%',
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
  },
})
