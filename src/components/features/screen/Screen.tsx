import {type ReactNode} from 'react'
import {type Tip} from '@/components/features/product-tour/types'
import {ScreenBase} from '@/components/features/screen/ScreenBase'
import {type TestProps} from '@/components/ui/types'
import {useTrackScreenOnFocus} from '@/processes/piwik/hooks/useTrackScreenOnFocus'

export type WithInsetProps = {
  withBottomInset?: boolean
  withLeftInset?: boolean
  withRightInset?: boolean
  withTopInset?: boolean
}

export type ScreenProps = {
  bottomSheet?: ReactNode
  children: ReactNode
  hasStickyAlert?: boolean
  keyboardAware?: boolean
  scroll?: boolean
  stickyFooter?: ReactNode
  stickyHeader?: ReactNode
  /**
   * Include all product-tour tips on the screen to determine if the scroll should be tracked
   */
  trackScroll?: Tip[]
} & TestProps &
  WithInsetProps

export const Screen = (props: ScreenProps) => {
  useTrackScreenOnFocus()

  return <ScreenBase {...props} />
}
