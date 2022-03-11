import React, {useContext} from 'react'
import {StyleProp, ViewStyle} from 'react-native'
import {Circle as SvgCircle, Svg, Text as SvgText} from 'react-native-svg'
import {DeviceContext} from '../../providers'
import {color, font} from '../../tokens'

type Props = {
  background?: string
  fontSize?: number
  label: string
  style?: StyleProp<ViewStyle>
}

export const TextInCircle = ({
  background = color.background.emphasis,
  fontSize = font.size.p1,
  label,
  style,
}: Props) => {
  const {fontScale} = useContext(DeviceContext)
  const scaledFontSize = fontSize * fontScale
  const scaledSvgSize = 1.5 * scaledFontSize // The size of the circle depends on the font size
  const scaledBaselineOffset = (35 / 32) * scaledFontSize // Should be (5 / 4) but this magic number works better

  return (
    <Svg
      height={scaledSvgSize}
      style={style}
      viewBox={`0 0 ${scaledSvgSize} ${scaledSvgSize}`}
      width={scaledSvgSize}>
      <SvgCircle
        cx={scaledSvgSize / 2}
        cy={scaledSvgSize / 2}
        fill={background}
        r={scaledSvgSize / 2}
      />
      <SvgText
        fill={color.font.inverse}
        fontFamily={font.weight.demi}
        fontSize={scaledFontSize}
        fontWeight="500"
        textAnchor="middle"
        x={scaledSvgSize / 2}
        y={scaledBaselineOffset}>
        {label}
      </SvgText>
    </Svg>
  )
}
