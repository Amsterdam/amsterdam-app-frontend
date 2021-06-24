import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import {color} from '../tokens'
import Button from '../components/ui/Button'
import {RootStackParamList} from '../../App'

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? color.tint.level7 : color.tint.level1,
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
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
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 32,
  },
})

export default HomeScreen