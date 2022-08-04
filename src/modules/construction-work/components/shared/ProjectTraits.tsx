import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React, {SVGProps} from 'react'
import {View} from 'react-native'
import {useSelector} from 'react-redux'
import simplur from 'simplur'
import {Strides} from '@/assets/icons'
import {Badge, Trait} from '@/components/ui'
import {Row} from '@/components/ui/layout'
import {selectConstructionWorkReadArticles} from '@/modules/construction-work/construction-work.slice'
import {ProjectsItem} from '@/modules/construction-work/types'
import {Theme, useThemable} from '@/themes'
import {excludeListItemsFromList} from '@/utils'

type Props = Partial<ProjectsItem> & {accessibilityLabel: string}

export const ProjectTraits = ({
  accessibilityLabel,
  followed,
  meter,
  recent_articles,
  strides,
}: Props) => {
  const iconProps = useThemable(createIconProps)
  const readArticles = useSelector(selectConstructionWorkReadArticles)
  const numOfUnreadArticles = excludeListItemsFromList(
    recent_articles?.map(r => r.identifier) || [],
    readArticles.map(r => r.id),
  ).length

  if ([followed, meter, strides].every(v => !v)) {
    return null
  }

  return (
    <View accessibilityLabel={accessibilityLabel}>
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
