import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {ScrollView} from '@/components/ui/layout'

type Props = {
  children: ReactNode
  withBottomInset?: boolean
  withTopInset?: boolean
  scroll?: boolean
}

export const Screen = ({
  children,
  withTopInset = false,
  withBottomInset = true,
  scroll = false,
}: Props) => {
  const insets = useSafeAreaInsets()
  const styles = createStyles(insets, {
    withTopInset,
    withBottomInset,
  })

  return scroll ? (
    <ScrollView style={styles.scrollView}>
      <View style={styles.view}>{children}</View>
    </ScrollView>
  ) : (
    <View style={styles.view}>{children}</View>
  )
}

const createStyles = (
  {bottom, left, right, top}: EdgeInsets,
  {
    withBottomInset,
    withTopInset,
  }: Pick<Props, 'withTopInset' | 'withBottomInset'>,
) => {
  return StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    view: {
      flex: 1,
      paddingBottom: withBottomInset ? bottom : 0,
      paddingLeft: left,
      paddingRight: right,
      paddingTop: withTopInset ? top : 0,
    },
  })
}
