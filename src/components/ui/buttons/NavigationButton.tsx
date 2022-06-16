import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import React from 'react'
import {useSelector} from 'react-redux'
import {Box} from '@/components/ui'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Link} from '@/components/ui/text'
import {selectTheme} from '@/themes'

type Props = {
  label: string
  onPress: () => void
}

export const NavigationButton = ({label, onPress}: Props) => {
  const {theme} = useSelector(selectTheme)

  return (
    <Pressable onPress={onPress}>
      <Box insetHorizontal="md" insetVertical="sm">
        <Row align="between" gutter="md">
          <Link label={label} level="h5" />
          <Icon size={24}>
            <ChevronRight fill={theme.color.pressable.navigation} />
          </Icon>
        </Row>
      </Box>
    </Pressable>
  )
}
