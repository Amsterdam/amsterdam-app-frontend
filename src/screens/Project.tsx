import {Link} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import ProjectCard from '../components/features/ProjectCard'
import ScreenWrapper from '../components/ui/ScreenWrapper'
import Title from '../components/ui/Title'
import {fontFamily} from '../tokens'

const ProjectScreen = () => (
  <ScreenWrapper>
    <View style={styles.screen}>
      <View style={styles.titleRow}>
        <Title level={2} text="Centrum" />
        <Link to="#" style={styles.link}>
          Ga naar overzicht
        </Link>
      </View>
      <View style={styles.cardsRow}>
        <ProjectCard />
      </View>
    </View>
  </ScreenWrapper>
)

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
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  screen: {
    padding: 15,
  },
})

export default ProjectScreen
