import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {Button, ScreenWrapper, Text} from '../components/ui'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

export const HomeScreen = ({navigation}: Props) => {
  return (
    <ScreenWrapper>
      <View style={styles.body}>
        <View style={styles.gap}>
          <Button
            onPress={() =>
              navigation.navigate(routes.report.name, {
                uri: 'https://acc.meldingen.amsterdam.nl/',
              })
            }
            variant="primary">
            <Text variant="inverse">Maak een melding</Text>
          </Button>
        </View>
        <Button
          onPress={() => navigation.navigate(routes.projectOverview.name)}
          variant="primary">
          <Text variant="inverse">Bekijk bouwprojecten</Text>
        </Button>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  body: {
    padding: 45,
  },
  gap: {
    marginBottom: 15,
  },
})
