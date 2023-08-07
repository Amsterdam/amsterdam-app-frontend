import {useMemo} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'

type ApplyEdges = {
  bottom?: boolean
  left?: boolean
  right?: boolean
  top?: boolean
}

export type SharedSafeAreaProps = {flex?: number} & Omit<ViewProps, 'style'>

type Props = ApplyEdges & SharedSafeAreaProps

export const SafeArea = ({
  bottom,
  children,
  flex,
  left,
  right,
  top,
  ...rest
}: Props) => {
  const insets = useSafeAreaInsets()
  const styles = useMemo(
    () => createStyles(insets, {bottom, left, right, top}, flex),
    [bottom, flex, insets, left, right, top],
  )

  return (
    <View
      style={styles.insets}
      {...rest}>
      {children}
    </View>
  )
}

const createStyles = (
  insets: EdgeInsets,
  {bottom, left, right, top}: ApplyEdges,
  flex?: number,
) =>
  StyleSheet.create({
    insets: {
      flex,
      paddingBottom: bottom ? insets.bottom : undefined,
      paddingLeft: left ? insets.left : undefined,
      paddingRight: right ? insets.right : undefined,
      paddingTop: top ? insets.top : undefined,
    },
  })
