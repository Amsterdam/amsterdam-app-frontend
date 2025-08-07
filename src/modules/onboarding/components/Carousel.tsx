import {PixelRatio, useWindowDimensions} from 'react-native'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import type {CarouselItem, CarouselSlideItem} from '@/modules/onboarding/types'
import type {Ref} from 'react'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {CarouselSlide} from '@/modules/onboarding/components/CarouselSlide'
import {Pagination} from '@/modules/onboarding/components/Pagination'

type Props = {
  items: CarouselSlideItem[]
  onChangeIndex?: (index: number) => void
  ref?: Ref<SwiperFlatList | null>
  slideIndex: number
}

export const Carousel = ({ref, items, onChangeIndex, slideIndex}: Props) => {
  const {isPortrait} = useDeviceContext()
  const {width: windowWidth} = useWindowDimensions()
  const fontScale = PixelRatio.getFontScale()
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  return (
    <SwiperFlatList
      data={items}
      disableGesture={isScreenReaderEnabled}
      index={slideIndex}
      onChangeIndex={({index}) => {
        onChangeIndex?.(index)
      }}
      PaginationComponent={Pagination}
      ref={ref}
      renderItem={({item, index}: CarouselItem) => (
        <CarouselSlide
          fontScale={fontScale}
          index={index}
          isCurrentSlide={index === slideIndex}
          isPortrait={isPortrait}
          item={item}
          windowWidth={windowWidth}
        />
      )}
      showPagination
    />
  )
}
