import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {Address} from '../components/features/address'
import {Box, Button} from '../components/ui'
import {Column, Gutter} from '../components/ui/layout'
import {getEnvironment} from '../environment'
import {useAsyncStorage} from '../hooks'
import {AddressContext, DeviceContext} from '../providers'
import {size} from '../tokens'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

export const HomeScreen = ({navigation}: Props) => {
  const asyncStorage = useAsyncStorage()
  const deviceContext = useContext(DeviceContext)
  const addressContext = useContext(AddressContext)

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
                    url: `${
                      getEnvironment().signalsBaseUrl
                    }/incident/beschrijf`,
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
                text="Beheer instellingen"
              />
              {getEnvironment().allowClearingAsyncStorage && (
                <Button
                  onPress={() => asyncStorage.clear()}
                  text="Wis alle instellingen"
                  variant="secondary"
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
