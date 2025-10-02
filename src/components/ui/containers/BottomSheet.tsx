import BottomSheetOriginal, {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetBackgroundProps,
  BottomSheetHandle,
  type BottomSheetHandleProps,
  BottomSheetProps,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import {type FC, type ReactNode, useCallback, useEffect, useRef} from 'react'
import {StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {SafeArea} from '@/components/ui/containers/SafeArea'
import {type TestProps} from '@/components/ui/types'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {
  useBottomSheet,
  useBottomSheetSelectors,
} from '@/store/slices/bottomSheet'
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
  const styles = useThemable(createStylesBackgroundComponent)

  return (
    <View
      {...props}
      accessible={false}
      style={[styles.container, style]}
    />
  )
}

const createStylesBackgroundComponent = ({color, border}: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.bottomSheet.background,
      borderRadius: border.radius.lg,
    },
  })

type Props = Partial<
  Omit<
    BottomSheetProps,
    | 'children'
    | 'contentHeight'
    | 'handleHeight'
    | 'onChange'
    | 'ref'
    | 'snapPoints'
  >
> & {
  flex?: number
  scroll?: boolean
} & TestProps &
  (
    | {children: ReactNode; variants?: never}
    | {
        children?: never
        /**
         * Use instead of children to show multiple bottom sheets on a screen.
         */
        variants: Record<string, FC>
      }
  )

const useBottomSheetHandler = () => {
  const {close, open} = useBottomSheet()
  const {isOpen, variant} = useBottomSheetSelectors()
  const {setHideContentFromAccessibility} = useScreen()
  const ref = useRef<BottomSheetOriginal>(null)

  const variantRef = useRef(variant) // needed because ref.current?.expand() triggers onChange with old variant value

  useEffect(() => {
    variantRef.current = variant
  }, [variant])

  useBlurEffect(close)

  const onChange = useCallback(
    (snapPointIndex: number) => {
      const newIsOpen = snapPointIndex !== -1

      if (newIsOpen !== isOpen) {
        newIsOpen ? open(variantRef.current) : close()
      }
    },
    [close, isOpen, open],
  )

  useEffect(() => {
    isOpen ? ref.current?.expand() : ref.current?.close()
    setHideContentFromAccessibility(isOpen)
  }, [isOpen, setHideContentFromAccessibility])

  return {
    onChange,
    ref,
    variant,
  }
}

const ScrollWrapper = ({children}: {children: ReactNode}) => (
  <BottomSheetScrollView>{children}</BottomSheetScrollView>
)

/**
 * To autofocus on an element within the bottom sheet, use the `useSetBottomSheetElementFocus` hook.
 */
export const BottomSheet = ({
  children,
  flex,
  scroll,
  testID,
  variants,
  ...rest
}: Props) => {
  const {onChange: onChangeHandler, ref, variant} = useBottomSheetHandler()
  const {top: topInset} = useSafeAreaInsets()
  const ViewComponent = scroll ? ScrollWrapper : BottomSheetView
  const styles = createStyles(flex)

  const VariantComponent: FC | undefined = variants
    ? (variants[variant ?? ''] ?? (() => null))
    : undefined

  return (
    <BottomSheetOriginal
      accessible={false}
      backdropComponent={Backdrop}
      backgroundComponent={BackgroundComponent}
      enableContentPanningGesture={false}
      enablePanDownToClose
      handleComponent={Handle}
      index={-1}
      onChange={onChangeHandler}
      ref={ref}
      topInset={topInset}
      {...rest}>
      <ViewComponent
        style={styles.container}
        testID={testID}>
        <SafeArea
          bottom
          flex={flex}
          left
          right
          testID={testID}>
          {VariantComponent ? <VariantComponent /> : children}
        </SafeArea>
      </ViewComponent>
    </BottomSheetOriginal>
  )
}

const createStyles = (flex?: number) =>
  StyleSheet.create({
    container: {
      flex,
      flexGrow: 1,
    },
  })
