import {InteractionManager} from 'react-native'
import {DelayDurations, FocusDelay} from '@/hooks/accessibility/types'
import {Duration} from '@/types/duration'

const focusDelay: Record<DelayDurations, number> = {
  /** No delay. */
  none: 0,

  /** Short delay, typically used for brief transitions. */
  short: Duration.Short,

  /** Normal delay, typically used for most transitions. */
  normal: Duration.Normal,

  /** Wait until after initial focus is set. */
  afterInitialFocus: Duration.Normal + Duration.Short,

  /** Long delay, used for longer waiting periods before focusing. */
  long: Duration.Long,
}

export const setFocusDelay = (
  callback: () => void,
  delay: FocusDelay = 'normal',
) => {
  if (delay === 'afterAnimations') {
    void InteractionManager.runAfterInteractions(callback)

    return
  }

  return setTimeout(callback, focusDelay[delay])
}
