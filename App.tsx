/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native'
import React, {useState} from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native'
import Button from './src/components/ui/Button'
import {color} from './src/tokens/color'

const App = () => {
  const [counter, setCounter] = useState(0)

  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? color.tint.level7 : color.tint.level1,
  }

  const updateCounter = () => setCounter(counter + 1)

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View style={styles.buttonContainer}>
            <Button onPress={updateCounter} text={`${counter} keer geklikt!`} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 32,
  },
})

export default App
