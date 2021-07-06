import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {ProjectCard} from '../components/features'
import {Gutter, Inset, ScreenWrapper, Title} from '../components/ui'
import {Borough, boroughs, projects} from '../data/projects'

type ProjectOverviewByBoroughScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectOverviewByBorough'
>

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
  route: ProjectOverviewByBoroughScreenRouteProp
}

export const ProjectOverviewByBoroughScreen = ({route, navigation}: Props) => {
  const {boroughId} = route.params
  const borough: Borough | undefined = boroughs.find(b => b.id === boroughId)
  const projectsByBorough = projects.filter(p => p.boroughId === boroughId)

  return borough && projectsByBorough ? (
    <ScreenWrapper>
      <Inset>
        <View style={styles.titleRow}>
          <Title level={2} prose text={borough.name} />
        </View>
        <FlatList
          data={projectsByBorough}
          ItemSeparatorComponent={() => <Gutter height={10} />}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ProjectCard
              imageSource={item.imageSource}
              title={item.title}
              onPress={() =>
                navigation.navigate('ProjectDetail', {id: item.id})
              }
            />
          )}
        />
      </Inset>
    </ScreenWrapper>
  ) : null
}

const styles = StyleSheet.create({
  titleRow: {
    marginBottom: 15,
  },
})
