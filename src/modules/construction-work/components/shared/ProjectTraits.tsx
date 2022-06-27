import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React from 'react'
import {View} from 'react-native'
import {Strides} from '@/assets/icons'
import {Trait} from '@/components/ui'
import {Row} from '@/components/ui/layout'
import {Theme, useThemable} from '@/themes'
import {accessibleText} from '@/utils'

type Props = {
  meter?: number
  strides?: number
}

export const ProjectTraits = ({meter, strides}: Props) => {
  const iconProps = useThemable(createIconProps)

  return (
    <View
      accessibilityLabel={accessibleText(
        [
          meter && `${meter} meter`,
          meter && strides && 'of',
          strides && `${strides} stappen`,
          'vanaf uw adres',
        ].join(' '),
      )}>
      <Row gutter="md" wrap>
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
