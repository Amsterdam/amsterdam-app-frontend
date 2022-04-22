import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {SizeTokens} from '../../../themes/tokens'
import {CrossAxisAlignment, MainAxisAlignment} from './types'
import {mapCrossAxisAlignment, mapMainAxisAlignment} from './utils'
import {ChildrenWithGutters} from './'

type Props = {
  align?: MainAxisAlignment
  children: ReactNode
  gutter?: keyof SizeTokens
  valign?: CrossAxisAlignment
  wrap?: boolean
}

export const Row = ({align, children, gutter, valign, wrap}: Props) => {
  const styles = createStyles({align, valign})

  return (
    <View style={[styles.row, wrap && styles.wrap]}>
      {gutter ? (
        <ChildrenWithGutters gutter={gutter} prop="width">
          {children}
        </ChildrenWithGutters>
      ) : (
        children
      )}
    </View>
  )
}

const createStyles = ({align, valign}: Partial<Props>) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: mapMainAxisAlignment(align),
      alignItems: mapCrossAxisAlignment(valign),
    },
    wrap: {
      flexWrap: 'wrap',
    },
  })
