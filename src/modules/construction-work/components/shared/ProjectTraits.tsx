import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React from 'react'
import {View} from 'react-native'
import {Strides} from '@/assets/icons'
import {Trait} from '@/components/ui'
import {Row} from '@/components/ui/layout'
import {Theme, useThemable} from '@/themes'
import {accessibleText} from '@/utils'

type Props = {
  followed?: boolean
  meter?: number
  strides?: number
}

export const ProjectTraits = ({followed, meter, strides}: Props) => {
  const iconProps = useThemable(createIconProps)

  if ([followed, meter, strides].every(v => !v)) {
    return null
  }

  return (
    <View
      accessibilityLabel={accessibleText(
        followed ? 'Volgend' : undefined,
        [
          meter && `${meter} meter`,
          meter && strides && 'of',
          strides && `${strides} stappen`,
          'vanaf uw adres',
        ].join(' '),
      )}>
      <Row gutter="md" wrap>
        {followed && (
          <Trait icon={<Checkmark {...iconProps} />} label="Volgend" />
        )}
        {meter && (
          <Trait icon={<Location {...iconProps} />} label={`${meter} meter`} />
        )}
        {strides && (
          <Trait
            icon={<Strides {...iconProps} />}
            label={`${strides} stappen`}
          />
        )}
      </Row>
    </View>
  )
}

const createIconProps = ({color}: Theme) => ({
  fill: color.text.default,
})
