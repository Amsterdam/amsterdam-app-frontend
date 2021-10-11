import {FlexStyle} from 'react-native'

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
