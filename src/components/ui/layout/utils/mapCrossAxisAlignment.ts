import {FlexStyle} from 'react-native'

export const mapCrossAxisAlignment = (value?: string) => {
  const mapping: Record<string, FlexStyle['alignItems']> = {
    baseline: 'baseline',
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    start: 'flex-start',
  }

  return value ? mapping[value] : undefined
}
