import React from 'react'
import {StyleSheet, View} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '../../App'
import Button from '../components/ui/Button'
import {WrapScreen} from '../components/ui/Container'

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

const HomeScreen = ({navigation}: HomeScreenProps) => {
  return (
    <WrapScreen>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() =>
              navigation.navigate('Melding', {
                uri: 'https://meldingen.amsterdam.nl/',
              })
            }
            text="Maak een melding"
          />
        </View>
    </WrapScreen>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 32,
  },
})

export default HomeScreen
