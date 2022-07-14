import React from 'react'
import {TimelineItem} from './TimelineItem'
import {TimelineItem as TimelineItemType} from '@/types'

type Props = {
  items: TimelineItemType[]
}

export const Timeline = ({items}: Props) => {
  return (
    <>
      {items.map((item, index) => {
        return (
          <TimelineItem
            isFirst={index === 0}
            isLast={index === items.length - 1}
            item={item}
            key={item.title + index}
          />
        )
      })}
    </>
  )
}
