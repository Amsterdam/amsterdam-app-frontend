import {useMemo} from 'react'
import {ImageURISource} from 'react-native'

type ImageWithQuote = {
  quote: string
  imagePortrait: ImageURISource
  imageLandscape: ImageURISource
}

const imagesWithQuote: ImageWithQuote[] = [
  {
    quote: 'Wees jezelf als geen ander',
    imagePortrait:
      require('@/modules/welcome/assets/albert-cuijp-markt-portrait.jpg') as ImageURISource,
    imageLandscape:
      require('@/modules/welcome/assets/albert-cuijp-markt-landscape.jpg') as ImageURISource,
  },
  {
    quote: 'We zorgen goed voor onze stad en voor elkaar',
    imagePortrait:
      require('@/modules/welcome/assets/mercatorplein-portrait.jpg') as ImageURISource,
    imageLandscape:
      require('@/modules/welcome/assets/mercatorplein-landscape.jpg') as ImageURISource,
  },
  {
    quote: 'Onze stad is altijd beweging',
    imagePortrait:
      require('@/modules/welcome/assets/prinsengracht-portrait.jpg') as ImageURISource,
    imageLandscape:
      require('@/modules/welcome/assets/prinsengracht-landscape.jpg') as ImageURISource,
  },
  {
    quote: 'Onderweg komen we elkaar tegen',
    imagePortrait:
      require('@/modules/welcome/assets/tramhalte-portrait.jpg') as ImageURISource,
    imageLandscape:
      require('@/modules/welcome/assets/tramhalte-landscape.jpg') as ImageURISource,
  },
  {
    quote: 'Om te kunnen scoren heb je een goal nodig',
    imagePortrait:
      require('@/modules/welcome/assets/voetbal-portrait.jpg') as ImageURISource,
    imageLandscape:
      require('@/modules/welcome/assets/voetbal-landscape.jpg') as ImageURISource,
  },
]

export const useSelectImageWithQuote = () =>
  useMemo(
    () => imagesWithQuote[Math.floor(Math.random() * imagesWithQuote.length)],
    [],
  )
