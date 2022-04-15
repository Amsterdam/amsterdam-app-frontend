import React, {ReactNode} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'

type Props = {
  children: ReactNode
} & Pick<ViewProps, 'style'>

export const Center = ({children, ...props}: Props) => (
  <View style={[styles.center, props.style]}>{children}</View>
)

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
