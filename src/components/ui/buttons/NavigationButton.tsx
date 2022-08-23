import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import React from 'react'
import {Box} from '@/components/ui'
import {Pressable} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Link} from '@/components/ui/text'
import {IconSize} from '@/components/ui/types'
import {useTheme} from '@/themes'

type Props = {
  direction?: 'backward' | 'forward'
  iconSize?: IconSize
  label: string
  onPress: () => void
}

export const NavigationButton = ({
  direction = 'forward',
  iconSize = 24,
  label,
  onPress,
}: Props) => {
  const {color} = useTheme()

  const IconComponent = direction === 'forward' ? ChevronRight : ChevronLeft

  return (
    <Pressable onPress={onPress}>
      <Box insetHorizontal="md" insetVertical="sm">
        <Row align="between" gutter="md" valign="center">
          {direction === 'backward' && (
            <Icon size={iconSize}>
              <IconComponent fill={color.text.link} />
            </Icon>
          )}
          <Link label={label} level="h5" />
          {direction === 'forward' && (
            <Icon size={iconSize}>
              <IconComponent fill={color.text.link} />
            </Icon>
          )}
        </Row>
      </Box>
    </Pressable>
  )
}
