import React, {useMemo} from 'react'
import {FlexStyle, StyleSheet, View, ViewProps} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'

type Props = {
  apply?: boolean
} & Pick<FlexStyle, 'flex'> &
  Omit<ViewProps, 'style'>

export const HorizontalSafeArea = ({
  apply = true,
  flex,
  children,
  ...viewProps
}: Props) => {
  const insets = useSafeAreaInsets()
  const styles = useMemo(
    () => createStyles({apply, flex}, insets),
    [apply, flex, insets],
  )

  return (
    <View style={styles.insets} {...viewProps}>
      {children}
    </View>
  )
}

const createStyles = ({apply, flex}: Props, insets: EdgeInsets) =>
  StyleSheet.create({
    insets: {
      flex,
      paddingLeft: apply ? insets.left : undefined,
      paddingRight: apply ? insets.right : undefined,
    },
  })
