import React, {Children} from 'react'
import {StyleSheet, View} from 'react-native'

type Props = {
  children: React.ReactNode | React.ReactChildren
}

export const FormButtons = ({children}: Props) => {
  const justifyContent =
    Children.count(children) > 1 ? 'space-between' : 'flex-end'

  const styles = StyleSheet.create({
    buttons: {
      flexDirection: 'row',
      justifyContent,
      alignItems: 'center',
    },
  })

  return <View style={styles.buttons}>{children}</View>
}
