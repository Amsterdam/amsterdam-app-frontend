import {forwardRef, useState} from 'react'
import {useWindowDimensions} from 'react-native'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {CarouselSlide} from '@/modules/onboarding/components/CarouselSlide'
import {Pagination} from '@/modules/onboarding/components/Pagination'
import {CarouselItem, CarouselItems} from '@/modules/onboarding/types'

export const Carousel = forwardRef<SwiperFlatList, CarouselItems>(
  ({items}: CarouselItems, ref) => {
    const {isPortrait, fontScale} = useDeviceContext()
    const {width} = useWindowDimensions()
    const isScreenReaderEnabled = useIsScreenReaderEnabled()
    const [slideIndex, setSlideIndex] = useState<number>(0)

    return (
      <SwiperFlatList
        data={items}
        disableGesture={isScreenReaderEnabled}
        onChangeIndex={({index}) => setSlideIndex(index)}
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
