import {LayoutRectangle, View} from 'react-native'

export const measureElement = (element: View) =>
  new Promise<LayoutRectangle>((resolve, reject) => {
    if (element) {
      element.measureInWindow((x, y, width, height) => {
        resolve({x, height, width, y})
      })
    } else {
      reject(new Error('Element is not defined'))
    }
  })

export const computeIsElementVisible = (
  scrollViewLayout: LayoutRectangle,
  elementLayout: LayoutRectangle,
) => {
  const {height: scrollHeight, y: scrollY} = scrollViewLayout
  const {height: elementHeight, y: elementY} = elementLayout

  return elementY > scrollY && elementY + elementHeight < scrollY + scrollHeight
}
