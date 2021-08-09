import React from 'react'
import {Timeline as TimelineType} from '../../../data/timeline'
import {TimelineItem} from './TimelineEntry'

type Props = {
  timeline: TimelineType
}

export const Timeline = ({timeline}: Props) => {
  return (
    <>
      {timeline.items.map((item, index) => {
        return (
          <React.Fragment key={item.title + index}>
            <TimelineItem
              item={item}
              isFirst={index === 0}
              isLast={index === timeline.items.length - 1}
            />
          </React.Fragment>
        )
      })}
    </>
  )
}
