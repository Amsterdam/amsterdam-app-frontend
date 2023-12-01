import {memo} from 'react'
import {View, ViewProps} from 'react-native'
import simplur from 'simplur'
import {Badge} from '@/components/ui/feedback/Badge'
import {Trait} from '@/components/ui/feedback/Trait'
import {Row} from '@/components/ui/layout/Row'
import {ProjectsItem} from '@/modules/construction-work/types/api'
import {getDistanceAndStrides} from '@/modules/construction-work/utils/getDistanceAndStrides'

export type ProjectTraitsProps = {
  followed?: ProjectsItem['followed']
  meter?: ProjectsItem['meter']
  strides?: ProjectsItem['strides']
  unreadArticlesLength?: number
}

type Props = ProjectTraitsProps & ViewProps

export const ProjectTraits = memo(
  ({followed, meter, strides, unreadArticlesLength, ...viewProps}: Props) => {
    if ([followed, meter, strides].every(v => !v)) {
      return null
    }

    const {distanceA11yText, distanceText, stridesText} = getDistanceAndStrides(
      meter,
      strides,
    )

    return (
      <View {...viewProps}>
        <Row
          gutter="md"
          wrap>
          {!!followed &&
            (unreadArticlesLength ? (
              <Trait
                label={simplur`${[unreadArticlesLength]} Bericht[|en]`}
                testID="ConstructionWorkProjectArticlesTrait">
                <Badge
                  testID="ConstructionWorkProjectArticlesBadge"
                  value={unreadArticlesLength}
                  variant="small"
                />
              </Trait>
            ) : (
              <Trait
                iconName="checkmark"
                label="Volgend"
                testID="ConstructionWorkProjectFollowingTrait"
              />
            ))}
          {!!distanceText && (
            <Trait
              accessibilityLabel={distanceA11yText}
              iconName="location"
              label={distanceText}
              testID="ConstructionWorkProjectMetersTrait"
            />
          )}
          {!!stridesText && (
            <Trait
              iconName="strides"
              label={stridesText}
              testID="ConstructionWorkProjectStridesTrait"
            />
          )}
        </Row>
      </View>
    )
  },
)
