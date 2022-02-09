import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import React, {ReactNode} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {color} from '../../../tokens'
import {Box} from '../../ui'
import {Row} from '../../ui/layout'

type Props = {
  children: ReactNode
  onPress: () => void
}

export const SettingsLink = ({children, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
