import {forwardRef} from 'react'
import {StyleSheet, ImageURISource} from 'react-native'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import {CarouselSlide} from '@/modules/onboarding/components/CarouselSlide'
import {baseColor} from '@/themes/tokens/base-color'
import {sizeTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

type CarouselItemType = {
  image: ImageURISource
  subText: string
  title: string
}

type RenderElementProps = {
  index: number
  item: CarouselItemType
}

type Props = {
  items: CarouselItemType[]
}

export const Carousel = forwardRef<SwiperFlatList, Props>(
  ({items}: Props, ref) => {
    const styles = useThemable(createStyles)

    return (
      <SwiperFlatList
        data={items}
        paginationActiveColor={baseColor.primary.blue}
        paginationDefaultColor={baseColor.primary.blue}
        paginationStyle={styles.paginationContainer}
        paginationStyleItem={styles.paginationItem}
        paginationStyleItemActive={styles.paginationItemActive}
        ref={ref}
        renderItem={({item}: RenderElementProps) => (
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
      gap: sizeTokens.spacing.md,
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
