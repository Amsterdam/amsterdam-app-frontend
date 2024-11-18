import BottomSheetOriginal, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import {type ReactNode, useCallback, useEffect, useRef} from 'react'
import {SafeArea} from '@/components/ui/containers/SafeArea'
import {type TestProps} from '@/components/ui/types'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useRoute} from '@/hooks/navigation/useRoute'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {useScreen} from '@/store/slices/screen'

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

const useBottomSheetHandler = () => {
  const {name: routeName} = useRoute()
  const {
    close,
    isOpen,
    open,
    addIsPresentAtRouteName,
    removeIsPresentAtRouteName,
  } = useBottomSheet()
  const {setHideContentFromAccessibility} = useScreen()
  const ref = useRef<BottomSheetOriginal>(null)

  useBlurEffect(close)

  const onChange = useCallback(
    (snapPointIndex: number) => {
      const newIsOpen = snapPointIndex !== -1

      if (newIsOpen !== isOpen) {
        newIsOpen ? open() : close()
      }
    },
    [close, isOpen, open],
  )

  useEffect(() => {
    isOpen ? ref.current?.expand() : ref.current?.close()
    setHideContentFromAccessibility(isOpen)
  }, [isOpen, setHideContentFromAccessibility])

  useEffect(() => {
    addIsPresentAtRouteName(routeName)

    return () => {
      removeIsPresentAtRouteName(routeName)
    }
  }, [addIsPresentAtRouteName, routeName, removeIsPresentAtRouteName])

  return {
    isOpen,
    onChange,
    ref,
  }
}

/**
 * To autofocus on an element within the bottom sheet, use the `useSetBottomSheetElementFocus` hook.
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
