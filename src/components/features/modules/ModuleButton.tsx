import {useLinkTo} from '@react-navigation/native'
import React, {ReactNode} from 'react'
import {Pressable, StyleSheet} from 'react-native'
import {size} from '../../../tokens'
import {Row} from '../../ui/layout'
import {Title} from '../../ui/typography'

type Props = {
  icon: ReactNode
  label: string
  slug: string
}

export const ModuleButton = ({icon, label, slug}: Props) => {
  const linkTo = useLinkTo()

  return (
    <Pressable onPress={() => linkTo(`/${slug}`)} style={styles.button}>
      <Row gutter="md" valign="center">
        {icon}
        <Title level="h4" text={label} />
      </Row>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: size.spacing.lg,
  },
})
