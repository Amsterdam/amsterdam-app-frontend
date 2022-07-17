import React, {useContext} from 'react'
import {Path, Svg} from 'react-native-svg'
import {IconName, IconPath} from '@/components/ui/media'
import {IconSize} from '@/components/ui/types'
import {DeviceContext} from '@/providers'
import {Theme, useTheme} from '@/themes'

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
   * Must be one of the allowed sizes.
   */
  size?: IconSize
}

export const Icon = ({
  color = 'default',
  name,
  scalesWithFont = true,
  size = 16,
}: IconProps) => {
  const {color: colorTokens} = useTheme()
  const {fontScale} = useContext(DeviceContext)
  const scaledSize = size * (scalesWithFont ? fontScale : 1)

  return (
    <Svg
      fillRule="evenodd"
      height={scaledSize}
      viewBox="0 0 32 32"
      width={scaledSize}>
      <Path d={IconPath[name]} fill={colorTokens.text[color]} />
    </Svg>
  )
}
