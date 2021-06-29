import {Link} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Card} from '../components/ui/Card'
import ScreenWrapper from '../components/ui/ScreenWrapper'
import Title from '../components/ui/Title'
import {fontFamily} from '../tokens'

const styles = StyleSheet.create({
  cardsRow: {
    flexDirection: 'row',
  },
  link: {
    color: 'navy',
    fontFamily: fontFamily.regular,
    textDecorationLine: 'underline',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  screen: {
    padding: 20,
  },
})

const ProjectScreen = () => (
  <ScreenWrapper>
    <View style={styles.screen}>
      <View style={styles.titleRow}>
        <Title level={2}>Centrum</Title>
        <Link to="#" style={styles.link}>
          Ga naar overzicht
        </Link>
      </View>
      <View style={styles.cardsRow}>
        <Card />
      </View>
    </View>
  </ScreenWrapper>
)

export default ProjectScreen
