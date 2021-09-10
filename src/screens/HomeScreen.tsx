import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {Address} from '../components/features/address/Address'
import {Box, Button, Gutter} from '../components/ui'
import {OrientationContext} from '../providers'
import {size} from '../tokens'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

export const HomeScreen = ({navigation}: Props) => {
  const orientationContext = useContext(OrientationContext)

  return (
    <>
      <Box inset="lg">
        <View style={!orientationContext.isPortrait && styles.row}>
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
