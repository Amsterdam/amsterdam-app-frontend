import BottomSheetOriginal, {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetBackgroundProps,
  BottomSheetHandle,
  type BottomSheetHandleProps,
  BottomSheetProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import {type ReactNode, useCallback, useEffect, useRef} from 'react'
import {StyleSheet, View} from 'react-native'
import {SafeArea} from '@/components/ui/containers/SafeArea'
import {type TestProps} from '@/components/ui/types'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useRoute} from '@/hooks/navigation/useRoute'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {useScreen} from '@/store/slices/screen'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

const Backdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    accessibilityHint="Dubbeltik om te sluiten"
    accessibilityLabel="Sluiten"
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    {...props}
  />
)

const Handle = (props: BottomSheetHandleProps) => (
  <BottomSheetHandle
    accessibilityHint="Veeg omlaag om te sluiten"
    accessibilityLabel="Sluiten"
    {...props}
  />
)

const BackgroundComponent = ({style, ...props}: BottomSheetBackgroundProps) => {
  const styles = useThemable(createStyles)

  return (
    <View
      {...props}
      accessible={false}
      style={[styles.container, style]}
    />
  )
}

const createStyles = ({color, border}: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.bottomSheet.background,
      borderRadius: border.radius.lg,
    },
  })

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

  return (
    <BottomSheetOriginal
      accessible={false}
      backdropComponent={Backdrop}
      backgroundComponent={BackgroundComponent}
      enableDynamicSizing
      enablePanDownToClose
      handleComponent={Handle}
      index={-1}
      onChange={(snapPointIndex, position, type) => {
        onChangeHandler(snapPointIndex)
        onChange?.(snapPointIndex, position, type)
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
