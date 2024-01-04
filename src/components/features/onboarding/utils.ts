import {View} from 'react-native'
import {Layout} from '@/components/features/onboarding/types'

export const measureElement = (element: View) =>
  new Promise<Layout>(resolve => {
    element.measureInWindow((_x, y, _width, height) => {
      resolve({height, y})
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
