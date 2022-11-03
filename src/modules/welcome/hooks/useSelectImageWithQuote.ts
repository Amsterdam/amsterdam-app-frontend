import {useMemo} from 'react'
import {ImageURISource} from 'react-native'

type ImageWithQuote = {
  quote: string
  imagePortrait: ImageURISource
  imageLandscape: ImageURISource
}

const imagesWithQuote: ImageWithQuote[] = [
  {
    quote: 'Om te kunnen scoren heb je een goal nodig',
    imagePortrait:
      require('@/modules/welcome/assets/voetbal-portrait.jpeg') as ImageURISource,
    imageLandscape:
      require('@/modules/welcome/assets/voetbal-landscape.jpeg') as ImageURISource,
  },
  {
    quote: 'We zorgen goed voor onze stad en voor elkaar',
    imagePortrait:
      require('@/modules/welcome/assets/mercatorplein-portrait.jpeg') as ImageURISource,
    imageLandscape:
      require('@/modules/welcome/assets/mercatorplein-landscape.jpeg') as ImageURISource,
  },
]

export const useSelectImageWithQuote = () =>
  useMemo(
    () => imagesWithQuote[Math.floor(Math.random() * imagesWithQuote.length)],
    [],
  )
