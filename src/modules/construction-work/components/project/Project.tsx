import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useLayoutEffect} from 'react'
import {useSelector} from 'react-redux'
import simplur from 'simplur'
import {Box, PleaseWait, SingleSelectable} from '@/components/ui'
import {Button, FollowButton} from '@/components/ui/buttons'
import {Column, Gutter, Row} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Paragraph, Phrase, Title} from '@/components/ui/text'
import {useRegisterDevice, useSentry} from '@/hooks'
import {AddressQueryArg} from '@/modules/address'
import {selectAddress} from '@/modules/address/addressSlice'
import {useProjectManager} from '@/modules/construction-work-editor/hooks'
import {ArticleOverview} from '@/modules/construction-work/components/article'
import {ProjectBodyMenu} from '@/modules/construction-work/components/project'
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
import {requestPushNotificationsPermission} from '@/processes'
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

  const {projectManager} = useProjectManager()
  const {data: project, isLoading} = useGetProjectQuery({id, ...addressParam})
  const [followProject, {isLoading: isUpdatingFollow}] =
    useFollowProjectMutation()
  const [unfollowProject, {isLoading: isUpdatingUnfollow}] =
    useUnfollowProjectMutation()
  const {registerDevice} = useRegisterDevice()
  const {sendSentryErrorLog} = useSentry()

  const onPressFollowButton = useCallback(
    (isFollowed: boolean) => {
      if (!project) {
        return
      }
      if (isFollowed) {
        unfollowProject({project_id: project.identifier})
      } else {
        followProject({project_id: project.identifier})
        requestPushNotificationsPermission()
          .then(registerDevice)
          .catch((error: unknown) => {
            sendSentryErrorLog(
              'Register device for push notifications failed',
              'Project.tsx',
              {error},
            )
          })
      }
    },
    [
      followProject,
      project,
      registerDevice,
      sendSentryErrorLog,
      unfollowProject,
    ],
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
    <>
      {!!images.length && (
        <Image
          aspectRatio="wide"
          source={mapImageSources(images[0].sources, environment)}
        />
      )}
      <Column gutter="md">
        <Box>
          <Column gutter="lg">
            <Row gutter="md" valign="center">
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
                  <Phrase variant="small" fontWeight="bold">
                    {followers}
                  </Phrase>
                  <Phrase variant="small">{followersLabel}</Phrase>
                </Column>
              </SingleSelectable>
            </Row>
            {projectManager?.projects.includes(id) && (
              <Button
                label="Verstuur pushbericht"
                onPress={() =>
                  navigation.navigate(
                    ConstructionWorkRouteName.createNotification,
                    {project: {id, title}},
                  )
                }
                variant="secondary"
              />
            )}
            <Column gutter="md">
              <ProjectTraits
                accessibilityLabel={accessibleText(
                  [
                    meter && `${meter} meter`,
                    meter && strides && 'of',
                    strides && `${strides} stappen`,
                    'vanaf uw adres',
                  ].join(' '),
                )}
                {...{meter, strides}}
              />
              <SingleSelectable
                accessibilityRole="header"
                label={accessibleText(title, subtitle)}>
                <Column gutter="sm">
                  {title && <Title text={title} />}
                  {subtitle && <Title level="h4" text={subtitle} />}
                </Column>
              </SingleSelectable>
            </Column>
          </Column>
          <Gutter height="lg" />
          <ProjectBodyMenu project={project} />
        </Box>
        <Box>
          <ArticleOverview projectIds={[id]} title="Nieuws" />
        </Box>
      </Column>
    </>
  )
}
