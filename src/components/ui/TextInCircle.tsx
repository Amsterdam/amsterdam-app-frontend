import React, {useContext} from 'react'
import {Circle as SvgCircle, Svg, Text as SvgText} from 'react-native-svg'
import {DeviceContext} from '../../providers'
import {color, font} from '../../tokens'

type Props = {
  backgroundColor?: string
  fontSize?: number
  label: string
}

export const TextInCircle = ({
  backgroundColor = color.background.emphasis,
  fontSize = font.size.p1,
  label,
}: Props) => {
  const {fontScale} = useContext(DeviceContext)
  const scaledFontSize = fontSize * fontScale
  const scaledSvgSize = 1.5 * scaledFontSize // The size of the circle depends on the font size
  const scaledBaselineOffset = (35 / 32) * scaledFontSize // Should be (5 / 4) but this magic number works better

  return (
    <Svg
      height={scaledSvgSize}
      viewBox={`0 0 ${scaledSvgSize} ${scaledSvgSize}`}
      width={scaledSvgSize}>
      <SvgCircle
        cx={scaledSvgSize / 2}
        cy={scaledSvgSize / 2}
        fill={backgroundColor}
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
