import {TextStyle} from 'react-native'

type FontMarginStyle = Pick<TextStyle, 'marginTop' | 'marginBottom'>

type FontMargin = {
  h1: FontMarginStyle
  h2: FontMarginStyle
  h3: FontMarginStyle
  h4: FontMarginStyle
  p1: FontMarginStyle
  p2: FontMarginStyle
  intro: FontMarginStyle
  t1: FontMarginStyle
}

export const fontMargin: FontMargin = {
  h1: {
    marginTop: 0,
    marginBottom: 30,
  },
  h2: {
    marginTop: 0,
    marginBottom: 28,
  },
  h3: {
    marginTop: 0,
    marginBottom: 28,
  },
  h4: {
    marginTop: 0,
    marginBottom: 3,
  },
  p1: {
    marginTop: 0,
    marginBottom: 22,
  },
  p2: {
    marginTop: 0,
    marginBottom: 22,
  },
  intro: {
    marginTop: 0,
    marginBottom: 22,
  },
  t1: {
    marginTop: 0,
    marginBottom: 18,
  },
}
