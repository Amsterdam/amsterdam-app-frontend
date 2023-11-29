import {forwardRef, useImperativeHandle, useRef, useState} from 'react'
import {PixelRatio, useWindowDimensions} from 'react-native'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {CarouselSlide} from '@/modules/onboarding/components/CarouselSlide'
import {Pagination} from '@/modules/onboarding/components/Pagination'
import {CarouselItem, CarouselSlideItem} from '@/modules/onboarding/types'

export type RefProps = {
  scrollToIndex: ({index}: {index: number}) => void
}

type Props = {
  items: CarouselSlideItem[]
  onChangeIndex?: (index: number) => void
}

export const Carousel = forwardRef<RefProps, Props>(
  ({items, onChangeIndex}: Props, ref) => {
    const {isPortrait} = useDeviceContext()
    const {width} = useWindowDimensions()
    const fontScale = PixelRatio.getFontScale()
    const isScreenReaderEnabled = useIsScreenReaderEnabled()
    const swiperRef = useRef<SwiperFlatList>(null)
    const [slideIndex, setSlideIndex] = useState<number>(0)

    useImperativeHandle(ref, () => ({
      scrollToIndex: ({index}: {index: number}) => {
        setSlideIndex(index)
        onChangeIndex?.(index)
        swiperRef.current?.scrollToIndex({index})
      },
    }))

    return (
      <SwiperFlatList
        data={items}
        disableGesture={isScreenReaderEnabled}
        index={slideIndex}
        key={width}
        onChangeIndex={({index}) => {
          setSlideIndex(index)
          onChangeIndex?.(index)
        }}
        PaginationComponent={Pagination}
        ref={swiperRef}
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
