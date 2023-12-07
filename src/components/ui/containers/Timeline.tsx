import {TimelineItem} from '@/components/ui/containers/TimelineItem'
import {ProjectTimelineItem} from '@/modules/construction-work/types/api'

type Props = {
  items: ProjectTimelineItem[]
}

export const Timeline = ({items}: Props) => (
  <>
    {items.map((item, index) => (
      <TimelineItem
        isBeforeUpcoming={items[index + 1]?.progress === 'Aankomend'}
        isLast={index === items.length - 1}
        item={item}
        key={item.title + index.toString()}
      />
    ))}
  </>
)
