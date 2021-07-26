import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {ProjectCard} from '../components/features'
import {Gutter, Link, ScreenWrapper, Title} from '../components/ui'
import {boroughs, projects} from '../data/projects'
import {size} from '../tokens'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
}

const DATA = boroughs.map(borough => {
  return {
    id: borough.id,
    title: borough.name,
    data: projects.filter(project => project.boroughId === borough.id),
  }
})

export const ProjectOverviewScreen = ({navigation}: Props) => {
  return (
    <ScreenWrapper>
      <FlatList
        data={DATA}
        keyExtractor={(item, index) => `${item}${index}`}
        ItemSeparatorComponent={item =>
          item.leadingItem.data.length > 0 ? (
            <Gutter height={size.spacing.lg} />
          ) : null
        }
        renderItem={({item}) => {
          return item.data.length > 0 ? (
            <React.Fragment key={item.id}>
              <View style={styles.titleRow}>
                <Title level={2} text={item.title} />
                <Link
                  onPress={() =>
                    navigation.navigate(routes.projectOverviewByBorough.name, {
                      boroughId: item.id,
                    })
                  }
                  text="Ga naar overzicht"
                />
              </View>

              <FlatList
                data={item.data}
                horizontal
                ItemSeparatorComponent={() => (
                  <Gutter width={size.spacing.sm} />
                )}
                keyExtractor={item => item.id + item.title}
                renderItem={({item, index}) => (
                  <View
                    style={[
                      styles.project,
                      index === 0 && styles.firstProject,
                    ]}>
                    <ProjectCard
                      imageSource={item.imageSource}
                      onPress={() =>
                        navigation.navigate('ProjectDetail', {id: item.id})
                      }
                      title={item.title}
                      width={280}
                    />
                  </View>
                )}
              />
            </React.Fragment>
          ) : null
        }}
      />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  titleRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: size.spacing.sm,
  },
  firstProject: {
    marginLeft: size.spacing.md,
  },
  project: {
    backgroundColor: 'white',
  },
})
