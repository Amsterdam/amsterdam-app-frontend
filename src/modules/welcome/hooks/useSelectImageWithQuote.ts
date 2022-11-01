import {useMemo} from 'react'
import {ImageURISource} from 'react-native'

type ImageWithQuotes = {
  quote: string
  imagePortrait: ImageURISource
  imageLandscape: ImageURISource
}

const imagesWithQuotes: ImageWithQuotes[] = [
  {
    quote: 'Om te kunnen scoren heb je een goal nodig',
    imagePortrait:
      require('@/modules/welcome/assets/voetbal-portrait.jpg') as ImageURISource,
    imageLandscape:
      require('@/modules/welcome/assets/voetbal-landscape.jpg') as ImageURISource,
  },
  {
    quote: 'We zorgen goed voor onze stad en voor elkaar',
    imagePortrait:
      require('@/modules/welcome/assets/mercatorplein-portrait.jpg') as ImageURISource,
    imageLandscape:
      require('@/modules/welcome/assets/mercatorplein-landscape.jpg') as ImageURISource,
  },
]

export const useSelectImageWithQuote = () =>
  useMemo(
    () => imagesWithQuotes[Math.floor(Math.random() * imagesWithQuotes.length)],
    [],
  )
