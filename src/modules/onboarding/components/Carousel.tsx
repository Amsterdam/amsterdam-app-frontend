import {forwardRef} from 'react'
import {StyleSheet} from 'react-native'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {CarouselSlide} from '@/modules/onboarding/components/CarouselSlide'
import {setHasSeenOnboarding} from '@/modules/onboarding/slice'
import {
  CarouselSlideItemType,
  CarouselSlideType,
} from '@/modules/onboarding/types'
import {Theme} from '@/themes/themes'
import {baseColor} from '@/themes/tokens/base-color'
import {useThemable} from '@/themes/useThemable'

type Props = {
  items: CarouselSlideItemType[]
}

export const Carousel = forwardRef<SwiperFlatList, Props>(
  ({items}: Props, ref) => {
    setHasSeenOnboarding(false)
    const isScreenReaderEnabled = useIsScreenReaderEnabled()
    const styles = useThemable(createStyles)

    return (
      <SwiperFlatList
        data={items}
        disableGesture={isScreenReaderEnabled}
        paginationActiveColor={baseColor.primary.blue}
        paginationDefaultColor={baseColor.primary.blue}
        paginationStyle={styles.paginationStyle}
        paginationStyleItem={styles.paginationStyleItem}
        paginationStyleItemActive={styles.paginationStyleItemActive}
        ref={ref}
        renderItem={({item, index}: CarouselSlideType) => (
          <CarouselSlide
            index={index}
            item={item}
            length={items.length}
          />
        )}
        showPagination
      />
    )
  },
)

const createStyles = ({media, size}: Theme) => {
  const imageWidth = media.figureHeight.lg
  const imageHeight = imageWidth / media.aspectRatio.extraWide

  return StyleSheet.create({
    backgroundImage: {
      aspectRatio: media.illustrationAspectRatio.facades,
      position: 'absolute',
      height: imageHeight,
      alignSelf: 'center',
      zIndex: 0,
    },
    paginationStyle: {
      bottom: 0,
      height: 'auto',
      maxWidth: 'auto',
    },
    paginationStyleItem: {
      width: size.spacing.sm,
      height: size.spacing.sm,
    },
    paginationStyleItemActive: {
      height: size.spacing.sm,
      width: size.spacing.md,
    },
  })
}
