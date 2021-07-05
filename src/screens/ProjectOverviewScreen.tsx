import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {ProjectCard} from '../components/features'
import {Button, Gutter, ScreenWrapper, Title} from '../components/ui'
import {projects} from '../data/projects'
import {fontFamily} from '../tokens'

type ProjectOverviewScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

export const ProjectOverviewScreen = ({
  navigation,
}: ProjectOverviewScreenProps) => {
  return (
    <ScreenWrapper>
      <View style={styles.screen}>
        <View style={styles.titleRow}>
          <Title level={2} text="Centrum" />
          <Button
            onPress={() =>
              navigation.navigate(routes.projectOverviewByBorough.name)
            }
            text="Ga naar overzicht"
          />
        </View>
        <FlatList
          data={projects}
          horizontal
          ItemSeparatorComponent={() => <Gutter width={10} />}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ProjectCard
              imageSource={item.imageSource}
              title={item.title}
              width={300}
            />
          )}
        />
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  link: {
    color: 'navy',
    fontFamily: fontFamily.regular,
    fontSize: 16,
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
