import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme, useThemable} from '@/themes'

type Props = {
  border?: boolean
  children: ReactNode
}

export const Card = ({border = false, children}: Props) => {
  const styles = useThemable(createStyles({border}))

  return <View style={styles.card}>{children}</View>
}

const createStyles =
  ({border}: Pick<Props, 'border'>) =>
  ({color}: Theme) =>
    StyleSheet.create({
      card: {
        flexGrow: 1,
        backgroundColor: color.box.background.white,
        borderWidth: border ? 1 : undefined,
        borderColor: border ? color.border.default : undefined,
      },
    })
