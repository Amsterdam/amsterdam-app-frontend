import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useCallback, useLayoutEffect} from 'react'
import {useSelector} from 'react-redux'
import simplur from 'simplur'
import {FollowButton} from '@/components/ui/buttons'
import {
  Box,
  HorizontalSafeArea,
  SingleSelectable,
} from '@/components/ui/containers'
import {PleaseWait} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Image} from '@/components/ui/media'
import {Paragraph, Phrase, Title} from '@/components/ui/text'
import {useRegisterDevice} from '@/hooks'
import {selectAddress} from '@/modules/address/slice'
import {ArticleOverview} from '@/modules/construction-work/components/article'
import {ProjectBodyMenu} from '@/modules/construction-work/components/project'
import {getAccessibleDistanceText} from '@/modules/construction-work/components/projects'
import {ProjectTraits} from '@/modules/construction-work/components/shared'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {
  useFollowProjectMutation,
  useGetProjectQuery,
  useUnfollowProjectMutation,
} from '@/modules/construction-work/service'
import {accessibleText, mapImageSources} from '@/utils'

type Props = {
  id: string
}

export const Project = ({id}: Props) => {
  const address = useSelector(selectAddress)

  const navigation =
    useNavigation<
      StackNavigationProp<
        ConstructionWorkStackParams,
        ConstructionWorkRouteName.project
      >
    >()

  // TODO: remove centroid once standardization of address data is done
  const getAddressParam = () => {
    if (address?.coordinates) {
      return {
        address: address.coordinates?.lon ? undefined : address?.adres,
        ...address.coordinates,
      }
    }
    if (address?.centroid) {
      return {
        address: address?.centroid?.[1] ? undefined : address?.adres,
        lat: address?.centroid?.[1],
        lon: address?.centroid?.[0],
      }
    }
  }

  const addressParam = getAddressParam()

  const {data: project, isLoading} = useGetProjectQuery({id, ...addressParam})
  const [followProject, {isLoading: isUpdatingFollow}] =
    useFollowProjectMutation()
  const [unfollowProject, {isLoading: isUpdatingUnfollow}] =
    useUnfollowProjectMutation()
  const {registerDeviceWithPermission} = useRegisterDevice()

  const onPressFollowButton = useCallback(
    (isFollowed: boolean) => {
      if (!project) {
        return
      }
      if (isFollowed) {
        void unfollowProject({project_id: project.identifier})
      } else {
        void followProject({project_id: project.identifier})
        registerDeviceWithPermission()
      }
    },
    [followProject, project, registerDeviceWithPermission, unfollowProject],
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
  const followersPhrase = simplur`${[followers]} volger[|s]`

  return (
    <Column>
      {!!images?.length && (
        <Image
          aspectRatio="wide"
          source={mapImageSources(images[0].sources)}
          testID="ConstructionWorkProjectImage"
        />
      )}
      <HorizontalSafeArea>
        <Box>
          <Column gutter="lg">
            <Row
              gutter="md"
              valign="center">
              <FollowButton
                accessibilityLabel={
                  followed ? 'Ontvolg dit project' : 'Volg dit project'
                }
                disabled={isUpdatingFollow || isUpdatingUnfollow}
                followed={followed}
                onPress={onPressFollowButton}
                testID="ConstructionWorkProjectFollowButton"
              />
              <SingleSelectable
                accessibilityLabel={accessibleText(
                  followers.toString(),
                  followersPhrase,
                )}>
                <Column>
                  <Phrase
                    emphasis="strong"
                    testID="ConstructionWorkProjectFollowersNumber"
                    variant="small">
                    {followers}
                  </Phrase>
                  <Phrase
                    testID="ConstructionWorkProjectFollowersText"
                    variant="small">
                    {followersPhrase}
                  </Phrase>
                </Column>
              </SingleSelectable>
            </Row>
            <Column gutter="md">
              <ProjectTraits
                accessibilityLabel={accessibleText(
                  getAccessibleDistanceText(meter, strides),
                )}
                {...{meter, strides}}
              />
              <SingleSelectable
                accessibilityLabel={accessibleText(title, subtitle)}
                accessibilityRole="header">
                {!!title && (
                  <Title
                    testID="ConstructionWorkProjectTitle"
                    text={title}
                  />
                )}
                {!!subtitle && (
                  <Title
                    level="h4"
                    testID="ConstructionWorkProjectSubtitle"
                    text={subtitle}
                  />
                )}
              </SingleSelectable>
            </Column>
            <ProjectBodyMenu project={project} />
            <ArticleOverview
              projectIds={[id]}
              title="Nieuws"
            />
          </Column>
        </Box>
      </HorizontalSafeArea>
    </Column>
  )
}
