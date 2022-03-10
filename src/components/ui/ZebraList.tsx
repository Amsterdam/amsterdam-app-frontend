import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {color, size} from '../../tokens'

export type ZebraListItemProps = {
  index: number
  text: string
}

type Props = {
  data: string[]
  renderItem: ({index, text}: ZebraListItemProps) => ReactNode
}

export const ZebraList = ({data, renderItem}: Props) => (
  <>
    {data.map((item, index) => (
      <View
        key={item.substring(0, 16)}
        style={[
          styles.item,
          {
            backgroundColor: index % 2 ? undefined : color.background.grey,
          },
        ]}>
        {renderItem({index: index + 1, text: item})}
      </View>
    ))}
  </>
)

const styles = StyleSheet.create({
  item: {
    padding: size.spacing.md,
    borderTopWidth: 2,
    borderTopColor: color.border.default,
  },
})
