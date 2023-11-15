import {forwardRef, useState} from 'react'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {CarouselSlide} from '@/modules/onboarding/components/CarouselSlide'
import {Pagination} from '@/modules/onboarding/components/Pagination'
import {setHasSeenOnboarding} from '@/modules/onboarding/slice'
import {
  CarouselSlideItemType,
  CarouselSlideType,
} from '@/modules/onboarding/types'

type Props = {
  items: CarouselSlideItemType[]
}

export const Carousel = forwardRef<SwiperFlatList, Props>(
  ({items}: Props, ref) => {
    setHasSeenOnboarding(false)
    const isScreenReaderEnabled = useIsScreenReaderEnabled()
    const [slideIndex, setSlideIndex] = useState<number>(0)

    return (
      <SwiperFlatList
        data={items}
        disableGesture={isScreenReaderEnabled}
        onChangeIndex={({index}) => setSlideIndex(index)}
        PaginationComponent={Pagination}
        ref={ref}
        renderItem={({item, index}: CarouselSlideType) => (
          <CarouselSlide
            carouselLength={items.length}
            index={index}
            isCurrentSlide={index === slideIndex}
            item={item}
          />
        )}
        showPagination
      />
    )
  },
)
