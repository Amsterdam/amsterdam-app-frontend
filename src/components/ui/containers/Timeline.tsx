import {pascalCase} from 'pascal-case'
import {TimelineItem} from '@/components/ui/containers/TimelineItem'
import {TestProps} from '@/components/ui/types'
import {ProjectTimelineItem} from '@/modules/construction-work/types/api'

type Props = {
  items: ProjectTimelineItem[]
} & TestProps

export const Timeline = ({items, testID}: Props) => (
  <>
    {items.map((item, index) => (
      <TimelineItem
        isBeforeUpcoming={items[index + 1]?.progress === 'Aankomend'}
        isLast={index === items.length - 1}
        item={item}
        key={item.title + index.toString()}
        testID={`${testID}${pascalCase(item.title)}TimelineItem`}
      />
    ))}
  </>
)
