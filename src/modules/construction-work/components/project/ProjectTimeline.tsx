import {View} from 'react-native'
import {ProjectTimelineItem} from '@/modules/construction-work/components/project/ProjectTimelineItem'
import {ProjectTimelineItem as ProjectTimelineItemType} from '@/modules/construction-work/types/api'
import {mapProgressionStatus} from '@/modules/construction-work/utils/mapTimelineProgressionStatus'

type Props = {
  items: ProjectTimelineItemType[]
}

export const ProjectTimeline = ({items}: Props) => (
  <View testID="ConstructionWorkProjectTimeline">
    {items.map((item, index) => (
      <ProjectTimelineItem
        item={item}
        key={item.title + index.toString()}
        progressStatusNextItem={mapProgressionStatus(
          items[index + 1]?.progress,
        )}
      />
    ))}
  </View>
)
