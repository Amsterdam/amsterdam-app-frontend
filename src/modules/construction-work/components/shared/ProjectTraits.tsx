import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React, {SVGProps} from 'react'
import {View, ViewProps} from 'react-native'
import simplur from 'simplur'
import {Strides} from '@/assets/icons'
import {Badge, Trait} from '@/components/ui'
import {Row} from '@/components/ui/layout'
import {ProjectsItem} from '@/modules/construction-work/types'
import {Theme, useThemable} from '@/themes'

type Props = Partial<ProjectsItem> & {
  numOfUnreadArticles?: number
} & ViewProps

export const ProjectTraits = ({
  followed,
  meter,
  numOfUnreadArticles,
  strides,
  ...viewProps
}: Props) => {
  const iconProps = useThemable(createIconProps)

  if ([followed, meter, strides].every(v => !v)) {
    return null
  }

  return (
    <View {...viewProps}>
      <Row gutter="md" wrap>
        {!!followed &&
          (numOfUnreadArticles ? (
            <Trait label={simplur`${[numOfUnreadArticles]} Bericht[|en]`}>
              <Badge value={numOfUnreadArticles} />
            </Trait>
          ) : (
            <Trait icon={<Checkmark {...iconProps} />} label="Volgend" />
          ))}
        {!!meter && (
          <Trait icon={<Location {...iconProps} />} label={`${meter} meter`} />
        )}
        {!!strides && (
          <Trait
            icon={<Strides {...iconProps} />}
            label={simplur`${strides} stap[|pen]`}
          />
        )}
      </Row>
    </View>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.default,
})
