import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import React from 'react'
import {Box} from '@/components/ui'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Row} from '@/components/ui/layout'
import {Icon, IconSizes} from '@/components/ui/media'
import {Link} from '@/components/ui/text'
import {useTheme} from '@/themes'

type Props = {
  iconSize?: IconSizes
  label: string
  onPress: () => void
}

export const NavigationButton = ({iconSize = 24, label, onPress}: Props) => {
  const {color} = useTheme()

  return (
    <Pressable onPress={onPress}>
      <Box insetHorizontal="md" insetVertical="sm">
        <Row align="between" gutter="md" valign="center">
          <Link label={label} level="h5" />
          <Icon size={iconSize}>
            <ChevronRight fill={color.text.link} />
          </Icon>
        </Row>
      </Box>
    </Pressable>
  )
}
