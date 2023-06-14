declare module '*.svg' {
  import {FC} from 'react'
  import {SvgProps} from '@/types'

  const content: FC<SvgProps>
  export default content // eslint-disable-line import/no-default-export
}
declare module '*.png' {
  import {ImageSourcePropType} from 'react-native'

  const content: ImageSourcePropType
  export default content // eslint-disable-line import/no-default-export
}

declare module '@env' {
  export const VERSION: string | undefined
  export const BUILD_NUMBER: string | undefined
  export const AUTH_PASSWORD: string | undefined
  export const AUTH_SHARED_SECRET: string | undefined
  export const PIWIK_PRO_URL_ACCEPT: string | undefined
  export const PIWIK_PRO_ID_ACCEPT: string | undefined
}
