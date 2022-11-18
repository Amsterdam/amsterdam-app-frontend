import {useMemo} from 'react'
import {ImageURISource} from 'react-native'

type ImageWithQuote = {
  quote: string
  image4x5: ImageURISource
  image5x4: ImageURISource
  image9x16: ImageURISource
}

const imagesWithQuote: ImageWithQuote[] = [
  {
    image4x5:
      require('@/modules/welcome/assets/images/62225.wees-jezelf.4x5.md.jpg') as ImageURISource,
    image5x4:
      require('@/modules/welcome/assets/images/62225.wees-jezelf.5x4.md.jpg') as ImageURISource,
    image9x16:
      require('@/modules/welcome/assets/images/62225.wees-jezelf.9x16.md.jpg') as ImageURISource,
    quote: 'Wees jezelf als geen ander',
  },
  {
    image4x5:
      require('@/modules/welcome/assets/images/45795.zorgen-goed.4x5.md.jpg') as ImageURISource,
    image5x4:
      require('@/modules/welcome/assets/images/45795.zorgen-goed.5x4.md.jpg') as ImageURISource,
    image9x16:
      require('@/modules/welcome/assets/images/45795.zorgen-goed.9x16.md.jpg') as ImageURISource,
    quote: 'We zorgen goed voor onze stad en voor elkaar',
  },
  {
    image4x5:
      require('@/modules/welcome/assets/images/68418.in-beweging.4x5.md.jpg') as ImageURISource,
    image5x4:
      require('@/modules/welcome/assets/images/68418.in-beweging.5x4.md.jpg') as ImageURISource,
    image9x16:
      require('@/modules/welcome/assets/images/68418.in-beweging.9x16.md.jpg') as ImageURISource,
    quote: 'Onze stad is altijd in beweging',
  },
  {
    image4x5:
      require('@/modules/welcome/assets/images/67800.komen-tegen.4x5.md.jpg') as ImageURISource,
    image5x4:
      require('@/modules/welcome/assets/images/67800.komen-tegen.5x4.md.jpg') as ImageURISource,
    image9x16:
      require('@/modules/welcome/assets/images/67800.komen-tegen.9x16.md.jpg') as ImageURISource,
    quote: 'Onderweg komen we elkaar tegen',
  },
  {
    image4x5:
      require('@/modules/welcome/assets/images/42711.scoren-goal.4x5.md.jpg') as ImageURISource,
    image5x4:
      require('@/modules/welcome/assets/images/42711.scoren-goal.5x4.md.jpg') as ImageURISource,
    image9x16:
      require('@/modules/welcome/assets/images/42711.scoren-goal.9x16.md.jpg') as ImageURISource,
    quote: 'Om te kunnen scoren heb je een goal nodig',
  },
]

export const useSelectImageWithQuote = () =>
  useMemo(
    () => imagesWithQuote[Math.floor(Math.random() * imagesWithQuote.length)],
    [],
  )
