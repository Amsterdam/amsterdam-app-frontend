import React from 'react'
import {PressableProps, StyleSheet} from 'react-native'
import {Pressable} from '@/components/ui/buttons'
import {Icon} from '@/components/ui/media'
import {Theme, useThemable} from '@/themes'

export const AddButton = (props: PressableProps) => {
  const styles = useThemable(createStyles)

  return (
    <Pressable style={styles.button} {...props}>
      <Icon color="link" name="enlarge" scalesWithFont={false} size={24} />
    </Pressable>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    button: {
      padding: size.spacing.md,
      alignItems: 'center',
      borderColor: color.border.primary,
      borderStyle: 'dashed',
      borderWidth: 1,
    },
  })
