import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {ProjectCard} from '../components/features'
import {ScreenWrapper, Title} from '../components/ui'
import {projects} from '../data/projects'

export const ProjectOverviewScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.screen}>
        <View style={styles.titleRow}>
          <Title level={2} text="Centrum" />
        </View>
        <FlatList
          data={projects}
          horizontal
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ProjectCard
              imageSource={item.imageSource}
              text={item.text}
              title={item.title}
            />
          )}
        />
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  titleRow: {
    marginBottom: 15,
  },
  screen: {
    padding: 15,
  },
})
