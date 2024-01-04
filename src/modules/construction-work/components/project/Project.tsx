import {useCallback, useLayoutEffect} from 'react'
import {View} from 'react-native'
import simplur from 'simplur'
import {Tip} from '@/components/features/onboarding/types'
import {withOnboardingTip} from '@/components/features/onboarding/withOnboardingTip'
import {FollowButton} from '@/components/ui/buttons/FollowButton'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Image} from '@/components/ui/media/Image'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {Placement} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {getAddressParam} from '@/modules/address/utils/getAddressParam'
import {ArticleOverview} from '@/modules/construction-work/components/article/ArticleOverview'
import {ProjectSegmentMenu} from '@/modules/construction-work/components/project/ProjectSegmentMenu'
import {getAccessibleDistanceText} from '@/modules/construction-work/components/projects/utils/getAccessibleDistanceText'
import {ProjectTraits} from '@/modules/construction-work/components/shared/ProjectTraits'
import {useSelectedAddressForConstructionWork} from '@/modules/construction-work/hooks/useSelectedAddressForConstructionWork'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {
  useProjectFollowMutation,
  useProjectDetailsQuery,
  useProjectUnfollowMutation,
} from '@/modules/construction-work/service'
import {accessibleText} from '@/utils/accessibility/accessibleText'

const ONBOARDING_TIP =
  'Volg een project en blijf op de hoogte van onze werkzaamheden'

type Props = {
  id: number
}

export const Project = ({id}: Props) => {
  const {address} = useSelectedAddressForConstructionWork()

  const navigation = useNavigation<ConstructionWorkRouteName>()

  const addressParam = getAddressParam(address)

  const {
    data: project,
    isLoading,
    isFetching,
  } = useProjectDetailsQuery({id, ...addressParam})
  const [followProject, {isLoading: isUpdatingFollow}] =
    useProjectFollowMutation()
  const [unfollowProject, {isLoading: isUpdatingUnfollow}] =
    useProjectUnfollowMutation()
  const {registerDeviceWithPermission} = useRegisterDevice()
  const WithOnboardingTip = withOnboardingTip(View)

  const onPressFollowButton = useCallback(
    (isFollowed: boolean) => {
      if (isFollowed) {
        void unfollowProject({id})

        return
      }

      void followProject({id})
      registerDeviceWithPermission()
    },
    [followProject, id, registerDeviceWithPermission, unfollowProject],
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

  const {image, followed, followers, meter, strides, subtitle, title} = project
  const followersPhrase = simplur`${[followers]} volger[|s]`

  return (
    <Column>
      {image?.sources && (
        <Image
          aspectRatio="wide"
          source={image.sources}
          testID="ConstructionWorkProjectImage"
        />
      )}
      <HorizontalSafeArea>
        <Box>
          <Column gutter="lg">
            <Row
              gutter="md"
              valign="center"
              zIndex={1}>
              <WithOnboardingTip
                extraSpace="md"
                placement={Placement.below}
                testID="ConstructionWorkProjectFollowButtonTooltip"
                text={ONBOARDING_TIP}
                tipSlug={Tip.constructionWorkProjectFollowButton}>
                <FollowButton
                  accessibilityHint={ONBOARDING_TIP}
                  accessibilityLabel={
                    followed ? 'Ontvolg dit project' : 'Volg dit project'
                  }
                  disabled={
                    isUpdatingFollow || isUpdatingUnfollow || isFetching
                  }
                  followed={followed}
                  onPress={onPressFollowButton}
                  testID="ConstructionWorkProjectFollowButton"
                />
              </WithOnboardingTip>
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
                byDistance={!!address}
                project={project}
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
            <ProjectSegmentMenu project={project} />
            <ArticleOverview
              projectId={id}
              title="Nieuws"
            />
          </Column>
        </Box>
      </HorizontalSafeArea>
    </Column>
  )
}
