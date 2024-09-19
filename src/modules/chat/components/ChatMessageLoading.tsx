import {StyleSheet, View} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {SizeTokens} from '@/themes/tokens/size'
import {useTheme} from '@/themes/useTheme'

export const ChatMessageLoading = () => {
  const {color, size} = useTheme()
  const styles = createStyles(size)
  const colors = [
    color.chat.loading.light,
    color.chat.loading.medium,
    color.chat.loading.dark,
  ]

  return (
    <Box insetVertical="xs">
      <Row
        align="center"
        gutter="xs"
        valign="center">
        {colors.map((dotColor, index) => (
          <View
            key={index}
            style={[styles.loadingDot, {backgroundColor: dotColor}]}
          />
        ))}
      </Row>
    </Box>
  )
}

const createStyles = (size: SizeTokens) =>
  StyleSheet.create({
    loadingDot: {
      width: size.spacing.sm,
      height: size.spacing.sm,
      borderRadius: size.spacing.sm,
    },
  })
