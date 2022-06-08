import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React from 'react'
import {ViewProps} from 'react-native'
import {Strides} from '../../../../assets/icons'
import {Trait} from '../../../../components/ui'
import {Row} from '../../../../components/ui/layout'
import {Theme, useThemable} from '../../../../themes'

type Props = {
  meter: number | undefined
  strides: number | undefined
} & Pick<ViewProps, 'accessibilityLabel'>

export const ProjectTraits = ({meter, strides}: Props) => {
  const iconProps = useThemable(createIconProps)

  if (!meter && !strides) {
    return null
  }

  return (
    <Row gutter="md" wrap>
      {meter && (
        <Trait icon={<Location {...iconProps} />} label={`${meter} meter`} />
      )}
      {strides && (
        <Trait icon={<Strides {...iconProps} />} label={`${strides} stappen`} />
      )}
    </Row>
  )
}

const createIconProps = ({color}: Theme) => ({
  fill: color.text.default,
})
