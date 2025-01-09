import {
  Image,
  NativeEventEmitter,
  Platform,
  processColor,
  type ImageSourcePropType,
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
  backgroundColor: string
  scale: number
  source: ImageSourcePropType
}): Promise<void> =>
  BlockScreenshot.enableBlockScreenshot({
    // @ts-expect-error changes...
    backgroundColor: processColor(backgroundColor),
    scale,
    // @ts-expect-error changes...
    source: checkSource(source),
  })

export const disableBlockScreenshot = (): Promise<void> =>
  BlockScreenshot.disableBlockScreenshot()

const eventListener = new NativeEventEmitter(BlockScreenshot)

export const addEventListener = (callBack: () => void) => {
  let remove = (): void => undefined

  if (Platform.OS === 'ios') {
    // if (!eventListener) {
    //   BlockScreenshot.addEventListener(callBack)
    // eventListener = new NativeEventEmitter(BlockScreenshot)
    // }
    const add = eventListener.addListener('onScreenshot', callBack)

    remove = () => add.remove()
  }

  return () => {
    remove()
    // if (eventListener?.listenerCount('onScreenshot') === 0) {
    //   BlockScreenshot.removeListeners()
    //   // eventListener = null
    // }
  }
}
