import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import React, {ReactNode} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Box} from '../../../components/ui'
import {Row} from '../../../components/ui/layout'
import {color} from '../../../tokens'

type Props = {
  children: ReactNode
  onPress: () => void
}

export const LinkToUserSection = ({children, onPress}: Props) => {
  return (
    <TouchableOpacity accessibilityRole="button" onPress={onPress}>
      <Box insetVertical="sm">
        <Row align="between" gutter="md" valign="center">
          {children}
          <View style={styles.icon}>
            <ChevronRight fill={color.font.regular} />
          </View>
        </Row>
      </Box>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 16,
    aspectRatio: 1,
  },
})
