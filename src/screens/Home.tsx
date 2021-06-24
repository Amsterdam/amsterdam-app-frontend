import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import Button from '../components/ui/Button'
import ScreenWrapper from '../components/ui/ScreenWrapper'

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

const HomeScreen = ({navigation}: HomeScreenProps) => {
  return (
    <ScreenWrapper>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() =>
            navigation.navigate('Melding', {
              uri: 'https://acc.meldingen.amsterdam.nl/',
            })
          }
          text="Maak een melding"
        />
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 32,
  },
})

export default HomeScreen
