export type FocusDelayKeys =
  | 'none'
  | 'short'
  | 'normal'
  | 'afterInitialFocus'
  | 'long'

export type FocusDelay = FocusDelayKeys | 'afterAnimations' | undefined
