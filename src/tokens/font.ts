import {TextStyle} from 'react-native'
import {color} from './color'
import {fontFamily} from './fontFamily'

type FontTextStyle = Pick<
  TextStyle,
  'fontFamily' | 'fontSize' | 'lineHeight' | 'color'
>

type Font = {
  h1: FontTextStyle
  h2: FontTextStyle
  h3: FontTextStyle
  h4: FontTextStyle
  p1: FontTextStyle
  p2: FontTextStyle
  intro: FontTextStyle
  t1: FontTextStyle
}

const fontColor = {
  regular: color.tint.level7,
  light: color.tint.level6,
}

export const font: Font = {
  h1: {
    fontFamily: fontFamily.demi,
    fontSize: 24,
    lineHeight: 30,
    color: fontColor.regular,
  },
  h2: {
    fontFamily: fontFamily.demi,
    fontSize: 20,
    lineHeight: 28,
    color: fontColor.regular,
  },
  h3: {
    fontFamily: fontFamily.demi,
    fontSize: 20,
    lineHeight: 28,
    color: fontColor.regular,
  },
  h4: {
    fontFamily: fontFamily.demi,
    fontSize: 18,
    lineHeight: 25,
    color: fontColor.regular,
  },
  p1: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 22,
    color: fontColor.regular,
  },
  p2: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 22,
    color: '#323232',
  },
  intro: {
    fontFamily: fontFamily.demi,
    fontSize: 16,
    lineHeight: 22,
    color: fontColor.regular,
  },
  t1: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: fontColor.regular,
  },
}
