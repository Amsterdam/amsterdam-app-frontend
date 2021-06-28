import React, {ReactNode} from 'react'
import {StyleSheet, Text} from 'react-native'

export type TitleProps = {
  level: 1 | 2 | 3 | 4
  children: ReactNode
}

function Title({level, children}: TitleProps) {
  const fontSize = [24, 20, 20, 18]
  const lineHeight = [30, 28, 28, 25]

  const styles = StyleSheet.create({
    title: {
      fontSize: fontSize[level],
      lineHeight: lineHeight[level],
      color: '#000000',
      fontWeight: '700',
    },
  })

  return <Text style={styles.title}>{children}</Text>
}

export default Title
