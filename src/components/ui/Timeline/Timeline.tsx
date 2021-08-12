import React from 'react'
import {TimelineItem as TimelineItemType} from '../../../types'
import {TimelineItem} from './TimelineItem'

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
