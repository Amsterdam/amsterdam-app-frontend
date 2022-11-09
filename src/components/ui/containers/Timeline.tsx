import React from 'react'
import {TimelineItem} from '@/components/ui/containers/TimelineItem'
import {TimelineItem as TimelineItemType} from '@/types'

type Props = {
  items: TimelineItemType[]
}

export const Timeline = ({items}: Props) => (
  <>
    {items.map((item, index) => (
      <TimelineItem
        isFirst={index === 0}
        isLast={index === items.length - 1}
        item={item}
        key={item.title + index.toString()}
      />
    ))}
  </>
)