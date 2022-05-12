import React, {ReactNode} from 'react'
import {Pressable, StyleSheet} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {Row} from '../../ui/layout'
import {Title} from '../../ui/typography'

type Props = {
  icon: ReactNode
  label: string
  slug: string
}

export const ModuleButton = ({icon, label}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <Pressable style={styles.button}>
      <Row gutter="md" valign="center">
        {icon}
        <Title level="h4" text={label} />
      </Row>
    </Pressable>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      paddingHorizontal: theme.size.spacing.lg,
      paddingVertical: theme.size.spacing.md,
    },
  })
