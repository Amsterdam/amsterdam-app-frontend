import React, {useMemo} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'

type Props = {
  apply?: boolean
} & Omit<ViewProps, 'style'>

export const HorizontalSafeArea = ({
  apply = true,
  children,
  ...viewProps
}: Props) => {
  const insets = useSafeAreaInsets()
  const styles = useMemo(() => createStyles(apply, insets), [apply, insets])

  return (
    <View style={styles.insets} {...viewProps}>
      {children}
    </View>
  )
}

const createStyles = (apply: Props['apply'], insets: EdgeInsets) =>
  StyleSheet.create({
    insets: {
      paddingLeft: apply ? insets.left : undefined,
      paddingRight: apply ? insets.right : undefined,
    },
  })
