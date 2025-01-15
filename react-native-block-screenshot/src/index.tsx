import {
  Image,
  Platform,
  processColor,
  type ImageSourcePropType,
  type ColorValue,
} from 'react-native'
import BlockScreenshot from './NativeBlockScreenshot'

const checkSource = (source: ImageSourcePropType) => {
  if (!source) {
    return null
  }

  return Image.resolveAssetSource(source) ?? source
}

export const enableBlockScreenshot = ({
  backgroundColor,
  scale,
  source,
}: {
  backgroundColor: ColorValue
  scale: number
  source: ImageSourcePropType
}): void =>
  BlockScreenshot.enableBlockScreenshot({
    // @ts-expect-error does work
    backgroundColor: processColor(backgroundColor),
    scale,
    source: checkSource(source) ?? undefined,
  })

export const disableBlockScreenshot = (): void =>
  BlockScreenshot.disableBlockScreenshot()

export const addEventListener = (callBack: () => void) => {
  let remove = (): void => undefined

  if (Platform.OS === 'ios') {
    BlockScreenshot.addListener('onScreenshot')
    const add = BlockScreenshot.onScreenshot(callBack)

    remove = () => add.remove()
  }

  return () => {
    BlockScreenshot.removeListeners(1)
    remove()
  }
}
