import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect} from 'react'
import {Box, PleaseWait, SingleSelectable} from '@/components/ui'
import {Button, FollowButton} from '@/components/ui/buttons'
import {Column, Gutter, ScrollView} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {ArticleOverview} from '@/modules/construction-work/components/article'
import {ProjectBodyMenu} from '@/modules/construction-work/components/project'
import {useProjectManagerFetcher} from '@/modules/construction-work/components/project-manager'
import {ProjectTraits} from '@/modules/construction-work/components/shared'
import {
  useFollowProjectMutation,
  useGetProjectQuery,
  useUnfollowProjectMutation,
} from '@/modules/construction-work/construction-work.service'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {useEnvironment} from '@/store'
import {accessibleText, mapImageSources} from '@/utils'

type Props = {
  id: string
}

export const Project = ({id}: Props) => {
  const environment = useEnvironment()

  const navigation =
    useNavigation<
      StackNavigationProp<
        ConstructionWorkStackParams,
        ConstructionWorkRouteName.project
      >
    >()

  const {projectManager} = useProjectManagerFetcher()
  const {data: project, isLoading} = useGetProjectQuery({id})
  const [followProject, {isLoading: isUpdatingFollow}] =
    useFollowProjectMutation()
  const [unfollowProject, {isLoading: isUpdatingUnfollow}] =
    useUnfollowProjectMutation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: project?.title,
    })
  }, [project?.title, navigation])

  if (isLoading) {
    return <PleaseWait />
  }

  if (!project) {
    return <Paragraph>Geen project.</Paragraph>
  }

  const {images, followed, subtitle, title} = project

  return (
    <ScrollView>
      {!!images.length && (
        <Image
          aspectRatio="wide"
          source={mapImageSources(images[0].sources, environment)}
        />
      )}
      <Column gutter="md">
        <Box background="white">
          <Column gutter="md">
            {projectManager?.projects.includes(id) && (
              <Button
                onPress={() =>
                  navigation.navigate(
                    ConstructionWorkRouteName.createNotification,
                    {project: {id, title}},
                  )
                }
                text="Verstuur pushbericht"
                variant="inverse"
              />
            )}
            <SingleSelectable
              accessibilityRole="header"
              label={accessibleText(title, subtitle)}>
              <Column gutter="sm">
                <ProjectTraits {...{followed}} />
                {title && <Title text={title} />}
                {subtitle && <Title level="h4" text={subtitle} />}
              </Column>
            </SingleSelectable>
            <FollowButton
              accessibilityLabel={
                project.followed ? 'Ontvolg dit project' : 'Volg dit project'
              }
              disabled={isUpdatingFollow || isUpdatingUnfollow}
              following={project.followed}
              onPress={() => {
                project.followed
                  ? unfollowProject({project_id: project.identifier})
                  : followProject({project_id: project.identifier})
              }}
            />
          </Column>
          <Gutter height="lg" />
          <ProjectBodyMenu project={project} />
        </Box>
        <Box>
          <ArticleOverview projectIds={[id]} title="Nieuws" />
        </Box>
      </Column>
    </ScrollView>
  )
}
