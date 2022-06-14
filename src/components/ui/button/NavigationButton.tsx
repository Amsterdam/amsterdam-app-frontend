import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import React from 'react'
import {Pressable} from 'react-native'
import {useSelector} from 'react-redux'
import {selectTheme} from '../../../themes'
import {Row} from '../layout'
import {Icon} from '../media'
import {Link} from '../typography'

type Props = {
  label: string
  onPress: () => void
}

export const NavigationButton = ({label, onPress}: Props) => {
  const {theme} = useSelector(selectTheme)

  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <Row align="between">
        <Link label={label} level="h5" />
        <Icon size={24}>
          <ChevronRight fill={theme.color.pressable.navigation} />
        </Icon>
      </Row>
    </Pressable>
  )
}
