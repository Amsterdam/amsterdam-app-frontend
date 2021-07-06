import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {ProjectCard} from '../components/features'
import {Gutter, Inset, Link, ScreenWrapper, Title} from '../components/ui'
import {boroughs, projects} from '../data/projects'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
}

export const ProjectOverviewScreen = ({navigation}: Props) => {
  return (
    <ScreenWrapper>
      <Inset>
        {boroughs.map(borough => {
          const projectsByBorough = projects.filter(
            project => project.boroughId === borough.id,
          )
          return projectsByBorough.length ? (
            <>
              <View style={styles.titleRow}>
                <Title level={2} text={borough.name} />
                <Link
                  onPress={() =>
                    navigation.navigate(routes.projectOverviewByBorough.name, {
                      boroughId: borough.id,
                    })
                  }
                  text="Ga naar overzicht"
                />
              </View>
              <FlatList
                data={projectsByBorough}
                horizontal
                ItemSeparatorComponent={() => <Gutter width={10} />}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <ProjectCard
                    id={item.id}
                    imageSource={item.imageSource}
                    navigation={navigation}
                    title={item.title}
                    width={300}
                  />
                )}
              />
            </>
          ) : null
        })}
      </Inset>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  titleRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
})
