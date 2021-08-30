import Calendar from '@amsterdam/asc-assets/static/icons/Calendar.svg'
import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import Info from '@amsterdam/asc-assets/static/icons/Info.svg'
import LocationFields from '@amsterdam/asc-assets/static/icons/LocationFields.svg'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect} from 'react'
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {NewsItemsOverview} from '../components/features'
import {Box, Gutter, IconButton, Image, Title} from '../components/ui'
import {getEnvironment} from '../environment'
import {useFetch} from '../hooks/useFetch'
import {color, image, size} from '../tokens'
import {Section, Timeline} from '../types'
import {ProjectDetail} from '../types/project'
import {clipText} from '../utils'

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
    url: getEnvironment().apiUrl + '/project/details',
    options: {
      params: {
        id: route.params.id,
      },
    },
  })

  const headerTitle = clipText(project?.title, [':', ','])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: headerTitle,
    })
  }, [headerTitle, navigation])

  const menu: {
    icon: any
    sections?: Section[]
    timeline?: Timeline
    title: string
  }[] = [
    {
      icon: <Info fill={color.font.inverse} />,
      sections: [
        ...(project?.body.intro ?? []),
        ...(project?.body.what ?? []),
        ...(project?.body.where ?? []),
      ],
      title: 'Informatie',
    },
    {
      icon: <Calendar fill={color.font.inverse} />,
      sections: project?.body.when ?? [],
      timeline: project?.body.timeline,
      title: 'Tijdlijn',
    },
    {
      icon: <LocationFields fill={color.font.inverse} />,
      sections: project?.body.work,
      title: 'Werkzaamheden',
    },
    {
      icon: <ChatBubble fill={color.font.inverse} />,
      sections: project?.body.contact,
      title: 'Contact',
    },
  ]

  return isLoading && !project ? (
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
          {menu?.map(({icon, sections, timeline, title}) =>
            sections?.length || timeline ? (
              <IconButton
                icon={icon}
                key={title}
                label={title.replace('Werkzaamheden', 'Werkzaam-heden')}
                onPress={() =>
                  navigation.navigate(routes.projectDetailBody.name, {
                    body: {
                      headerTitle,
                      sections: sections ?? [],
                      title: title,
                      timeline: timeline,
                    },
                  })
                }
              />
            ) : null,
          )}
        </View>
      </Box>
      <Box background="light">
        <Title level={2} text="Nieuws" />
        <Gutter height={size.spacing.md} />
        <NewsItemsOverview />
      </Box>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: image.aspectRatio.wide,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
  },
})
