import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {ProjectCard} from '../components/features'
import {Box, Button, Gutter, Text, Title} from '../components/ui'
import {districts} from '../data/districts'
import {getEnvironment} from '../environment'
import {useFetch} from '../hooks'
import {size} from '../tokens'
import {ProjectOverviewItem} from '../types'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
}

export const ProjectOverviewScreen = ({navigation}: Props) => {
  const {
    data: projects,
    hasError,
    isLoading,
  } = useFetch<ProjectOverviewItem[]>({
    url: getEnvironment().apiUrl + '/projects',
  })

  const projectsByDistrict = districts.map(district => ({
    id: district.id,
    title: district.name,
    data: projects?.filter(project => project.district_id === district.id),
  }))

  if (hasError) {
    return (
      <Box>
        <Box background="invalid">
          <Title inverse text="Er ging iets mis" />
          <Text inverse>Heb je de backend aangezet…?</Text>
        </Box>
      </Box>
    )
  }

  return (
    <>
      {isLoading ? (
        <Box>
          <ActivityIndicator />
        </Box>
      ) : (
        <FlatList
          data={projectsByDistrict}
          keyExtractor={(item, index) => `${item}${index}`}
          ItemSeparatorComponent={item =>
            item.leadingItem.data && item.leadingItem.data.length > 0 ? (
              <Gutter height={size.spacing.md} />
            ) : null
          }
          renderItem={({item: districtItem}) => {
            return districtItem.data && districtItem.data.length > 0 ? (
              <React.Fragment key={districtItem.id}>
                <View style={styles.titleRow}>
                  <Title level={2} text={districtItem.title} />
                  <Button
                    onPress={() =>
                      navigation.navigate(
                        routes.projectOverviewByDistrict.name,
                        {
                          id: districtItem.id,
                        },
                      )
                    }
                    variant="text"
                    text="Ga naar overzicht"
                  />
                </View>
                <FlatList
                  data={districtItem.data}
                  horizontal
                  ItemSeparatorComponent={() => (
                    <Gutter width={size.spacing.sm} />
                  )}
                  keyExtractor={item => item.identifier}
                  renderItem={({item: projectItem}) => (
                    <ProjectCard
                      onPress={() =>
                        navigation.navigate(routes.projectDetail.name, {
                          id: projectItem.identifier,
                        })
                      }
                      imageSource={{
                        uri: projectItem.images[0].sources['460px'].url,
                      }}
                      subtitle={projectItem.subtitle}
                      title={projectItem.title}
                      width={280}
                    />
                  )}
                  style={styles.projects}
                />
              </React.Fragment>
            ) : null
          }}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  titleRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: size.spacing.md,
    marginTop: size.spacing.md,
  },
  projects: {
    paddingLeft: size.spacing.md,
  },
})
