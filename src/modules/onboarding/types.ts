import {ImageURISource} from 'react-native'

export type Onboarding = {
  hasSeenOnboarding: boolean
}

export type CarouselSlideItemType = {
  image: ImageURISource
  subText: string
  title: string
}

export type CarouselSlideType = {
  index: number
  item: CarouselSlideItemType
}

export type CarouselItemsType = {
  items: CarouselSlideType[]
}
