import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import React from 'react'
import {useSelector} from 'react-redux'
import {selectTheme} from '../../../themes'
import {Row} from '../layout'
import {Icon} from '../media'
import {Link} from '../typography'
import {BlockLink} from './BlockLink'

type Props = {
  label: string
  onPress: () => void
}

export const NavigationButton = ({label, onPress}: Props) => {
  const {theme} = useSelector(selectTheme)

  return (
    <BlockLink onPress={onPress}>
      <Row align="between">
        <Link label={label} />
        <Icon size={24}>
          <ChevronRight fill={theme.color.pressable.navigation} />
        </Icon>
      </Row>
    </BlockLink>
  )
}
