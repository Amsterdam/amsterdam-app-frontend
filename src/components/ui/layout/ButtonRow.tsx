import React, {Children, ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Column, Gutter, Row} from '@/components/ui/layout'
import {Theme, useThemable} from '@/themes'
import {SpacingTokens} from '@/themes/tokens'

type Props = {
  children: ReactNode
}

export const ButtonRow = ({children}: Props) => {
  const childrenArray = Children.toArray(children)
  const gutter: keyof SpacingTokens = 'md'
  const styles = useThemable(createStyles(gutter))

  return (
    <View style={styles.compensateMargin}>
      <Row gutter={gutter} wrap>
        {childrenArray.map((Button, index) => (
          <Column key={index}>
            {Button}
            <Gutter height={gutter} />
          </Column>
        ))}
      </Row>
    </View>
  )
}

const createStyles =
  (gutter: keyof SpacingTokens) =>
  ({size}: Theme) =>
    StyleSheet.create({
      compensateMargin: {
        marginBottom: -size.spacing[gutter],
      },
    })
