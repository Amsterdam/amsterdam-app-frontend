import {ComponentType, Fragment} from 'react'
import {View} from 'react-native'
import {Path, Svg} from 'react-native-svg'
import {Rotator} from '@/components/ui/animations/Rotator'
import {IconName, IconPath} from '@/components/ui/media/iconPaths'
import {IconSize, TestProps} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

const DEFAULT_STROKE_WIDTH = 3

type AdditionalIconConfig = {
  Wrapper?: ComponentType
  stroke: boolean
  strokeWidth?: number
}
const AdditionalIconConfigs: Partial<Record<IconName, AdditionalIconConfig>> = {
  spinner: {Wrapper: Rotator, stroke: true},
}

export type IconProps = {
  /**
   * The color of the icon to display.
   */
  color?: keyof Theme['color']['text']
  /**
   * The name of the icon to display.
   */
  name: IconName
  'sentry-label'?: string
  /**
   * The size of the icon.
   */
  size?: keyof typeof IconSize
  testID?: string
} & TestProps

export const Icon = ({
  color = 'default',
  name,
  size = 'md',
  testID,
  'sentry-label': sentryLabel,
}: IconProps) => {
  const {color: colorTokens} = useTheme()
  const {fontScale} = useDeviceContext()
  const scaledSize = IconSize[size] * fontScale

  const {
    Wrapper = Fragment,
    stroke,
    strokeWidth = DEFAULT_STROKE_WIDTH,
  } = AdditionalIconConfigs[name] ?? {}

  return (
    <View
      sentry-label={sentryLabel}
      testID={testID}>
      <Wrapper>
        <Svg
          fillRule="evenodd"
          height={scaledSize}
          viewBox="0 0 32 32"
          width={scaledSize}>
          <Path
            d={IconPath[name]}
            fill={!stroke ? colorTokens.text[color] : 'none'}
            stroke={stroke ? colorTokens.text[color] : undefined}
            strokeWidth={stroke ? strokeWidth : undefined}
          />
        </Svg>
      </Wrapper>
    </View>
  )
}
