import BottomSheetOriginal, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet'
import {ReactNode} from 'react'
import {SafeArea} from '@/components/ui/containers/SafeArea'
import {TestProps} from '@/components/ui/types'
import {useBottomSheetHandler} from '@/hooks/useBottomSheetHandler'
import {useIsReduceMotionEnabled} from '@/hooks/useIsReduceMotionEnabled'

const Backdrop = (props: BottomSheetBackdropProps) => (
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

export const BottomSheet = ({
  children,
  onChange,
  snapPoints,
  testID,
  ...rest
}: Props) => {
  const {onChange: onChangeHandler, ref} = useBottomSheetHandler()
  const isReduceMotionEnabled = useIsReduceMotionEnabled()

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints ?? ['CONTENT_HEIGHT'])

  return (
    <BottomSheetOriginal
      animationConfigs={
        isReduceMotionEnabled
          ? {
              duration: 0,
            }
          : undefined
      }
      backdropComponent={Backdrop}
      contentHeight={animatedContentHeight}
      enablePanDownToClose
      handleHeight={animatedHandleHeight}
      index={-1}
      onChange={snapPointIndex => {
        onChangeHandler(snapPointIndex)
        onChange?.(snapPointIndex)
      }}
      ref={ref}
      snapPoints={animatedSnapPoints.value}
      {...rest}>
      <SafeArea
        bottom
        flex={1}
        left
        onLayout={handleContentLayout}
        right
        testID={testID}>
        {children}
      </SafeArea>
    </BottomSheetOriginal>
  )
}
