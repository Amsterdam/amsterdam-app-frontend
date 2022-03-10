import React, {useContext} from 'react'
import {StyleProp, ViewStyle} from 'react-native'
import {Circle as SvgCircle, Svg, Text as SvgText} from 'react-native-svg'
import {DeviceContext} from '../../providers'
import {color, font} from '../../tokens'

type Props = {
  background?: string
  fontSize?: number
  label: string
  size?: number
  style?: StyleProp<ViewStyle>
}

export const Circle = ({
  background = color.background.emphasis,
  fontSize = font.size.p1,
  label,
  size = font.size.h3 * 2,
  style,
}: Props) => {
  const {fontScale} = useContext(DeviceContext)
  const scaledSvgSize = size * fontScale
  const scaledFontSize = fontSize * fontScale
  const scaledBaseline = size * 1.4 * fontScale

  return (
    <Svg
      height={scaledSvgSize}
      viewBox={`0 0 ${scaledSvgSize} ${scaledSvgSize}`}
      width={scaledSvgSize}
      style={style}>
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
        y={scaledBaseline / 2}>
        {label}
      </SvgText>
    </Svg>
  )
}
