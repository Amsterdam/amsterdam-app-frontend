import {useMemo} from 'react'
import {ImageURISource} from 'react-native'

type ImageWithQuote = {
  quote: string
  image54: ImageURISource
  image916: ImageURISource
}

const imagesWithQuote: ImageWithQuote[] = [
  {
    image54:
      require('@/modules/welcome/assets/images/62225.wees-jezelf.5-4.md.jpg') as ImageURISource,
    image916:
      require('@/modules/welcome/assets/images/62225.wees-jezelf.9-16.md.jpg') as ImageURISource,
    quote: 'Wees jezelf als geen ander',
  },
  {
    image54:
      require('@/modules/welcome/assets/images/45795.zorgen-goed.5-4.md.jpg') as ImageURISource,
    image916:
      require('@/modules/welcome/assets/images/45795.zorgen-goed.9-16.md.jpg') as ImageURISource,
    quote: 'We zorgen goed voor onze stad en voor elkaar',
  },
  {
    image54:
      require('@/modules/welcome/assets/images/68418.in-beweging.5-4.md.jpg') as ImageURISource,
    image916:
      require('@/modules/welcome/assets/images/68418.in-beweging.9-16.md.jpg') as ImageURISource,
    quote: 'Onze stad is altijd in beweging',
  },
  {
    image54:
      require('@/modules/welcome/assets/images/67800.komen-tegen.5-4.md.jpg') as ImageURISource,
    image916:
      require('@/modules/welcome/assets/images/67800.komen-tegen.9-16.md.jpg') as ImageURISource,
    quote: 'Onderweg komen we elkaar tegen',
  },
  {
    image54:
      require('@/modules/welcome/assets/images/42711.scoren-goal.5-4.md.jpg') as ImageURISource,
    image916:
      require('@/modules/welcome/assets/images/42711.scoren-goal.9-16.md.jpg') as ImageURISource,
    quote: 'Om te kunnen scoren heb je een goal nodig',
  },
]

export const useSelectImageWithQuote = () =>
  useMemo(
    () => imagesWithQuote[Math.floor(Math.random() * imagesWithQuote.length)],
    [],
  )
