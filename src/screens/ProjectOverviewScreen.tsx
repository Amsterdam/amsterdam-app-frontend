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
        {boroughs.map((borough, index) => {
          const projectsByBorough = projects.filter(
            project => project.boroughId === borough.id,
          )
          return projectsByBorough.length ? (
            <React.Fragment key={borough.id}>
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
                    imageSource={item.imageSource}
                    onPress={() =>
                      navigation.navigate('ProjectDetail', {id: item.id})
                    }
                    title={item.title}
                    width={280}
                  />
                )}
              />
              {index < boroughs.length - 1 && <Gutter height={30} />}
            </React.Fragment>
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
    marginBottom: 10,
  },
})
