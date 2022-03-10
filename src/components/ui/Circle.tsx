import React, {useContext} from 'react'
import {Circle as SvgCircle, Svg, Text as SvgText} from 'react-native-svg'
import {DeviceContext} from '../../providers'
import {color, font} from '../../tokens'

type Props = {
  fontSize?: number
  label: string
  size?: number
}

export const Circle = ({
  fontSize = font.size.p1,
  label,
  size = font.size.h3 * 2,
}: Props) => {
  const {fontScale} = useContext(DeviceContext)
  const scaledSvgSize = size * fontScale
  const scaledFontSize = fontSize * fontScale
  const scaledBaseline = size * 1.4 * fontScale

  return (
    <Svg
      height={scaledSvgSize}
      viewBox={`0 0 ${scaledSvgSize} ${scaledSvgSize}`}
      width={scaledSvgSize}>
      <SvgCircle
        cx={scaledSvgSize / 2}
        cy={scaledSvgSize / 2}
        fill={color.background.primary}
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
