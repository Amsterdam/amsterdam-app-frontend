import {forwardRef} from 'react'
import {StyleSheet, View} from 'react-native'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import AmsterdamAndWeespFacadesImage from '@/assets/images/amsterdam-and-weesp-facades.svg'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {CarouselSlide} from '@/modules/onboarding/components/CarouselSlide'
import {setHasSeenOnboarding} from '@/modules/onboarding/slice'
import {CarouselSlideItemType} from '@/modules/onboarding/types'
import {Theme} from '@/themes/themes'
import {baseColor} from '@/themes/tokens/base-color'
import {useThemable} from '@/themes/useThemable'

type Props = {
  items: CarouselSlideItemType[]
}

export const Carousel = forwardRef<SwiperFlatList, Props>(
  ({items}: Props, ref) => {
    const styles = useThemable(createStyles)

    setHasSeenOnboarding(false)
    const isScreenReaderEnabled = useIsScreenReaderEnabled()

    return (
      <SwiperFlatList
        data={items}
        disableGesture={isScreenReaderEnabled}
        paginationActiveColor={baseColor.primary.blue}
        paginationDefaultColor={baseColor.primary.blue}
        paginationStyle={styles.paginationContainer}
        paginationStyleItem={styles.paginationItem}
        paginationStyleItemActive={styles.paginationItemActive}
        ref={ref}
        showPagination>
        <>
          <View style={{}}>
            <AmsterdamAndWeespFacadesImage />
          </View>
          {items.map((item: CarouselSlideItemType) => (
            <CarouselSlide
              image={item.image}
              subText={item.subText}
              title={item.title}
            />
          ))}
        </>
      </SwiperFlatList>
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
    },
    paginationContainer: {
      bottom: 0,
      height: 'auto',
      maxWidth: 'auto',
    },
    paginationItem: {
      width: size.spacing.sm,
      height: size.spacing.sm,
    },
    paginationItemActive: {
      height: size.spacing.sm,
      width: size.spacing.md,
    },
  })
}
