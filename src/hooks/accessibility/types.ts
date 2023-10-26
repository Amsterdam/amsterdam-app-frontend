export type DelayDurations =
  | 'none'
  | 'short'
  | 'normal'
  | 'afterInitialFocus'
  | 'long'

export type FocusDelay = DelayDurations | 'afterAnimations' | undefined
