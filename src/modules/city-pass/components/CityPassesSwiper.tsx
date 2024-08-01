import React, {useState} from 'react'
import {StyleSheet, useWindowDimensions, View} from 'react-native'
import {useSharedValue} from 'react-native-reanimated'
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel'
import {CityPass} from '@/modules/city-pass/components/CityPass'
import {Basic} from '@/modules/city-pass/components/pagination/PaginationBasic'
import {CITY_PASS_HEIGHT} from '@/modules/city-pass/constants'
import {NEXT_CARD_VISIBLE_FRACTION_Of_AVAILABLE_SPACE} from '@/modules/city-pass/constants'
import {usePassOwners} from '@/modules/city-pass/hooks/usePassOwners'
import {PassOwner} from '@/modules/city-pass/types'
import {getParallaxScrollingOffset} from '@/modules/city-pass/utils/getParallaxScrollingOffset'
import {getPassWidth} from '@/modules/city-pass/utils/getPassWidth'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

const PAGINATION_HEIGHT = 50

type CarouselItem = {
  index: number
  item: PassOwner
}

export const CityPassesSwiper = () => {
  const styles = useThemable(createStyles)
  const {passOwnersWithActivePass} = usePassOwners()
  const {width: windowWidth} = useWindowDimensions()
  const ref = React.useRef<ICarouselInstance>(null)
  const [currentIndex, setCurrentIndex] = useState<number>()

  const progress = useSharedValue<number>(0)

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    })
  }

  const passWidth = getPassWidth(windowWidth)

  return (
    <View style={styles.container}>
      <Carousel
        data={passOwnersWithActivePass}
        loop={false}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: getParallaxScrollingOffset(
            windowWidth,
            passWidth,
            NEXT_CARD_VISIBLE_FRACTION_Of_AVAILABLE_SPACE,
          ),
          parallaxAdjacentItemScale: 1,
        }}
        // onProgressChange={progress} // to be used with react-native-reanimated-carousel v4
        onProgressChange={(_, absoluteProgress) => {
          setCurrentIndex(Math.round(absoluteProgress))
          progress.value = absoluteProgress
        }}
        pagingEnabled
        ref={ref}
        renderItem={({item, index}: CarouselItem) => (
          <CityPass
            index={index}
            isCurrentIndex={currentIndex === index}
            itemCount={passOwnersWithActivePass.length}
            passOwner={item}
          />
        )}
        snapEnabled
        style={{
          width: windowWidth,
        }}
        vertical={false}
        width={windowWidth}
      />
      <View style={styles.paginationContainer}>
        <Basic
          activeDotStyle={styles.paginationItemActive}
          containerStyle={styles.pagination}
          currentIndex={currentIndex}
          data={passOwnersWithActivePass}
          dotStyle={styles.paginationItem}
          onPress={onPressPagination}
          progress={progress}
        />
      </View>
    </View>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    container: {
      flexBasis: CITY_PASS_HEIGHT + PAGINATION_HEIGHT,
    },
    paginationContainer: {
      height: PAGINATION_HEIGHT,
      justifyContent: 'flex-end',
    },
    pagination: {
      borderRadius: 25,
      backgroundColor: color.cityPass.swiperPagination,
      alignItems: 'center',
      paddingHorizontal: size.spacing.sm,
      paddingVertical: 12,
    },
    paginationItem: {
      width: size.spacing.sm,
      height: size.spacing.sm,
      marginHorizontal: size.spacing.xs,
      backgroundColor: color.cityPass.swiperPaginationItemInactive,
      borderRadius: size.spacing.sm,
    },
    paginationItemActive: {
      backgroundColor: color.cityPass.swiperPaginationItemActive,
    },
    paginationItemInactive: {},
  })
