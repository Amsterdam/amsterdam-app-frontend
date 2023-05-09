import {StyleSheet, View} from 'react-native'
import {Theme, useThemable} from '@/themes'

type Props = {
  children: React.ReactNode
}

export const TimeboundNotification = ({children}: Props) => {
  const styles = useThemable(createStyles)

  return <View style={styles.container}>{children}</View>
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.box.background.alert,
      borderColor: color.box.background.alert,
      borderWidth: 2,
      paddingHorizontal: size.spacing.lg,
      paddingVertical: size.spacing.md,
    },
  })
