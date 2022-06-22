import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme, useThemable} from '@/themes'

export type ZebraListItemProps = {
  index: number
  text: string
}

type Props = {
  data: string[]
  renderItem: ({index, text}: ZebraListItemProps) => ReactNode
}

export const ZebraList = ({data, renderItem}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <>
      {data.map((item, index) => (
        <View
          key={item.substring(0, 16)}
          style={[styles.item, index % 2 === 0 && styles.itemDark]}>
          {renderItem({index: index + 1, text: item})}
        </View>
      ))}
    </>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    item: {
      padding: size.spacing.md,
      backgroundColor: color.box.background.white,
      borderTopWidth: 2,
      borderTopColor: color.border.default,
    },
    itemDark: {
      backgroundColor: color.box.background.grey,
    },
  })
