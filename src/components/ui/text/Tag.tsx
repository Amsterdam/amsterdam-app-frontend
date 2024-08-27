import {StyleSheet, View} from 'react-native'
import type {FC} from 'react'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {label: string}

export const Tag: FC<Props> = ({label}) => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.tag}>
      <Paragraph>{label}</Paragraph>
    </View>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    tag: {
      backgroundColor: color.tag.background,
      paddingHorizontal: size.spacing.sm,
      paddingVertical: size.spacing.xs,
    },
  })
