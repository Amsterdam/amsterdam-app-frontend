import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import React, {ReactNode} from 'react'
import {TouchableOpacity} from 'react-native'
import {Box} from '../../../components/ui'
import {Row} from '../../../components/ui/layout'
import {Icon} from '../../../components/ui/media'
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
          <Icon size={16}>
            <ChevronRight fill={color.font.regular} />
          </Icon>
        </Row>
      </Box>
    </TouchableOpacity>
  )
}
