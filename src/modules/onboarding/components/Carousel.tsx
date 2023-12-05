import {forwardRef} from 'react'
import {PixelRatio, useWindowDimensions} from 'react-native'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {CarouselSlide} from '@/modules/onboarding/components/CarouselSlide'
import {Pagination} from '@/modules/onboarding/components/Pagination'
import {CarouselItem, CarouselSlideItem} from '@/modules/onboarding/types'

type Props = {
  items: CarouselSlideItem[]
  onChangeIndex?: (index: number) => void
  slideIndex: number
}

export const Carousel = forwardRef<SwiperFlatList, Props>(
  ({items, onChangeIndex, slideIndex}: Props, ref) => {
    const {isPortrait} = useDeviceContext()
    const {width} = useWindowDimensions()
    const fontScale = PixelRatio.getFontScale()
    const isScreenReaderEnabled = useIsScreenReaderEnabled()

    return (
      <SwiperFlatList
        data={items}
        disableGesture={isScreenReaderEnabled}
        index={slideIndex}
        key={width}
        onChangeIndex={({index}) => {
          onChangeIndex?.(index)
        }}
        PaginationComponent={Pagination}
        ref={ref}
        renderItem={({item, index}: CarouselItem) => (
          <CarouselSlide
            carouselLength={items.length}
            fontScale={fontScale}
            index={index}
            isCurrentSlide={index === slideIndex}
            isPortrait={isPortrait}
            item={item}
            width={width}
          />
        )}
        showPagination
      />
    )
  },
)
