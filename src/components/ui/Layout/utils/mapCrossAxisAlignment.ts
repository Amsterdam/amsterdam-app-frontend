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
