/* eslint-disable import-x/no-default-export */
declare module '*.svg' {
  import {FC} from 'react'
  import {SvgProps} from '@/types/svg'

  const content: FC<SvgProps>
  export default content
}

declare module '*.jpg' {
  import {ImageURISource} from 'react-native'

  const source: ImageURISource
  export default source
}

declare module '*.png' {
  import {ImageURISource} from 'react-native'

  const content: ImageURISource
  export default content
}

declare module '@env' {
  export const API_KEY_DEV: string | undefined
  export const API_KEY_TEST: string | undefined
  export const API_KEY_ACC: string | undefined
  export const API_KEY_PROD: string | undefined
  export const BUILD_NUMBER: string | undefined
  export const PIWIK_PRO_ID: string | undefined
  export const PIWIK_PRO_ID_ACCEPT: string | undefined
  export const PIWIK_PRO_URL: string | undefined
  export const PIWIK_PRO_URL_ACCEPT: string | undefined
  export const VERSION: string | undefined
  export const APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_DEV: string | undefined
  export const APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_TEST: string | undefined
  export const APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_ACC: string | undefined
  export const APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_PROD: string | undefined
}
