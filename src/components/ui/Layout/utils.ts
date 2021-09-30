import {Children, ReactNode} from 'react'
import {FlexStyle} from 'react-native'

export const mapVerticalAlignmentInRow = (value?: string) => {
  const mapping: Record<string, FlexStyle['alignItems']> = {
    baseline: 'baseline',
    bottom: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    top: 'flex-start',
  }

  return value ? mapping[value] : undefined
}

export const mapHorizontalAlignmentInRow = (
  value?: string,
  children?: ReactNode,
) => {
  const mapping: Record<string, FlexStyle['justifyContent']> = {
    around: 'space-around',
    between: 'space-between',
    center: 'center',
    end: 'flex-end',
    'end-or-between':
      Children.count(children) > 1 ? 'space-between' : 'flex-end',
    evenly: 'space-evenly',
    start: 'flex-start',
  }

  return value ? mapping[value] : undefined
}
