import {useCallback, useLayoutEffect, useState} from 'react'
import {LayoutRectangle} from 'react-native'
import simplur from 'simplur'
import {OnboardingTipWrapper} from '@/components/features/onboarding/OnboardingTipWrapper'
import {Tip} from '@/components/features/onboarding/types'
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
import {useAddress} from '@/modules/address/hooks/useAddress'
import {getAddressParam} from '@/modules/address/utils/getAddressParam'
import {ArticleOverview} from '@/modules/construction-work/components/article/ArticleOverview'
import {ProjectBodyMenu} from '@/modules/construction-work/components/project/ProjectBodyMenu'
import {getAccessibleDistanceText} from '@/modules/construction-work/components/projects/utils/getAccessibleDistanceText'
import {ProjectTraits} from '@/modules/construction-work/components/shared/ProjectTraits'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {
  useProjectsFollowPostMutation,
  useProjectDetailsQuery,
  useProjectsFollowDeleteMutation,
} from '@/modules/construction-work/service'
import {accessibleText} from '@/utils/accessibility/accessibleText'

const ONBOARDING_TIP =
  'Volg een project en blijf op de hoogte van onze werkzaamheden'

type Props = {
  id: number
}

export const Project = ({id}: Props) => {
  const address = useAddress()

  const navigation = useNavigation<ConstructionWorkRouteName>()

  const addressParam = getAddressParam(address)

  const {
    data: project,
    isLoading,
    isFetching,
  } = useProjectDetailsQuery({id, ...addressParam})
  const [followProject, {isLoading: isUpdatingFollow}] =
    useProjectsFollowPostMutation()
  const [unfollowProject, {isLoading: isUpdatingUnfollow}] =
    useProjectsFollowDeleteMutation()
  const {registerDeviceWithPermission} = useRegisterDevice()
  const [onboardingTipTargetLayout, setTipComponentLayout] =
    useState<LayoutRectangle>()

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
              <OnboardingTipWrapper
                extraSpace="md"
                onboardingTipTargetLayout={onboardingTipTargetLayout}
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
                  onLayout={e => setTipComponentLayout(e.nativeEvent.layout)}
                  onPress={onPressFollowButton}
                  testID="ConstructionWorkProjectFollowButton"
                />
              </OnboardingTipWrapper>
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
                meter={meter}
                strides={strides}
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
              projectId={id}
              title="Nieuws"
            />
          </Column>
        </Box>
      </HorizontalSafeArea>
    </Column>
  )
}
