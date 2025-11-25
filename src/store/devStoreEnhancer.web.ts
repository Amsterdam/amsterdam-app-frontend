import type {ConfigureStoreOptions} from '@reduxjs/toolkit'

export const devStoreEnhancer: ConfigureStoreOptions['enhancers'] = enhancers =>
  enhancers
