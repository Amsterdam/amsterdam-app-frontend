import {useRef} from 'react'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import {Button} from '@/components/ui/buttons/Button'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Screen} from '@/components/ui/layout/Screen'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {Carousel} from '@/modules/onboarding/components/Carousel'
import {onboardingData} from '@/modules/onboarding/data/onboarding'
import {setHasSeenOnboarding} from '@/modules/onboarding/slice'
import {ModuleSlug} from '@/modules/slugs'

export const Onboarding = () => {
  const carouselRef = useRef<SwiperFlatList>(null)
  const navigation = useNavigation<ModuleSlug>()
  const dispatch = useDispatch()

  return (
    <Screen
      scroll={false}
      stickyFooter={
        <Box>
          <Button
            label="Volgende"
            onPress={() => {
              carouselRef?.current?.getCurrentIndex() !==
              onboardingData.length - 1
                ? carouselRef.current?.scrollToIndex({
                    index: carouselRef.current.getCurrentIndex() + 1,
                  })
                : navigation.navigate(ModuleSlug.home)
              dispatch(setHasSeenOnboarding(true))
            }}
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
              onPress={() => navigation.navigate(ModuleSlug.home)}
            />
          </Row>
        </Box>
      }>
      <Carousel
        items={onboardingData}
        ref={carouselRef}
      />
    </Screen>
  )
}
