import {FlexStyle} from 'react-native'

export const mapCrossAxisAlignment = (value?: string) => {
  const mapping: Record<string, FlexStyle['alignItems']> = {
    baseline: 'baseline',
    bottom: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    top: 'flex-start',
  }

  return value ? mapping[value] : undefined
}

export const mapMainAxisAlignment = (value?: string) => {
  const mapping: Record<string, FlexStyle['justifyContent']> = {
    around: 'space-around',
    between: 'space-between',
    center: 'center',
    end: 'flex-end',
    evenly: 'space-evenly',
    start: 'flex-start',
  }

  return value ? mapping[value] : undefined
}
