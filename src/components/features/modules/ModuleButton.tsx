import {useLinkTo} from '@react-navigation/native'
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

export const ModuleButton = ({icon, label, slug}: Props) => {
  const linkTo = useLinkTo()
  const styles = useThemable(createStyles)

  return (
    <Pressable onPress={() => linkTo(`/${slug}`)} style={styles.button}>
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
      paddingHorizontal: theme.size.lg,
      paddingVertical: theme.size.md,
    },
  })
