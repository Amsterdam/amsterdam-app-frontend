import {ViewProps} from 'react-native'

export enum Direction {
  down = 'down',
  left = 'left',
  right = 'right',
  up = 'up',
}

export enum IconSize {
  sm = 12,
  md = 16,
  ml = 20,
  lg = 24,
  xl = 32,
}

export enum Orientation {
  landscape = 'landscape',
  portrait = 'portrait',
}

export enum Placement {
  above = 'above',
  after = 'after',
  before = 'before',
  below = 'below',
}

export type TestID = ViewProps['testID']

export type TestProps = {
  testID?: TestID
}
