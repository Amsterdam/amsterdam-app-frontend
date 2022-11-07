import {FlexStyle} from 'react-native'

export const mapSelfAlignment = (value?: string) => {
  const mapping: Record<string, FlexStyle['alignSelf']> = {
    auto: 'auto',
    baseline: 'baseline',
    center: 'center',
    end: 'flex-end',
    start: 'flex-start',
    stretch: 'stretch',
  }

  return value ? mapping[value] : undefined
}
