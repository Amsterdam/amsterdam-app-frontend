import {useCallback, useRef, useState} from 'react'
import {Platform} from 'react-native'
import type SwiperFlatList from 'react-native-swiper-flatlist'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Carousel} from '@/modules/onboarding/components/Carousel'
import {onboardingData} from '@/modules/onboarding/data/onboarding'
import {OnboardingRouteName} from '@/modules/onboarding/routes'
import {setHasSeenOnboarding} from '@/modules/onboarding/slice'
import {ModuleSlug} from '@/modules/slugs'

const navigationResetParam = {index: 0, routes: [{name: ModuleSlug.home}]}

type Props = NavigationProps<OnboardingRouteName.onboarding>

export const OnboardingScreen = ({navigation}: Props) => {
  const carouselRef = useRef<SwiperFlatList>(null)
  const {isPortrait} = useDeviceContext()
  const [slideIndex, setSlideIndex] = useState<number>(0)

  const dispatch = useDispatch()

  const isLastSlide = slideIndex + 1 === onboardingData.length

  const handleOnboarding = useCallback(() => {
    dispatch(setHasSeenOnboarding(true))
    navigation.reset(navigationResetParam)
  }, [dispatch, navigation])

  const onPress = useCallback(() => {
    slideIndex + 1 !== onboardingData.length
      ? carouselRef.current?.scrollToIndex({
          index: slideIndex + 1,
        })
      : handleOnboarding()
  }, [handleOnboarding, slideIndex])

  const insetHorizontal = isPortrait ? 'md' : 'xl'

  return (
    <Screen
      scroll={false}
      stickyFooter={
        <Box
          insetHorizontal={insetHorizontal}
          insetVertical="sm">
          <Button
            label={isLastSlide ? 'Aan de slag' : 'Volgende'}
            onPress={onPress}
            testID="OnboardingNextSlideButton"
          />
        </Box>
      }
      stickyHeader={
        <Box
          insetHorizontal={insetHorizontal}
          insetTop="md">
          <Row align="end">
            <IconButton
              accessibilityHint="Sluit onboarding"
              icon={
                <Icon
                  color="link"
                  name="close"
                  size="ml"
                  testID="OnboardingCloseIcon"
                />
              }
              onPress={handleOnboarding}
              testID="OnboardingCloseButton"
            />
          </Row>
        </Box>
      }
      testID="OnboardingScreen"
      withLeftInset={Platform.OS === 'android'}
      withRightInset={Platform.OS === 'android'}
      withTopInset>
      <Carousel
        items={onboardingData}
        onChangeIndex={setSlideIndex}
        ref={carouselRef}
        slideIndex={slideIndex}
      />
    </Screen>
  )
}
