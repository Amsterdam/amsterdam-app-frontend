import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useLayoutEffect} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {menuRoutes, MenuStackParams} from '../app/navigation'
import {ArticleOverview} from '../components/features/article'
import {ProjectBodyMenu} from '../components/features/project'
import {
  Box,
  Button,
  Image,
  NonScalingHeaderTitle,
  PleaseWait,
  SingleSelectable,
  Text,
  Title,
} from '../components/ui'
import {Switch} from '../components/ui/forms'
import {Column, Gutter} from '../components/ui/layout'
import {getEnvironment} from '../environment'
import {useFetch} from '../hooks'
import {SettingsContext} from '../providers/settings.provider'
import {image} from '../tokens'
import {ProjectDetail} from '../types'
import {accessibleText} from '../utils'

type ProjectDetailScreenRouteProp = RouteProp<MenuStackParams, 'ProjectDetail'>

type Props = {
  navigation: StackNavigationProp<MenuStackParams, 'ProjectDetail'>
  route: ProjectDetailScreenRouteProp
}

export const ProjectDetailScreen = ({navigation, route}: Props) => {
  const {changeSettings, settings} = useContext(SettingsContext)
  const projectManager = settings && settings['project-manager']

  const {data: project, isLoading} = useFetch<ProjectDetail>({
    url: getEnvironment().apiUrl + '/project/details',
    options: {
      params: {
        id: route.params.id,
      },
    },
  })

  const isSubscribed =
    settings?.notifications?.projects?.[project?.identifier ?? ''] ?? false

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <NonScalingHeaderTitle text={project?.title ?? ''} />,
    })
  }, [project?.title, navigation])

  const toggleProjectSubscription = (projectId: string) => {
    changeSettings('notifications', {
      projectsEnabled: true,
      projects: {
        ...settings?.notifications?.projects,
        [projectId]: !isSubscribed,
      },
    })
  }

  return isLoading && !project ? (
    <PleaseWait />
  ) : project ? (
    <ScrollView>
      {project.images && project.images[0].sources.orig.url && (
        <Image
          source={{uri: project.images[0].sources.orig.url}}
          style={styles.image}
        />
      )}
      <Column gutter="md">
        <Box background="white">
          <Column gutter="md">
            {projectManager?.projects.includes(project.identifier) && (
              <Button
                onPress={() =>
                  navigation.navigate(menuRoutes.notification.name, {
                    projectDetails: {
                      articles: project.articles,
                      id: project.identifier,
                      title: project.title,
                    },
                  })
                }
                text="Verstuur pushbericht"
                variant="inverse"
              />
            )}
            <SingleSelectable
              accessibilityRole="header"
              label={accessibleText(project.title, project.subtitle)}>
              {project.title && <Title text={project.title} />}
              {project.subtitle && <Text intro>{project.subtitle}</Text>}
            </SingleSelectable>
            <Switch
              accessibilityLabel="Ontvang berichten"
              label={<Text>Ontvang berichten</Text>}
              labelPosition="end"
              onValueChange={() =>
                toggleProjectSubscription(project.identifier)
              }
              value={isSubscribed}
            />
          </Column>
          <Gutter height="lg" />
          <ProjectBodyMenu project={project} />
        </Box>
        {project.articles.length ? (
          <Box>
            <ArticleOverview articles={project.articles} />
          </Box>
        ) : null}
      </Column>
    </ScrollView>
  ) : null
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: image.aspectRatio.wide,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
})
