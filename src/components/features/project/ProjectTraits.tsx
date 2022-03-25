import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React from 'react'
import {ViewProps} from 'react-native'
import {Strides} from '../../../assets/icons'
import {color} from '../../../tokens'
import {Trait} from '../../ui'
import {Row} from '../../ui/layout'

type Props = {
  meter: number | undefined
  strides: number | undefined
} & Pick<ViewProps, 'accessibilityLabel'>

export const ProjectTraits = ({meter, strides}: Props) => {
  if (!meter && !strides) {
    return null
  }

  return (
    <Row gutter="sm" wrap>
      {meter && (
        <Trait
          icon={<Location fill={color.font.primary} />}
          label={`${meter} meter`}
        />
      )}
      {strides && (
        <Trait
          icon={<Strides fill={color.font.primary} />}
          label={`${strides} stappen`}
        />
      )}
    </Row>
  )
}
