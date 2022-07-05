import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useLayoutEffect} from 'react'
import {useSelector} from 'react-redux'
import simplur from 'simplur'
import {Box, PleaseWait, SingleSelectable} from '@/components/ui'
import {Button, FollowButton} from '@/components/ui/buttons'
import {Column, Gutter, Row, ScrollView} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Paragraph, Text, Title} from '@/components/ui/text'
import {useRegisterDevice} from '@/hooks'
import {AddressQueryArg} from '@/modules/address'
import {selectAddress} from '@/modules/address/addressSlice'
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
import {requestPermission} from '@/processes'
import {useEnvironment} from '@/store'
import {accessibleText, mapImageSources} from '@/utils'

type Props = {
  id: string
}

export const Project = ({id}: Props) => {
  const environment = useEnvironment()
  const {primary: address} = useSelector(selectAddress)

  const navigation =
    useNavigation<
      StackNavigationProp<
        ConstructionWorkStackParams,
        ConstructionWorkRouteName.project
      >
    >()

  const addressParam: AddressQueryArg = {
    address: address?.centroid[1] ? undefined : address?.adres,
    lat: address?.centroid[1],
    lon: address?.centroid[0],
  }

  const {projectManager} = useProjectManagerFetcher()
  const {data: project, isLoading} = useGetProjectQuery({id, ...addressParam})
  const [followProject, {isLoading: isUpdatingFollow}] =
    useFollowProjectMutation()
  const [unfollowProject, {isLoading: isUpdatingUnfollow}] =
    useUnfollowProjectMutation()
  const {registerDevice} = useRegisterDevice()

  const onPressFollowButton = useCallback(
    (isFollowed: boolean) => {
      if (!project) {
        return
      }

      if (isFollowed) {
        unfollowProject({project_id: project.identifier})
      } else {
        followProject({project_id: project.identifier})
        requestPermission().then(registerDevice)
      }
    },
    [registerDevice, followProject, project, unfollowProject],
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

  const {images, followed, followers, meter, strides, subtitle, title} = project
  const followersLabel = simplur`${[followers]} volger[|s]`

  return (
    <ScrollView>
      {!!images.length && (
        <Image
          aspectRatio="wide"
          source={mapImageSources(images[0].sources, environment)}
        />
      )}
      <Column gutter="md">
        <Box>
          <Column gutter="md">
            <Row gutter="md">
              <FollowButton
                accessibilityLabel={
                  followed ? 'Ontvolg dit project' : 'Volg dit project'
                }
                disabled={isUpdatingFollow || isUpdatingUnfollow}
                followed={followed}
                onPress={onPressFollowButton}
              />
              <SingleSelectable
                label={accessibleText(followers.toString(), followersLabel)}>
                <Column>
                  <Text variant="bold">{followers}</Text>
                  <Text>{followersLabel}</Text>
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
              <Column gutter="md">
                <ProjectTraits {...{meter, strides}} />
                <Column gutter="sm">
                  {title && <Title text={title} />}
                  {subtitle && <Title level="h4" text={subtitle} />}
                </Column>
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
