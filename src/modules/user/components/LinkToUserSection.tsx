import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import React, {ReactNode} from 'react'
import {TouchableOpacity} from 'react-native'
import {useSelector} from 'react-redux'
import {Box} from '../../../components/ui'
import {Row} from '../../../components/ui/layout'
import {Icon} from '../../../components/ui/media'
import {selectTheme} from '@/themes'

type Props = {
  children: ReactNode
  onPress: () => void
}

export const LinkToUserSection = ({children, onPress}: Props) => {
  const {
    theme: {color},
  } = useSelector(selectTheme)

  return (
    <TouchableOpacity accessibilityRole="button" onPress={onPress}>
      <Box insetVertical="sm">
        <Row align="between" gutter="md" valign="center">
          {children}
          <Icon size={16}>
            <ChevronRight fill={color.text.regular} />
          </Icon>
        </Row>
      </Box>
    </TouchableOpacity>
  )
}
