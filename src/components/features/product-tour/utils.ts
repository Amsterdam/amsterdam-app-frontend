import {View} from 'react-native'
import {Layout} from '@/components/features/product-tour/types'

export const measureElement = (element: View) =>
  new Promise<Layout>(resolve => {
    element.measureInWindow((x, y, width, height) => {
      resolve({x, height, width, y})
    })
  })

export const computeIsElementVisible = (
  scrollViewLayout: Layout,
  elementLayout: Layout,
) => {
  const {height: scrollHeight, y: scrollY} = scrollViewLayout
  const {height: elementHeight, y: elementY} = elementLayout

  return elementY > scrollY && elementY + elementHeight < scrollY + scrollHeight
}
