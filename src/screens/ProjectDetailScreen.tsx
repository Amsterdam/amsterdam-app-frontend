import Calendar from '@amsterdam/asc-assets/static/icons/Calendar.svg'
import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import Info from '@amsterdam/asc-assets/static/icons/Info.svg'
import LocationFields from '@amsterdam/asc-assets/static/icons/LocationFields.svg'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect} from 'react'
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {NewsItemsOverview} from '../components/features/NewsItemsOverview'
import {
  Box,
  Gutter,
  IconButton,
  Image,
  ScreenWrapper,
  Title,
} from '../components/ui'
import {useFetch} from '../hooks/useFetch'
import {color, font, image, size} from '../tokens'
import {ProjectDetail} from '../types/project'

type ProjectDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetail'
>

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
  route: ProjectDetailScreenRouteProp
}

export const ProjectDetailScreen = ({navigation, route}: Props) => {
  const {data: project, isLoading} = useFetch<ProjectDetail>({
    url: 'http://localhost:8000/api/v1/project/details',
    options: {
      params: `?id=${route.params.id}`,
    },
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      title: project?.title,
    })
  }, [navigation, project])

  return (
    <ScreenWrapper>
      {isLoading ? (
        <Box>
          <ActivityIndicator />
        </Box>
      ) : (
        <ScrollView>
          {project?.images && project.images[0].sources.orig.url && (
            <Image
              source={{uri: project.images[0].sources.orig.url}}
              style={styles.image}
            />
          )}
          <Box background="lighter">
            <Title margin text={project?.title || ''} />
            <View style={styles.row}>
              {project?.body?.what.length && (
                <IconButton
                  icon={<Info fill={color.font.inverse} />}
                  label="Informatie"
                  onPress={() =>
                    navigation.navigate(routes.projectDetailBody.name, {
                      body: {
                        icon: (
                          <Info fill={color.font.primary} style={styles.icon} />
                        ),
                        projectTitle: project.title,
                        sections: project.body.what,
                        title: 'Informatie',
                      },
                    })
                  }
                />
              )}
              {project?.body?.when.length && (
                <IconButton
                  icon={<Calendar fill={color.font.inverse} />}
                  label="Tijdlijn"
                  onPress={() =>
                    navigation.navigate(routes.projectDetailBody.name, {
                      body: {
                        icon: (
                          <Calendar
                            fill={color.font.primary}
                            style={styles.icon}
                          />
                        ),
                        projectTitle: project.title,
                        sections: project.body.when,
                        title: 'Tijdlijn',
                      },
                    })
                  }
                />
              )}
              {project?.body?.work.length && (
                <IconButton
                  icon={<LocationFields fill={color.font.inverse} />}
                  label="Werkzaam-heden"
                  onPress={() =>
                    navigation.navigate(routes.projectDetailBody.name, {
                      body: {
                        icon: (
                          <LocationFields
                            fill={color.font.primary}
                            style={styles.icon}
                          />
                        ),
                        projectTitle: project.title,
                        sections: project.body.work,
                        title: 'Werkzaamheden',
                      },
                    })
                  }
                />
              )}
              {project?.body?.contact.length && (
                <IconButton
                  icon={<ChatBubble fill={color.font.inverse} />}
                  label="Contact"
                  onPress={() =>
                    navigation.navigate(routes.projectDetailBody.name, {
                      body: {
                        icon: (
                          <ChatBubble
                            fill={color.font.primary}
                            style={styles.icon}
                          />
                        ),
                        projectTitle: project.title,
                        sections: project.body.contact,
                        title: 'Contact',
                      },
                    })
                  }
                />
              )}
            </View>
          </Box>
          <Box background="light">
            <Title level={2} text="Nieuws" />
            <Gutter height={size.spacing.md} />
            <NewsItemsOverview />
          </Box>
        </ScrollView>
      )}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: font.height.h1,
    marginRight: size.spacing.md,
  },
  image: {
    aspectRatio: image.aspectRatio.wide,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
  },
})
