import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {ProjectCard} from '../components/features'
import {Gutter, ScreenWrapper, Title} from '../components/ui'
import {projects} from '../data/projects'

export const ProjectOverviewByBoroughScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.screen}>
        <View style={styles.titleRow}>
          <Title level={2} text="Centrum" />
        </View>
        <FlatList
          data={projects}
          ItemSeparatorComponent={() => <Gutter height={10} />}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ProjectCard imageSource={item.imageSource} title={item.title} />
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
