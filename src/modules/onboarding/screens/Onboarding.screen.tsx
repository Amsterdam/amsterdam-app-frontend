import {useCallback, useRef, useState} from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'
import {Button} from '@/components/ui/buttons/Button'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Screen} from '@/components/ui/layout/Screen'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Carousel} from '@/modules/onboarding/components/Carousel'
import {onboardingData} from '@/modules/onboarding/data/onboarding'
import {setHasSeenOnboarding} from '@/modules/onboarding/slice'
import {ModuleSlug} from '@/modules/slugs'

export const OnboardingScreen = () => {
  const carouselRef = useRef<SwiperFlatList>(null)
  const navigation = useNavigation<ModuleSlug>()
  const {isPortrait} = useDeviceContext()
  const [slideIndex, setSlideIndex] = useState<number>(0)

  const dispatch = useDispatch()

  const isLastSlide = slideIndex + 1 === onboardingData.length

  const handleOnboarding = useCallback(() => {
    dispatch(setHasSeenOnboarding(true))
    navigation.navigate(ModuleSlug.home)
  }, [dispatch, navigation])

  const onPress = useCallback(() => {
    slideIndex + 1 !== onboardingData.length
      ? carouselRef.current?.scrollToIndex({
          index: slideIndex + 1,
        })
      : handleOnboarding()
  }, [handleOnboarding, slideIndex])

  return (
    <Screen
      scroll={false}
      stickyFooter={
        <Box
          inset="no"
          insetHorizontal={isPortrait ? 'lg' : 'xl'}
          insetTop="sm">
          <Button
            label={isLastSlide ? 'Aan de slag' : 'Volgende'}
            onPress={onPress}
          />
        </Box>
      }
      stickyHeader={
        <Box
          inset="no"
          insetHorizontal="lg"
          insetTop="md">
          <Row align="end">
            <IconButton
              accessibilityHint="Sluit onboarding"
              icon={
                <Icon
                  color="link"
                  name="close"
                  size="ml"
                />
              }
              onPress={handleOnboarding}
            />
          </Row>
        </Box>
      }
      withLeftInset={false}
      withRightInset={false}
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
