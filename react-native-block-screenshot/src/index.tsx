import {
  Image,
  NativeEventEmitter,
  NativeModules,
  Platform,
  processColor,
  type ImageSourcePropType,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-block-screenshot' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const BlockScreenshotModule = isTurboModuleEnabled
  ? require('./NativeBlockScreenshot').default
  : NativeModules.BlockScreenshot;

const BlockScreenshot = BlockScreenshotModule
  ? BlockScreenshotModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const checkSource = (source: ImageSourcePropType) => {
  if (!source) {
    return null;
  }
  return Image.resolveAssetSource(source) ?? source;
};

export const enableBlockScreenshot = ({
  backgroundColor,
  scale,
  source,
}: {
  backgroundColor: string;
  scale: number;
  source: ImageSourcePropType;
}): Promise<void> => {
  return BlockScreenshot.enableBlockScreenshot({
    backgroundColor: processColor(backgroundColor),
    scale,
    source: checkSource(source),
  });
};

export const disableBlockScreenshot = (): Promise<void> => {
  return BlockScreenshot.disableBlockScreenshot();
};

let eventListener: NativeEventEmitter | null;

export const addEventListener = (callBack: () => void) => {
  let remove = (): void => undefined;
  if (Platform.OS === 'ios') {
    BlockScreenshot.addEventListener();
    if (eventListener == null) {
      eventListener = new NativeEventEmitter(BlockScreenshot);
      remove = eventListener.addListener('onScreenshot', callBack).remove;
    }
  }
  return () => removeEventListener(remove);
};

export const removeEventListener = (removeFn?: () => void) => {
  if (Platform.OS === 'ios') {
    if (removeFn) {
      console.log('removeFn');
      removeFn();
    } else {
      console.log('remove all');
      eventListener?.removeAllListeners('onScreenshot');
      eventListener = null;
    }
    BlockScreenshot.removeEventListener();
  }
};
