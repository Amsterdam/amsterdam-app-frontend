import Calendar from '@amsterdam/asc-assets/static/icons/Calendar.svg'
import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import Info from '@amsterdam/asc-assets/static/icons/Info.svg'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Image, ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {NewsItemsOverview} from '../components/features/NewsItemsOverview'
import {
  Box,
  Gutter,
  IconButton,
  ScreenWrapper,
  Text,
  Title,
} from '../components/ui'
import {Project, projects} from '../data/projects'
import {color, image, size} from '../tokens'

type ProjectDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetail'
>

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
  route: ProjectDetailScreenRouteProp
}

export const ProjectDetailScreen = ({navigation, route}: Props) => {
  const project: Project | undefined = projects.find(
    p => p.id === route.params.id,
  )

  if (!project) {
    return <Text>`Project ${route.params.id} niet gevonden.`</Text>
  }

  return (
    <ScreenWrapper>
      <ScrollView>
        <Image source={project.imageSource} style={styles.image} />
        <Box background="lighter">
          <Title margin text={project.title} />
          <View style={styles.row}>
            <IconButton
              icon={<Info fill={color.font.inverse} />}
              label="Informatie"
              onPress={() =>
                navigation.navigate(routes.projectDetailInformation.name, {
                  id: project.id,
                })
              }
            />
            <IconButton
              icon={<Calendar fill={color.font.inverse} />}
              label="Tijdlijn"
              onPress={() =>
                navigation.navigate(routes.projectDetailTimeline.name, {
                  id: project.id,
                })
              }
            />
            {project.contact && (
              <IconButton
                icon={<ChatBubble fill={color.font.inverse} />}
                label="Contact"
                onPress={() =>
                  navigation.navigate(routes.projectDetailContact.name, {
                    id: project.id,
                  })
                }
              />
            )}
          </View>
        </Box>
        {project.news && (
          <Box background="light">
            <Title level={2} text="Nieuws" />
            <Gutter height={size.spacing.md} />
            <NewsItemsOverview newsArticles={project.news} />
          </Box>
        )}
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: image.aspectRatio.wide,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
  insetWhite: {
    backgroundColor: 'white',
    marginHorizontal: -size.spacing.md,
    marginTop: -size.spacing.md,
    paddingHorizontal: size.spacing.md,
    paddingTop: size.spacing.md,
  },
  row: {
    flexDirection: 'row',
  },
})
