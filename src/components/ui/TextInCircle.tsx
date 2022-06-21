import React, {useContext} from 'react'
import {Circle as SvgCircle, Svg, Text as SvgText} from 'react-native-svg'
import {DeviceContext} from '@/providers'
import {useTheme} from '@/themes'

type Props = {
  backgroundColor?: string
  fontSize?: number
  label: string
}

export const TextInCircle = ({backgroundColor, fontSize, label}: Props) => {
  const {fontScale} = useContext(DeviceContext)
  const {color, text} = useTheme()

  const scaledFontSize = (fontSize ?? text.fontSize.body) * fontScale
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
        fill={backgroundColor ?? color.box.background.emphasis}
        r={scaledSvgSize / 2}
      />
      <SvgText
        fill={color.text.inverse}
        fontFamily={text.fontWeight.demi}
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
