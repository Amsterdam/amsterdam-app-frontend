import {ComponentType, Fragment} from 'react'
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
  /**
   * Whether the icon scales with text being zoomed in or out.
   */
  scalesWithFont?: boolean
  /**
   * The size of the icon.
   */
  size?: keyof typeof IconSize
} & TestProps

export const Icon = ({
  color = 'default',
  name,
  scalesWithFont = true,
  size = 'md',
  testID,
}: IconProps) => {
  const {color: colorTokens} = useTheme()
  const {fontScale} = useDeviceContext()
  const scaledSize = IconSize[size] * (scalesWithFont ? fontScale : 1)

  const {
    Wrapper = Fragment,
    stroke,
    strokeWidth = DEFAULT_STROKE_WIDTH,
  } = AdditionalIconConfigs[name] ?? {}

  return (
    <Wrapper>
      <Svg
        fillRule="evenodd"
        height={scaledSize}
        testID={testID}
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
  )
}
