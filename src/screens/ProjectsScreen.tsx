import React from 'react'
import {StyleSheet, View} from 'react-native'
import {ProjectCard} from '../components/features'
import {ScreenWrapper, Title} from '../components/ui'

export const ProjectsScreen = () => (
  <ScreenWrapper>
    <View style={styles.screen}>
      <View style={styles.titleRow}>
        <Title level={2} text="Centrum" />
      </View>
      <View style={styles.cardsRow}>
        <ProjectCard
          imageSource={{
            uri: 'https://www.amsterdam.nl/publish/pages/961922/stp_marnixstraat_940.jpg',
          }}
          text="Herinrichting kruispunt"
          title="Marnixstraat-Rozengracht"
        />
        <ProjectCard
          imageSource={{
            uri: 'https://www.amsterdam.nl/publish/pages/966195/940x415_a_programma_brug.jpg',
          }}
          text="Vernieuwing 9 bruggen en 5 straten"
          title="Oranje Loper"
        />
      </View>
    </View>
  </ScreenWrapper>
)

const styles = StyleSheet.create({
  cardsRow: {
    flexDirection: 'row',
  },
  titleRow: {
    marginBottom: 15,
  },
  screen: {
    padding: 15,
  },
})
