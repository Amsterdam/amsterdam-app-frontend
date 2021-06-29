import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import Button from '../components/ui/Button'
import ScreenWrapper from '../components/ui/ScreenWrapper'

const styles = StyleSheet.create({
  body: {
    padding: 45,
  },
  gap: {
    marginBottom: 15,
  },
})

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

const HomeScreen = ({navigation}: HomeScreenProps) => {
  return (
    <ScreenWrapper>
      <View style={styles.body}>
        <View style={styles.gap}>
          <Button
            onPress={() =>
              navigation.navigate('Melding', {
                uri: 'https://acc.meldingen.amsterdam.nl/',
              })
            }
            text="Maak een melding"
          />
        </View>
        <Button
          onPress={() => navigation.navigate('Project')}
          text="Bekijk bouwprojecten"
        />
      </View>
    </ScreenWrapper>
  )
}

export default HomeScreen
