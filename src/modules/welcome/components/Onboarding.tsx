import {useRef} from 'react'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import {Button} from '@/components/ui/buttons/Button'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Carousel} from '@/components/ui/containers/Carousel'
import {Row} from '@/components/ui/layout/Row'
import {Screen} from '@/components/ui/layout/Screen'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ModuleSlug} from '@/modules/slugs'
import {onboardingData} from '@/modules/welcome/data/onboarding'

export const Onboarding = () => {
  const carouselRef = useRef<SwiperFlatList>(null)
  const navigation = useNavigation<ModuleSlug>()

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
