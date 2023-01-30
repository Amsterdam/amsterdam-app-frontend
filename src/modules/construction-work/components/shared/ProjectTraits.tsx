import {View, ViewProps} from 'react-native'
import simplur from 'simplur'
import {Badge, Trait} from '@/components/ui/feedback'
import {Row} from '@/components/ui/layout'
import {ProjectsItem} from '@/modules/construction-work/types'

type Props = Partial<ProjectsItem> & {
  unreadArticlesLength?: number
} & ViewProps

export const ProjectTraits = ({
  followed,
  meter,
  strides,
  unreadArticlesLength,
  ...viewProps
}: Props) => {
  if ([followed, meter, strides].every(v => !v)) {
    return null
  }

  return (
    <View {...viewProps} testID="ConstructionWorkViewProjectTraits">
      <Row gutter="md" wrap>
        {!!followed &&
          (unreadArticlesLength ? (
            <Trait
              label={simplur`${[unreadArticlesLength]} Bericht[|en]`}
              testIDIcon="ConstructionWorkViewProjectTraitsIconMessages"
              testIDLabel="ConstructionWorkViewProjectTraitsTextMessages">
              <Badge
                testID="ConstructionWorkViewProjectTraitsBadgeMessages"
                value={unreadArticlesLength}
                variant="small"
              />
            </Trait>
          ) : (
            <Trait
              iconName="checkmark"
              label="Volgend"
              testIDIcon="ConstructionWorkViewProjectTraitsIconFollowing"
              testIDLabel="ConstructionWorkViewProjectTraitsTextFollowing"
            />
          ))}
        {!!meter && (
          <Trait
            iconName="location"
            label={`${meter} meter`}
            testIDIcon="ConstructionWorkViewProjectTraitsIconDistanceByMeters"
            testIDLabel="ConstructionWorkViewProjectTraitsTextDistanceByMeters"
          />
        )}
        {!!strides && (
          <Trait
            iconName="strides"
            label={simplur`${strides} stap[|pen]`}
            testIDIcon="ConstructionWorkViewProjectTraitsIconDistanceBySteps"
            testIDLabel="ConstructionWorkViewProjectTraitsTextDistanceBySteps"
          />
        )}
      </Row>
    </View>
  )
}
