import {ImageURISource} from 'react-native'

export type Onboarding = {
  hasSeenOnboarding: boolean
}

export type CarouselItems = {
  items: CarouselSlideItem[]
}

export type CarouselItem = {
  index: number
  item: CarouselSlideItem
}

export type CarouselSlideItem = {
  description: string
  image: ImageURISource
  title: string
}
