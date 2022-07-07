import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React from 'react'
import {View} from 'react-native'
import {useSelector} from 'react-redux'
import simplur from 'simplur'
import {Strides} from '@/assets/icons'
import {Badge, Trait} from '@/components/ui'
import {Row} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text'
import {selectConstructionWorkReadArticles} from '@/modules/construction-work/construction-work.slice'
import {Theme, useThemable} from '@/themes'
import {ProjectsItem} from '@/types'
import {accessibleText, excludeListItemsFromList} from '@/utils'

type Props = Partial<ProjectsItem>

export const ProjectTraits = ({
  followed,
  meter,
  recent_articles,
  strides,
}: Props) => {
  const iconProps = useThemable(createIconProps)
  const readArticles = useSelector(selectConstructionWorkReadArticles)
  const numOfUnreadArticles = excludeListItemsFromList(
    recent_articles || [],
    readArticles.map(r => r.id),
  ).length

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
        {followed &&
          (numOfUnreadArticles ? (
            <Row gutter="sm" valign="baseline">
              <Badge value={numOfUnreadArticles} />
              <Phrase>{simplur`${numOfUnreadArticles} Bericht[|en]`}</Phrase>
            </Row>
          ) : (
            <Trait icon={<Checkmark {...iconProps} />} label="Volgend" />
          ))}
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
