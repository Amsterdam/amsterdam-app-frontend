import {forwardRef} from 'react'
import {StyleSheet} from 'react-native'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import {CarouselSlide} from '@/modules/onboarding/components/CarouselSlide'
import {setHasSeenOnboarding} from '@/modules/onboarding/slice'
import {
  CarouselSlideItemType,
  CarouselSlideType,
} from '@/modules/onboarding/types'
import {baseColor} from '@/themes/tokens/base-color'
import {sizeTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

type Props = {
  items: CarouselSlideItemType[]
}

export const Carousel = forwardRef<SwiperFlatList, Props>(
  ({items}: Props, ref) => {
    const styles = useThemable(createStyles)

    setHasSeenOnboarding(false)

    return (
      <SwiperFlatList
        data={items}
        paginationActiveColor={baseColor.primary.blue}
        paginationDefaultColor={baseColor.primary.blue}
        paginationStyle={styles.paginationContainer}
        paginationStyleItem={styles.paginationItem}
        paginationStyleItemActive={styles.paginationItemActive}
        ref={ref}
        renderItem={({item}: CarouselSlideType) => (
          <CarouselSlide
            image={item.image}
            subText={item.subText}
            title={item.title}
          />
        )}
        showPagination
      />
    )
  },
)

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      // gap: sizeTokens.spacing.md,
      backgroundColor: 'white',
    },
    paginationContainer: {
      gap: sizeTokens.spacing.md,
    },
    paginationItem: {
      width: sizeTokens.spacing.sm,
      height: sizeTokens.spacing.sm,
    },
    paginationItemActive: {
      height: sizeTokens.spacing.sm,
      width: sizeTokens.spacing.md,
    },
  })
