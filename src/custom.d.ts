declare module '*.svg' {
  import {CSSProperties, FC} from 'react'
  import {ViewStyle} from 'react-native'

  type SvgProps = {fill?: string; style?: ViewStyle | CSSProperties}
  const content: FC<SvgProps>
  export default content // eslint-disable-line import/no-default-export
}
declare module '*.png' {
  import {ImageSourcePropType} from 'react-native'

  const content: ImageSourcePropType
  export default content // eslint-disable-line import/no-default-export
}

declare module '@env' {
  export const AUTH_TOKEN: string
  export const PROJECT_MANAGER_TOKEN: string
  export const VERSION: string
  export const BUILD_NUMBER: string
}
