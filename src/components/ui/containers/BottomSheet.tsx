import BottomSheetOriginal, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import {FC, ReactNode} from 'react'
import {SafeArea} from '@/components/ui/containers/SafeArea'
import {TestProps} from '@/components/ui/types'
import {useBottomSheetHandler} from '@/hooks/useBottomSheetHandler'
import {useIsReduceMotionEnabled} from '@/hooks/useIsReduceMotionEnabled'

const Backdrop: FC<BottomSheetBackdropProps> = props => (
  <BottomSheetBackdrop
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    {...props}
  />
)

type Props = Partial<
  Omit<
    BottomSheetProps,
    'children' | 'contentHeight' | 'handleHeight' | 'ref' | 'snapPoints'
  >
> & {children: ReactNode; snapPoints?: (string | number)[]} & TestProps

/**
 * Use in combination with <HideFromAccessibility /> and useAccessibilityFocusWhenBottomsheetIsOpen.
 */
export const BottomSheet = ({
  children,
  onChange,
  snapPoints,
  testID,
  ...rest
}: Props) => {
  const {onChange: onChangeHandler, ref} = useBottomSheetHandler()
  const isReduceMotionEnabled = useIsReduceMotionEnabled()

  return (
    <BottomSheetOriginal
      animateOnMount={!isReduceMotionEnabled}
      animationConfigs={
        isReduceMotionEnabled
          ? {
              duration: 1,
            }
          : undefined
      }
      backdropComponent={Backdrop}
      enableDynamicSizing
      enablePanDownToClose
      handleHeight={24}
      index={-1}
      onChange={snapPointIndex => {
        onChangeHandler(snapPointIndex)
        onChange?.(snapPointIndex)
      }}
      ref={ref}
      snapPoints={snapPoints}
      {...rest}>
      <BottomSheetScrollView>
        <SafeArea
          bottom
          left
          right
          testID={testID}>
          {children}
        </SafeArea>
      </BottomSheetScrollView>
    </BottomSheetOriginal>
  )
}
