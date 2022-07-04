import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useLayoutEffect} from 'react'
import {Box, PleaseWait, SingleSelectable} from '@/components/ui'
import {Button, FollowButton} from '@/components/ui/buttons'
import {Column, Gutter, Row, ScrollView} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Paragraph, Text, Title} from '@/components/ui/text'
import {useDeviceRegistration} from '@/hooks'
import {ArticleOverview} from '@/modules/construction-work/components/article'
import {ProjectBodyMenu} from '@/modules/construction-work/components/project'
import {useProjectManagerFetcher} from '@/modules/construction-work/components/project-manager'
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
  const {deviceRegistration} = useDeviceRegistration()

  const onFollowButtonPress = useCallback(
    async (isFollowed: boolean) => {
      if (!project) {
        return
      }
      if (isFollowed) {
        unfollowProject({project_id: project.identifier})
      } else {
        followProject({project_id: project.identifier})
        deviceRegistration()
      }
    },
    [deviceRegistration, followProject, project, unfollowProject],
  )

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
            <Row gutter="md">
              <FollowButton
                accessibilityLabel={
                  project.followed ? 'Ontvolg dit project' : 'Volg dit project'
                }
                disabled={isUpdatingFollow || isUpdatingUnfollow}
                followed={followed}
                onPress={onFollowButtonPress}
              />
              <SingleSelectable
                label={accessibleText(project.followers.toString(), 'volgers')}>
                <Column>
                  <Text variant="bold">{project.followers}</Text>
                  <Text>Volgers</Text>
                </Column>
              </SingleSelectable>
            </Row>
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
                {title && <Title text={title} />}
                {subtitle && <Title level="h4" text={subtitle} />}
              </Column>
            </SingleSelectable>
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
