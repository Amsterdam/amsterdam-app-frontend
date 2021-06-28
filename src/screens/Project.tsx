import React from 'react'
import {StyleSheet, View} from 'react-native'
import ScreenWrapper from '../components/ui/ScreenWrapper'
import Title from '../components/ui/Title'

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
})

const ProjectScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.screen}>
        <Title level={2}>Centrum</Title>
      </View>
    </ScreenWrapper>
  )
}

export default ProjectScreen
