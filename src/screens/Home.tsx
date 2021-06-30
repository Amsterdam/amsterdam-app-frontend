import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {Button, ScreenWrapper} from '../components/ui'

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  return (
    <ScreenWrapper>
      <View style={styles.body}>
        <View style={styles.gap}>
          <Button
            onPress={() =>
              navigation.navigate('Report', {
                uri: 'https://acc.meldingen.amsterdam.nl/',
              })
            }
            text="Maak een melding"
          />
        </View>
        <Button
          onPress={() => navigation.navigate('Projects')}
          text="Bekijk bouwprojecten"
        />
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
