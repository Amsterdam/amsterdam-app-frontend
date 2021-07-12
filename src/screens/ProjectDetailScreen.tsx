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
  Gutter,
  IconButton,
  Inset,
  ScreenWrapper,
  Text,
  Title,
} from '../components/ui'
import {Project, projects} from '../data/projects'
import {color} from '../tokens'

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
        <Inset>
          <Title margin text={project.title} />
          <View style={styles.iconsRow}>
            <IconButton
              icon={<Info fill={color.tint.level1} />}
              label="Informatie"
              onPress={() =>
                navigation.navigate(routes.projectDetailInformation.name, {
                  id: project.id,
                })
              }
            />
            <Gutter width={15} />
            <IconButton
              icon={<Calendar fill={color.tint.level1} />}
              label="Tijdlijn"
              onPress={() =>
                navigation.navigate(routes.projectDetailTimeline.name, {
                  id: project.id,
                })
              }
            />
            {project.contact && (
              <>
                <Gutter width={15} />
                <IconButton
                  icon={<ChatBubble fill={color.tint.level1} />}
                  label="Contact"
                  onPress={() =>
                    navigation.navigate(routes.projectDetailContact.name, {
                      id: project.id,
                    })
                  }
                />
              </>
            )}
          </View>
          {project.news && <NewsItemsOverview newsArticles={project.news} />}
        </Inset>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  iconsRow: {
    flexDirection: 'row',
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  image: {
    height: 150,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
})
