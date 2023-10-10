/* eslint-disable import/no-default-export */
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
  export const AUTH_PASSWORD: string | undefined
  export const AUTH_SHARED_SECRET: string | undefined
  export const BUILD_NUMBER: string | undefined
  export const PIWIK_PRO_ID: string | undefined
  export const PIWIK_PRO_ID_ACCEPT: string | undefined
  export const PIWIK_PRO_URL: string | undefined
  export const PIWIK_PRO_URL_ACCEPT: string | undefined
  export const VERSION: string | undefined
}
