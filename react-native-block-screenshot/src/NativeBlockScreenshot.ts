import {TurboModuleRegistry} from 'react-native'
import type {TurboModule} from 'react-native'

export interface ImageResolvedAssetSource {
  height: number
  scale: number
  uri: string
  width: number
}

export interface Spec extends TurboModule {
  addListener: (eventName: string) => void
  disableBlockScreenshot: () => Promise<void>
  enableBlockScreenshot: (params: {
    backgroundColor: string
    scale: number
    source: ImageResolvedAssetSource
  }) => Promise<void>
  removeListeners: (count: number) => void
}

// eslint-disable-next-line import-x/no-default-export
export default TurboModuleRegistry.getEnforcing<Spec>('BlockScreenshot')
